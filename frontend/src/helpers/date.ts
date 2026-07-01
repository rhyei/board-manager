declare global {
	interface Date {
		getWeek(): number
	}
}

Date.prototype.getWeek = function (): number {
	const today = new Date(this.getTime())
	const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
	const pastFromFirstDay =
		(today.getTime() - firstDayOfYear.getTime()) / 1000 / 60 / 60 / 24
	return Math.ceil((pastFromFirstDay + firstDayOfYear.getDay() - 1) / 7)
}

export const formatDate = (date: Date): string => {
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	return `${year}-${month}-${day}`
}
