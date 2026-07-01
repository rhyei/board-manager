import { memo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const DateInput: React.FC<{
	className?: string
	label?: string
	onChange: (value: string) => void
	selected: string
}> = memo(({ className, label, onChange, selected }) => {
	const [focused, setFocused] = useState(false)

	return (
		<div className={twMerge('flex flex-col w-full', className)}>
			{label && <label className='mb-2'>{label}</label>}
			<input
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				type='date'
				className={twMerge(
					'rounded-md w-full border-2 px-4 py-2 border-[#D9D9D9] outline-none transition-colors delay-75 duration-150',
					focused && 'border-blue-600',
					className
				)}
				value={selected}
				onChange={e => {
					onChange(e.target.value)
				}}
			/>
		</div>
	)
})
