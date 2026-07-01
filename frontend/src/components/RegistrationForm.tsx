import { useCallback, useContext, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Context } from '../main'
import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'

export const RegistrationForm: React.FC<{ className?: string }> = ({
	className,
}) => {
	const [fullName, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const [secretKey, setSecretKey] = useState('')
	const [error, setError] = useState('')

	const handlePasswordChange = useCallback(
		(value: string) => setPassword(value),
		[]
	)

	const handleFullNameChange = useCallback(
		(value: string) => setFullName(value),
		[]
	)

	const handleSecretKeyChange = useCallback(
		(value: string) => setSecretKey(value),
		[]
	)

	const isFormValid = useMemo(
		() => Boolean(secretKey && password && fullName),
		[secretKey, password, fullName]
	)

	const { store } = useContext(Context)

	const handleRegistration = useCallback(async () => {
		try {
			await store.registration(password, fullName, secretKey)
		} catch (error) {
			setError(error?.message)
		}
	}, [password, secretKey, fullName])

	return (
		<Card className='mt-10 px-10 py-5 h-[400px] w-3/4 lg:w-96'>
			<div
				className={twMerge(
					'flex flex-col items-center justify-between h-full',
					className
				)}
			>
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-2xl lg:text-3xl'>Registration</h1>
					{error && <p className='text-red-600'>{error}</p>}
				</div>
				<Input
					value={fullName}
					onChange={handleFullNameChange}
					label='Full name'
					placeholder='Enter a full name'
				/>
				<Input
					value={password}
					onChange={handlePasswordChange}
					label='Password'
					type='password'
					placeholder='Enter a password'
				/>
				<Input
					value={secretKey}
					onChange={handleSecretKeyChange}
					label='Secret key'
					type='password'
					placeholder='Enter a secret key'
				/>
				<Button
					disabled={!isFormValid}
					onClick={handleRegistration}
					color='blue'
				>
					Register
				</Button>
			</div>
		</Card>
	)
}
