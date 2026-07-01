import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../main'

interface DropdownProps {
	options: ({ label: string; value: string } | string)[]
	onChange: (value: string) => void
	label?: string
	value: string
	placeholder?: string
	showCheckbox?: boolean
}

export const Dropdown: React.FC<DropdownProps> = observer(
	({ options, onChange, label, value, placeholder }) => {
		const { store } = useContext(Context)

		if (store.isLoading || !options) {
			return (
				<option value='' key='loading'>
					Loading...
				</option>
			)
		}

		return (
			<div className='flex flex-col w-full'>
				{label && <label>{label}</label>}
				<select
					value={value}
					onChange={e => onChange(e.target.value)}
					className='rounded-md w-full border-2 px-4 py-2 border-[#D9D9D9] outline-none transition-colors delay-75 duration-150 focus:border-blue-600'
				>
					{placeholder && (
						<option value='' disabled>
							{placeholder}
						</option>
					)}

					{options.map((option, id) => {
						const value = typeof option === 'string' ? option : option.value
						const label = typeof option === 'string' ? option : option.label
						return (
							<option key={id} value={value}>
								{label}
							</option>
						)
					})}
				</select>
			</div>
		)
	}
)
