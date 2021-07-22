import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { ITask } from '../interfaces';

interface IProps {
	activeTask: ITask;
	toggle: () => void;
	onSave: (item: ITask) => void;
}

const CustomModal: React.FC<IProps> = ({ activeTask, toggle, onSave }) => {
	const [currentTask, setCurrentTask] = useState<ITask>(activeTask);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		setCurrentTask({ ...currentTask, [e.target.name]: value });
	};

	return (
		<Modal isOpen={true} toggle={toggle}>
			<ModalHeader toggle={toggle}>Task</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup className='mb-2'>
						<Label for='task-title'>Title</Label>
						<Input
							id='task-title'
							type='text'
							name='title'
							placeholder='Enter task title'
							value={currentTask.title}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className='mb-2'>
						<Label for='task-description'>Description</Label>
						<Input
							id='task-description'
							type='text'
							name='description'
							placeholder='Enter task description'
							value={currentTask.description}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className='mb-2'>
						<Label for='task-name'>Name</Label>
						<Input
							id='task-name'
							type='text'
							name='name'
							placeholder='Enter name'
							value={currentTask.name}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className='mb-2'>
						<Label for='task-pickup_location'>Pickup Location</Label>
						<Input
							id='task-pickup_location'
							type='text'
							name='pickup_location'
							placeholder='Enter pickup location'
							value={currentTask.pickup_location}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className='mb-2'>
						<Label for='task-dropoff_location'>Dropoff Location</Label>
						<Input
							id='task-dropoff_location'
							type='text'
							name='dropoff_location'
							placeholder='Enter dropoff location'
							value={currentTask.dropoff_location}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className='mb-2'>
						<Label for='task-notes'>Notes</Label>
						<Input
							id='task-notes'
							type='text'
							name='notes'
							placeholder='Enter notes'
							value={currentTask.notes}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className='mb-3'>
						<Label for='task-date'>Date</Label>
						<Input id='task-date' type='date' name='date' value={currentTask.date} onChange={handleChange} />
					</FormGroup>
					<FormGroup className='mb-2'>
						<Label for='task-completed'>
							<Input
								id='task-completed'
								type='checkbox'
								name='completed'
								checked={currentTask.completed}
								onChange={handleChange}
							/>{' '}
							Completed
						</Label>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color='success' onClick={() => onSave(currentTask)}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default CustomModal;
