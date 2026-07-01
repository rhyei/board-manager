import { PropsWithChildren } from 'react'
import { Header } from './Header'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='font-sans flex flex-col items-center'>
			<Header />
			{children}
		</div>
	)
}
