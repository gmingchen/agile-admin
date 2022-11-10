/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_WS_URL: string
  readonly VITE_PORT: string
  readonly VITE_PROXY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
