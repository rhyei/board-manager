import axios, { type AxiosResponse } from 'axios'
import $api, { API_URL } from '../api'
import { AuthResponse } from '../models/AuthResponse'

class AuthService {
	static async login(password: string): Promise<AxiosResponse<AuthResponse>> {
		return await $api.post<AuthResponse>('/login', { password })
	}

	static async registration(
		password: string,
		fullName: string,
		secret: string
	): Promise<AxiosResponse<AuthResponse>> {
		return await $api.post<AuthResponse>('/register', {
			password,
			fullName,
			secret,
		})
	}

	static async logout(refreshToken: string) {
		return await axios.get<AuthResponse>(`${API_URL}/logout`, {
			headers: { Authorization: `Bearer ${refreshToken}` },
		})
	}
}

export default AuthService
