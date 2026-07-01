import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, PropsWithChildren, useMemo } from 'react'

export const NavButton: React.FC<
	PropsWithChildren<{ onClick: () => void; icon?: IconProp }>
> = memo(({ onClick, children, icon }) => {
	const iconElement = useMemo(() => {
		if (icon) {
			return <FontAwesomeIcon icon={icon} />
		}
		return null
	}, [icon])

	return (
		<button
			onClick={onClick}
			className='flex items-center space-x-2 transition-colors ease-in delay-75 duration-150 hover:text-blue-600'
		>
			<span>{children}</span>
			{iconElement}
		</button>
	)
})
