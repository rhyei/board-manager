import { memo } from 'react'

export const Input: React.FC<{
	label?: string
	placeholder?: string
	value: string
	type?: 'password' | 'text'
	onChange: (value: string) => void
}> = memo(({ label, placeholder, value, onChange, type = 'text' }) => {
	return (
		<div className='flex flex-col'>
			{label && <label className='mb-2'>{label}</label>}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='rounded-md placeholder:text-black w-full border-2 px-4 py-2 border-[#D9D9D9] outline-none transition-colors delay-75 duration-150 focus:border-blue-600'
			/>
		</div>
	)
})
