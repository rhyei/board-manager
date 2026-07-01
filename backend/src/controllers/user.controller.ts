import ApiError from '@/exceptions/api-error'
import type UserService from '@/services/user/user.service'
import type { NextFunction, Request, Response } from 'express'

class UserController {
	constructor(private userService: UserService) {}

	register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { fullName, password, secret } = req.body
			if (secret != process.env.SECRET_KEY) {
				return next(ApiError.Unauthorized())
			}
			const userData = await this.userService.register(fullName, password)
			res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { password } = req.body
			const userData = await this.userService.login(password)
			res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}

	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const refreshToken = req.headers.authorization?.split(' ')[1] ?? ''
			await this.userService.logout(refreshToken)
			res.status(200).send()
		} catch (error) {
			next(error)
		}
	}

	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const refreshToken = req.headers.authorization?.split(' ')[1] ?? ''
			const userData = await this.userService.refresh(refreshToken)
			res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}
}

export default UserController
