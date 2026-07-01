import axios from 'axios'
import { makeAutoObservable, toJS } from 'mobx'
import { toast } from 'react-toastify'
import { API_URL } from '../api'
import { AuthResponse } from '../models/AuthResponse'
import { Options } from '../models/Options'
import { Inspection, Inventory, Record, RecordsArray } from '../models/RecordResponse'
import { IUser } from '../models/User'
import AuthService from '../services/AuthService'
import OptionsService from '../services/OptionsService'
import RecordService from '../services/RecordService'

export default class Store {
	user: IUser = {} as IUser
	isAuth = false
	worker = ''
	lastRecords: RecordsArray = []
	private _options: Options = {} as Options
	isLoading = true

	constructor() {
		makeAutoObservable(this)
	}

	get options() {
		return toJS(this._options)
	}

	private updateLocalStorage(key: string, value: string | null) {
		if (value === null) localStorage.removeItem(key)
		else localStorage.setItem(key, value)
	}

	private clearUserState() {
		this.setAuth(false)
		this.setUser({} as IUser)
		this.setWorker('')
		this.setLastRecords([])
		this.setOptions({} as Options)
	}

	setAuth(isAuthenticated: boolean) {
		this.isAuth = isAuthenticated
	}

	setIsLoading(isLoading: boolean) {
		this.isLoading = isLoading
	}

	setUser(user: IUser) {
		this.user = user
	}

	setWorker(worker: string) {
		this.worker = worker
	}

	setLastRecords(records: RecordsArray) {
		this.lastRecords = records
	}

	deleteLastRecord() {
		this.lastRecords.pop()
	}

	addLastRecord(record: Record & { type: 'inspection' | 'inventory' }) {
		this.lastRecords.unshift(record)
		if (this.lastRecords.length > 5) this.deleteLastRecord()
	}

	setOptions(options: Options) {
		this._options = options
	}

	async login(password: string, worker: string) {
		try {
			const response = await AuthService.login(password)
			this.updateLocalStorage('token', response.data.accessToken)
			this.updateLocalStorage('refreshToken', response.data.refreshToken)
			this.updateLocalStorage('worker', worker)
			this.setAuth(true)
			this.setUser(response.data.user)
			this.setWorker(worker)
			await this.fetchOptions()
		} catch (error) {
			throw new Error(`Login failed: ${error.response?.data?.message || error.message}`)
		}
	}

	async registration(password: string, fullName: string, secret: string) {
		try {
			await AuthService.registration(password, fullName, secret)
		} catch (error) {
			throw new Error(`Registration failed: ${error.response?.data?.message || error.message}`)
		}
	}

	async logout() {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				await AuthService.logout(refreshToken)
				this.updateLocalStorage('refreshToken', null)
				this.updateLocalStorage('token', null)
			}
			this.updateLocalStorage('worker', null)
			this.clearUserState()
		} catch (error) {
			console.error('Logout failed:', error.response?.data?.message || error.message)
		}
	}

	async checkAuth() {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (!refreshToken) return

			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
				headers: { Authorization: `Bearer ${refreshToken}` },
			})

			this.updateLocalStorage('token', response.data.accessToken)
			this.updateLocalStorage('refreshToken', response.data.refreshToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (error) {
			console.error('Auth check failed:', error.response?.data?.message || error.message)
		}
	}

	async saveInspection(inspection: Omit<Inspection, 'createdAt' | 'id'>, quantity: number) {
		const response = await RecordService.saveInspection(inspection, quantity)
		for (const insp of response.data.inspections) {
			this.addLastRecord({
				...inspection,
				createdAt: insp.createdAt,
				id: insp.id,
				type: 'inspection',
			})
		}

		toast.info(`Saved ${response.data.quantity} items.`)
	}

	async deleteInspection(id: number) {
		await RecordService.deleteInspection(id)
		this.setLastRecords(
			this.lastRecords.filter(item => !(item.id === id && item.type === 'inspection'))
		)
	}

	async saveInventory(inventory: Omit<Inventory, 'createdAt' | 'id'>) {
		const response = await RecordService.saveInventory(inventory)

		this.addLastRecord({
			...inventory,
			id: response.data.inventory.id,
			createdAt: response.data.inventory.createdAt,
			type: 'inventory',
		})

		toast.info(`Saved #${response.data.inventory.id} record.`)
	}

	async deleteInventory(id: number) {
		await RecordService.deleteInventory(id)
		this.setLastRecords(
			this.lastRecords.filter(item => !(item.id === id && item.type === 'inventory'))
		)
	}

	async fetchOptions() {
		try {
			const options = await OptionsService.fetchOptions()
			this.setOptions(options.data)
			this.setIsLoading(false)
		} catch (error) {
			this.setIsLoading(true)
			console.error('Fetch options failed:', error.response?.data?.message || error.message)
		}
	}
}
