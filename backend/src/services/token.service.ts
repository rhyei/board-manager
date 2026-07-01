import ApiError from '@/exceptions/api-error'
import type { PrismaClient, Token, User } from '@prisma/client'
import jwt from 'jsonwebtoken'

class TokenService {
	constructor(private prisma: PrismaClient) {}

	generateTokens(payload: User): {
		accessToken: string
		refreshToken: string
	} {
		const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: '12h',
		})
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
			expiresIn: '1d',
		})
		return { accessToken, refreshToken }
	}

	validateAccessToken(token: string): jwt.JwtPayload | string | null {
		try {
			const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
			return user
		} catch (error) {
			console.error(error)
			return null
		}
	}

	validateRefreshToken(token: string) {
		try {
			const user = jwt.verify(token, process.env.REFRESH_SECRET_KEY)
			return user
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async saveToken(userId: number, refreshToken: string): Promise<Token> {
		const tokenData = await this.prisma.token.findFirst({ where: { userId } })
		if (tokenData) {
			return await this.prisma.token.update({
				where: { userId },
				data: { ...tokenData, refreshToken },
			})
		}
		const token = await this.prisma.token.create({
			data: { userId, refreshToken },
		})
		return token
	}

	async removeToken(refreshToken: string): Promise<Token> {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await this.prisma.token.delete({
			where: { refreshToken },
		})
		return tokenData
	}

	async findToken(refreshToken: string): Promise<Token | null> {
		if (!refreshToken) throw ApiError.Unauthorized('123')
		const tokenData = await this.prisma.token.findFirst({
			where: { refreshToken },
		})

		return tokenData
	}
}

export default TokenService
