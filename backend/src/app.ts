import router from '@routes/routes'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import errorMiddleware from './middleware/error.middleware'
import prisma from './utils/prisma'

dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT

app.use(cors({ credentials: true, origin: '*' }))
app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)

await prisma.$connect()

const server = app.listen(PORT, () => {
	console.log(`HTTP server is running on localhost:${PORT}`)
})

const onCloseSignal = async () => {
	await prisma.$disconnect()
	server.close(() => {
		console.log('Server closed')
		process.exit()
	})
	setTimeout(() => process.exit(1), 10000).unref()
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
