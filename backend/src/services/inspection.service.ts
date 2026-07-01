import ApiError from '@/exceptions/api-error'
import type { BoardInspection, PrismaClient } from '@prisma/client'
import DataService from './data.service'

class InspectionService {
	constructor(private prisma: PrismaClient, private dataService: DataService) {}
	async saveInspectionRecord(
		data: Omit<BoardInspection, 'id' | 'createdAt'>,
		quantity: number
	): Promise<{ quantity: number; inspections: BoardInspection[] }> {
		const inspections: BoardInspection[] = []

		for (let i = 0; i < quantity; i++) {
			const inspection = await this.prisma.boardInspection.create({
				data,
			})
			inspections.push(inspection)
		}

		if (data.defect.split(' ')[0].toLowerCase() == 'other:') {
			await this.dataService.saveNewDefect(data.defect)
		}

		return { quantity, inspections }
	}

	async deleteInspectionRecord(id: number): Promise<BoardInspection> {
		const inspection = await this.prisma.boardInspection.findUnique({
			where: { id },
		})

		if (!inspection) throw ApiError.NotFound('Inspection record not found.')

		await this.prisma.boardInspection.delete({
			where: { id },
		})
		return inspection
	}
}

export default InspectionService
