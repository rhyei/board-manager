class ApiError extends Error {
	status: number
	errors: Error[]

	constructor(status: number, message: string, errors: Error[] = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static BadRequest(message: string = 'Bad request', errors: Error[] = []) {
		return new ApiError(400, message, errors)
	}

	static NotFound(message: string = 'Not found', errors: Error[] = []) {
		return new ApiError(404, message, errors)
	}

	static Unauthorized(
		message: string = 'Not authenticated',
		errors: Error[] = []
	) {
		return new ApiError(401, message, errors)
	}
}

export default ApiError
