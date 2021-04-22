import { LanguageType } from "@/utils/index.type";

/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-15 15:00:21
 */
export interface IDocument {
  clientHeight: number
}

export interface ISidebar {
  width: number
  openWidth: number
  foldWidth: number
}

export interface INavbar {
  headHeight: number
  tabsHeight: number
  fixed: boolean
  tabsDisplay: boolean
}

export interface ISet {
  language: string
  fullScreen: boolean
  refresh: boolean
}

export interface ICommonState {
  document: IDocument
  sidebar: ISidebar
  navbar: INavbar
  set: ISet
}

