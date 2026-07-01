import React, { memo } from 'react'
import { twMerge } from 'tailwind-merge'

export const Checkbox: React.FC<{
	className?: string
	checked: boolean
	label?: string
	onChange: (value: boolean) => void
}> = memo(({ className, checked, label, onChange }) => {
	return (
		<div
			className={twMerge('flex flex-col justify-center items-end', className)}
		>
			{label && <label>{label}</label>}
			<input
				type='checkbox'
				className='size-10 outline-none rounded-md border-[#D9D9D9] border-2'
				checked={checked}
				onChange={() => onChange(!checked)}
			/>
		</div>
	)
})
