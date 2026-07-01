export interface Inspection {
	id: number
	date: Date
	week: number
	inspector: string
	product: string
	defectType: string
	defect: string
	worker: number
	note: string
	createdAt: Date
}

export interface Inventory {
	id: number
	date: Date
	week: number
	quantity: number
	inspector: string
	product: string
	worker: number
	createdAt: Date
}

export type Record = Inspection | Inventory

export type RecordsArray = (Record & { type: 'inspection' | 'inventory' })[]
