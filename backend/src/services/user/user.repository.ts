import ApiError from '@/exceptions/api-error'
import type { PrismaClient, User } from '@prisma/client'

class UserRepository {
	constructor(private prisma: PrismaClient) {}

	async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
		return await this.prisma.user.create({ data: user })
	}
	async getUserByHashPassword(passwordHash: string): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: { passwordHash },
		})

		if (!user) {
			throw ApiError.NotFound('User not found')
		}

		return user
	}
}

export default UserRepository
