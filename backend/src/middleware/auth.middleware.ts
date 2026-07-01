import ApiError from '@/exceptions/api-error'
import { PrismaClient } from '@prisma/client'
import TokenService from '@services/token.service'
import type { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()
const tokenService = new TokenService(prisma)

export default function (req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) return next(ApiError.Unauthorized())

		const accessToken = authorizationHeader?.split(' ')[1]
		if (!accessToken) return next(ApiError.Unauthorized())

		const userData = tokenService.validateAccessToken(accessToken!)
		if (!userData) return next(ApiError.Unauthorized())

		req.user = userData
		next()
	} catch (error) {
		console.error(error)
		next(ApiError.Unauthorized())
	}
}
