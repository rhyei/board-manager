/// <reference types="vite/client" />
interface ImportMeta {
	Env: ImportMetaEnv
}

interface ImportMetaEnv {
	VITE_API_URL: string
}
