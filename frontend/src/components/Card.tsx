import { memo, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card: React.FC<
	PropsWithChildren<{
		className?: string
	}>
> = memo(({ children, className }) => {
	return (
		<div
			className={twMerge(
				'bg-gray-200 shadow-md rounded-lg flex justify-center',
				className
			)}
		>
			{children}
		</div>
	)
})
