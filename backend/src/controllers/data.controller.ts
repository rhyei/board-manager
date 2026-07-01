import type DataService from '@/services/data.service'
import type { NextFunction, Request, Response } from 'express'

class DataController {
	dataService: DataService
	constructor(dataService: DataService) {
		this.dataService = dataService
	}

	fetchData = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.dataService.fetchData()
			res.status(200).json({ ...data })
		} catch (error) {
			next(error)
		}
	}
}

export default DataController
