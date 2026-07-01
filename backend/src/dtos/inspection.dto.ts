class InspectionDTO {
	date: Date
	week: number
	inspector: string
	product: string
	defectType: string
	defect: string
	worker: number
	note: string

	constructor(model: any) {
		this.date = new Date(model.date)
		this.week = +model.week
		this.inspector = model.inspector
		this.product = model.product
		this.defectType = model.defectType
		this.defect = model.defect
		this.note = model.note
		this.worker = +model.worker
	}
}

export default InspectionDTO
