declare module '*.vue-router' {
  interface RouteMeta {
    id?: number
    title_cn: string
    title_en: string
    type?: number
    url?: string
    dynamic?: boolean
    tab?: boolean
    keepalive?: boolean
    multiple?: boolean
  }
}
