import InspectionDTO from '@/dtos/inspection.dto'
import type InspectionService from '@/services/inspection.service'
import type { NextFunction, Request, Response } from 'express'

class InspectionController {
	inspectionService: InspectionService
	constructor(inspectionService: InspectionService) {
		this.inspectionService = inspectionService
	}

	saveInspectionRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const data = new InspectionDTO({ ...req.body, ...req.params })

		try {
			const { inspections, quantity } = await this.inspectionService.saveInspectionRecord(
				data,
				req.body.quantity
			)
			res.status(201).json({ inspections, quantity })
		} catch (error) {
			next(error)
		}
	}

	deleteInspectionRecord = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		const { id } = req.params

		try {
			const inspection = await this.inspectionService.deleteInspectionRecord(+id)
			res.status(200).json({ inspection })
		} catch (error) {
			next(error)
		}
	}
}

export default InspectionController
