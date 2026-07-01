import { memo, useContext, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Context } from '../main'
import { Button } from './Button'
import { Card } from './Card'
import { Dropdown } from './Dropdown'
import { Input } from './Input'

const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
	const [password, setPassword] = useState<string>('')
	const [worker, setWorker] = useState('')
	const [error, setError] = useState('none')

	const isFormValid = worker && password
	const options = useMemo(
		() => [
			{ label: '1. Before test', value: '1' },
			{ label: '2. After test', value: '2' },
		],
		[]
	)

	const { store } = useContext(Context)

	const handleLogin = async () => {
		try {
			await store.login(password, worker)
		} catch (error) {
			setError(error?.message)
		}
	}

	return (
		<Card className='mt-10 h-96 w-3/4 lg:w-96 px-10 py-5'>
			<div
				className={twMerge(
					'flex flex-col items-center justify-between h-full',
					className
				)}
			>
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-2xl lg:text-3xl'>Login</h1>
					<p
						className={twMerge(
							'text-red-600 text-sm',
							error != 'none' ? 'visible' : 'invisible'
						)}
					>
						{error}
					</p>
				</div>
				<Input
					value={password}
					onChange={setPassword}
					label='Password'
					type='password'
					placeholder='Enter a password'
				/>

				<Dropdown
					onChange={setWorker}
					options={options}
					value={worker}
					placeholder='Enter a work station'
					label='Work station'
				/>

				<Button disabled={!isFormValid} onClick={handleLogin} color='blue'>
					Login
				</Button>
			</div>
		</Card>
	)
}

export default memo(LoginForm)
