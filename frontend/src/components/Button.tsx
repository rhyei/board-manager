import { memo, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const Button: React.FC<
	PropsWithChildren<{
		className?: string
		onClick: () => void
		disabled?: boolean
		color: 'red' | 'green' | 'blue'
	}>
> = memo(({ children, onClick, className, color, disabled }) => {
	return (
		<button
			className={twMerge(
				'rounded-md shadow-md cursor-pointer text-white transition-all font-medium px-16 py-3 outline-none duration-150 ease-in',
				disabled
					? 'cursor-not-allowed bg-gray-300 text-gray-500'
					: color === 'red'
					? 'bg-red-500 hover:bg-red-600'
					: color === 'green'
					? 'bg-green-500 hover:bg-green-600'
					: 'bg-blue-500 hover:bg-blue-600',
				className
			)}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
})
