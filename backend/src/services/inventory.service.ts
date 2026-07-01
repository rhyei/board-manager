import ApiError from '@/exceptions/api-error'
import type { BoardInventory, PrismaClient } from '@prisma/client'

class InventoryService {
	prisma: PrismaClient
	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	async saveInventoryRecord(
		data: Omit<BoardInventory, 'id' | 'createdAt'>
	): Promise<BoardInventory> {
		const inventory = await this.prisma.boardInventory.create({
			data,
		})
		return inventory
	}

	async deleteInventoryRecord(id: number): Promise<BoardInventory> {
		const inventory = await this.prisma.boardInventory.findUnique({
			where: { id },
		})

		if (!inventory) throw ApiError.NotFound('Inventory record not found.')

		await this.prisma.boardInventory.delete({
			where: { id },
		})
		return inventory
	}
}

export default InventoryService
