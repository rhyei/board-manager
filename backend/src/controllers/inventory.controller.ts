import InventoryDTO from '@/dtos/inventory.dto'
import type InventoryService from '@/services/inventory.service'
import type { NextFunction, Request, Response } from 'express'

class InventoryController {
	inventoryService: InventoryService
	constructor(inventoryService: InventoryService) {
		this.inventoryService = inventoryService
	}

	saveInventoryRecord = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		const data = new InventoryDTO({ ...req.body, ...req.params })

		try {
			const inventory = await this.inventoryService.saveInventoryRecord(data)
			res.status(201).json({ inventory })
		} catch (error) {
			next(error)
		}
	}

	deleteInventoryRecord = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		const { id } = req.params

		try {
			const inventory = await this.inventoryService.deleteInventoryRecord(+id)
			res.status(200).json({ inventory })
		} catch (error) {
			next(error)
		}
	}
}

export default InventoryController
