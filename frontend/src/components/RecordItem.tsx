import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Record } from '../models/RecordResponse'

interface RecordItemProps {
	record: Record
	onDelete: () => Promise<void>
}

export const RecordItem: React.FC<RecordItemProps> = ({ record, onDelete }) => {
	const isInspection = 'defect' in record

	return (
		<div className='bg-gray-200 flex justify-between p-5 rounded-md shadow-md'>
			<div className='flex flex-col'>
				<RecordDetails record={record} isInspection={isInspection} />
			</div>
			<DeleteButton onDelete={onDelete} />
		</div>
	)
}

const RecordDetails: React.FC<{ record: Record; isInspection: boolean }> = ({
	record,
	isInspection,
}) => (
	<>
		<div>
			<strong>Date: </strong>
			{record.date.toLocaleDateString()}
		</div>
		<div>
			<strong>Product: </strong>
			{record.product}
		</div>
		{isInspection ? (
			<>
				<div>
					<strong>Defect type: </strong>
					{'defectType' in record ? record.defectType : 'N/A'}
				</div>
				<div>
					<strong>Defect: </strong>
					{'defect' in record ? record.defect : 'N/A'}
				</div>
			</>
		) : (
			<div>
				<strong>Quantity: </strong>
				{'quantity' in record ? record.quantity : 'N/A'}
			</div>
		)}
	</>
)

const DeleteButton: React.FC<{ onDelete: () => Promise<void> }> = ({
	onDelete,
}) => (
	<button
		onClick={onDelete}
		className='hover:text-red-500 delay-75 ease-in duration-300'
	>
		<FontAwesomeIcon icon={faTrash} />
	</button>
)
