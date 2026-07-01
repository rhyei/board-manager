import ApiError from '@/exceptions/api-error'
import { hashPassword } from '@/utils/hash'
import type { PrismaClient, User } from '@prisma/client'
import type TokenService from '../token.service'
import type UserRepository from './user.repository'

class UserService {
	constructor(
		private userRepository: UserRepository,
		private tokenService: TokenService,
		private prisma: PrismaClient
	) {}

	async register(
		fullName: string,
		password: string
	): Promise<{
		user: User
		accessToken: string
		refreshToken: string
	}> {
		const passwordHash = hashPassword(password)
		const user = await this.userRepository.create({ fullName, passwordHash })
		const tokens = this.tokenService.generateTokens({ ...user })
		await this.tokenService.saveToken(user.id, tokens.refreshToken)
		return { user, ...tokens }
	}

	async login(password: string) {
		const passwordHash = hashPassword(password)
		const user = await this.userRepository.getUserByHashPassword(passwordHash)
		const tokens = this.tokenService.generateTokens({ ...user })
		await this.tokenService.saveToken(user.id, tokens.refreshToken)
		return { user, ...tokens }
	}

	async logout(refreshToken: string) {
		const token = await this.tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.Unauthorized('Unauthorized')
		}
		const userData = this.tokenService.validateRefreshToken(
			refreshToken
		) as User

		const tokenFromDb = await this.tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.Unauthorized()
		}

		const user = await this.prisma.user.findFirst({
			where: { id: userData.id },
		})
		if (!user) {
			throw ApiError.BadRequest('User not found')
		}
		const tokens = this.tokenService.generateTokens({ ...user })

		await this.tokenService.saveToken(user.id, tokens.refreshToken)

		return {
			user,
			...tokens,
		}
	}
}

export default UserService
