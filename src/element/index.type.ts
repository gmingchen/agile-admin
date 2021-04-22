export interface ITreeNode<T> {
  children: T[]
  display: boolean
  expanded: boolean
  lazy: boolean
  level: number
  loaded: boolean
  loading: boolean
}

