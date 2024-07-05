import SparkMD5 from 'spark-md5'
import axios from 'axios'

import { uploadApi, uploadSliceApi, mergeSliceApi, deleteSliceApi } from '@/api/file'
import { SUCCESS_CODE } from './constant'

export default class Uploader {
  constructor(file) {
    this.file = file
    this.sliceSize = 5 * 1024 * 1024
    this.concurrent = 2
    this.md5 = ''
    this.slices = []
    this.success = () => ''
    this.fail = () => ''
  }

  /**
   * 设置文件md5
   */
  async setMD5() {
    const md5 = await new Promise((resolve, reject) => {
      try {
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(this.file)
        fileReader.onload = (e) => {
          spark.append(e.target.result)
          resolve(spark.end())
        }
      } catch (error) {
        reject('获取文件MD5异常')
      }
    })
    this.md5 = md5
  }

  /**
   * 设置分片
   */
  setSlice() {
    const size = this.sliceSize
    const count = Math.ceil(this.file.size / size)
    for (let i = 0; i < count; i++) {
      this.slices.push({
        index: i,
        slice: this.file.slice(i * size, (i + 1) * size)
      }
      )
    }
  }

  /**
   * 文件上传
   */
  async start(size, concurrent, success, fail) {
    // 重置参数
    if (size) { this.sliceSize = size }
    if (concurrent) { this.concurrent = concurrent }
    if (success) { this.success = success }
    if (fail) { this.fail = fail }
    // 判断是否进行分片上传
    const isSlice = this.file.size > this.sliceSize
    if (isSlice) {
      await this.setMD5()
      this.setSlice()
      // 失败的请求
      let failedRequests = []
      // 批量请求次数
      const batch = Math.ceil(this.slices.length / this.concurrent)
      for (let i = 0; i < batch; i++) {
        const requests = []
        const slices = this.slices.slice(i * this.concurrent, (i + 1) * this.concurrent)
        for (let j = 0; j < slices.length; j++) {
          const params = {
            slice: slices[j].slice,
            index: slices[j].index,
            md5: this.md5
          }
          requests.push(
            uploadSliceApi(params)
          )
        }
        failedRequests = await this.requestAll(requests)
      }
      // 如果存在失败的分片上传请求 最后在请求一次
      if (failedRequests.length) {
        failedRequests = await this.requestAll(failedRequests)
      }
      if (!failedRequests.length) {
        const params = {
          md5: this.md5,
          name: this.file.name
        }
        mergeSliceApi(params).then(r => {
          if (r) {
            this.success(r.data)
          } else {
            this.fail('上传失败')
            deleteSliceApi({ md5: this.md5 })
          }
        })
      } else {
        this.fail('上传失败')
        deleteSliceApi({ md5: this.md5 })
      }
    } else {
      uploadApi({ file: this.file }).then(r => {
        if (r) {
          this.success()
        } else {
          this.fail('上传失败')
          deleteSliceApi({ md5: this.md5 })
        }
      })
    }
  }

  /**
   * 批量请求
   * @param {*} requests axois 请求数组
   * @returns 失败请求
   */
  async requestAll(requests) {
    const failedRequests = []
    const batch = Math.ceil(requests.length / this.concurrent)
    for (let i = 0; i < batch; i++) {
      const responses = await axios.all(requests)
      responses.forEach((r, index) => {
        if (r && !SUCCESS_CODE.includes(r.code)) {
          failedRequests.push(requests[index])
        }
      })
    }
    return failedRequests
  }
}
