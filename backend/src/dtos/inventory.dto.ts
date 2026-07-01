class InventoryDTO {
	date: Date
	week: number
	quantity: number
	product: string
	inspector: string
	worker: number

	constructor(model: any) {
		this.date = new Date(model.date)
		this.week = +model.week
		this.product = model.product
		this.quantity = +model.quantity
		this.worker = +model.worker
		this.inspector = model.inspector
	}
}

export default InventoryDTO
