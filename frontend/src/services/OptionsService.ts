import { AxiosResponse } from 'axios'
import $api from '../api'
import { Options } from '../models/Options'

export default class OptionsService {
	static async fetchOptions(): Promise<
		AxiosResponse<{
			inspectors: string[]
			defectTypes: string[]
			defects: string[]
			products: string[]
		}>
	> {
		return await $api.get<Options>('/data')
	}
}
