import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'

export const NavLink: React.FC<
	PropsWithChildren<{
		path: string
		icon: IconProp
	}>
> = ({ children, path, icon }) => {
	const { pathname } = useLocation()

	return (
		<Link
			to={path}
			className={twMerge(
				'flex items-center space-x-2 transition-colors ease-in delay-75 duration-150 hover:text-blue-600',
				pathname === path && 'text-blue-600 hover:text-blue-800 font-medium'
			)}
		>
			<span>{children}</span>
			<FontAwesomeIcon icon={icon} />
		</Link>
	)
}
