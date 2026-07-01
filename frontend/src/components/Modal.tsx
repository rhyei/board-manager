import React, { memo, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'

export const Modal: React.FC<
	PropsWithChildren<{
		isOpen: boolean
		onClose: () => void
		className?: string
	}>
> = memo(({ isOpen, onClose, children, className }) => {
	if (!isOpen) return null

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose()
	}

	return ReactDOM.createPortal(
		<div
			className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-10'
			onClick={handleOverlayClick}
		>
			<div
				className={twMerge(
					'bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-xs lg:max-w-md',
					className
				)}
			>
				{children}
			</div>
		</div>,
		document.body
	)
})
