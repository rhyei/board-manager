import { faPlus, faServer, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { Context } from '../main'
import { NavButton } from './NavButton'
import { NavLink } from './NavLink'

export const Header = () => {
	const { store } = useContext(Context)

	return (
		<div className='w-screen py-2 lg:h-24 bg-gray-200 shadow-md flex justify-center items-center text-center text-xl lg:text-2xl'>
			<div className='w-3/4 flex flex-col lg:flex-row justify-between'>
				<div className='flex justify-center'>
					<NavLink path='/' icon={faServer}>
						Main
					</NavLink>
				</div>
				<div className='flex flex-col lg:flex-row justify-center items-center lg:space-x-10'>
					<NavLink path='/registration' icon={faPlus}>
						Registration
					</NavLink>
					<NavButton onClick={() => store.logout()} icon={faSignOut}>
						Logout
					</NavButton>
				</div>
			</div>
		</div>
	)
}
