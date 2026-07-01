declare namespace NodeJS {
	interface ProcessEnv {
		JWT_SECRET_KEY: string
		REFRESH_SECRET_KEY: string
		SECRET_KEY: string
		SERVER_PORT: string
	}
}
