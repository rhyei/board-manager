import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { Context } from '../main'
import { Card } from './Card'
import { InspectionForm } from './InspectionForm'
import { InventoryForm } from './InventoryForm'
import LoginForm from './LoginForm'
import { Modal } from './Modal'
import { RecordsList } from './RecordsList'

export const MainForm: React.FC = observer(() => {
	const [mode, setMode] = useState<'Inspection' | 'Inventory'>('Inspection')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { store } = useContext(Context)

	const handleCloseModal = () => setIsModalOpen(false)

	return (
		<>
			{store.isAuth ? (
				<>
					<Card className='mt-10 flex-col text-sm md:text-lg items-center w-full md:w-[500px]'>
						<div className='bg-gray-300 md:h-12 h-20 flex md:flex-row flex-col px-5 md:px-20 justify-between text-base lg:text-lg w-full rounded-t-md shadow-md'>
							<button
								onClick={() => setMode('Inspection')}
								className={twMerge(
									'hover:text-blue-600 transition-colors duration-300 ease-in',
									mode == 'Inspection'
										? 'text-blue-600 font-medium'
										: 'text-black'
								)}
							>
								Inspection
							</button>
							<button
								onClick={() => setMode('Inventory')}
								className={twMerge(
									'hover:text-blue-600 transition-colors duration-300 ease-in',
									mode == 'Inventory'
										? 'text-blue-600 font-medium'
										: 'text-black'
								)}
							>
								Inventory
							</button>
							<button
								onClick={() => setIsModalOpen(true)}
								className={twMerge(
									'hover:text-blue-600 transition delay-75 duration-150 ease-in',
									isModalOpen ? 'text-blue-600 font-medium' : 'text-black'
								)}
							>
								Records
							</button>
						</div>
						<Modal
							isOpen={isModalOpen}
							className='max-w-full max-h-full w-[90vw] lg:w-[600px] p-5 lg:p-10'
							onClose={handleCloseModal}
						>
							<RecordsList records={toJS(store.lastRecords)} />
						</Modal>
						{mode === 'Inspection' ? <InspectionForm /> : <InventoryForm />}
					</Card>
					<ToastContainer
						position='bottom-right'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='light'
						transition={Slide}
					/>
				</>
			) : (
				<LoginForm />
			)}
		</>
	)
})
