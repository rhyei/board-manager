import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { formatDate } from '../helpers/date'
import { Context } from '../main'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { DateInput } from './DateInput'
import { Dropdown } from './Dropdown'
import { Input } from './Input'

export const InventoryForm: React.FC<{ className?: string }> = observer(
	({ className }) => {
		const { store } = useContext(Context)

		const [date, setDate] = useState<string>(formatDate(new Date()))
		const [product, setProduct] = useState<string>('')
		const [quantity, setQuantity] = useState<string>('1')

		const [idMode, setIdMode] = useState<boolean>(false)

		const products = store.options.products

		const weekNumber = new Date(date).getWeek()

		const isFormValid = date && +quantity > 0 && product

		const handleSave = async () => {
			try {
				await store.saveInventory({
					date: new Date(date),
					week: weekNumber,
					quantity: +quantity,
					inspector: store.user.fullName,
					product,
					worker: +store.worker,
				})
				setQuantity('1')
			} catch (error) {
				console.error('Error saving inventory:', error)
			}
		}

		return (
			<div
				className={twMerge(
					'grid grid-rows-6 items-center h-full w-full lg:w-3/4 gap-4 p-5',
					className
				)}
			>
				<DateInput
					label={`Week: ${weekNumber}`}
					onChange={setDate}
					selected={date}
				/>
				<div className='flex gap-x-8'>
					<Dropdown
						options={
							idMode ? products.map(prod => prod.split(' ')[0]) : products
						}
						placeholder='Enter a product'
						onChange={setProduct}
						value={product}
					/>
					<Checkbox checked={idMode} onChange={setIdMode} />
				</div>
				<Input
					value={quantity}
					onChange={setQuantity}
					placeholder='Enter a quantity'
				/>
				<Button
					disabled={!isFormValid}
					onClick={handleSave}
					color='green'
					className='row-start-6'
				>
					Save
				</Button>
			</div>
		)
	}
)
