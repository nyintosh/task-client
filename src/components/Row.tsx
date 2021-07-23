import React from 'react';
import { FaPen, FaTrash, FaSpinner, FaCheck } from 'react-icons/fa';

import { ITask } from '../interfaces';

interface IProps {
	task: ITask;
	handleDelete: (task: ITask) => void;
	handleEdit: (task: ITask) => void;
}

const Row: React.FC<IProps> = ({ task, handleDelete, handleEdit }) => {
	return (
		<li
			key={task.id}
			className='list-group-item d-flex justify-content-between align-items-center'
		>
			<div className='leading-icon'>
				{task.completed ? <FaCheck color='#05ce91' /> : <FaSpinner color='#ffca28' />}
			</div>
			<div className='ms-2 me-2'>
				<div className='fw-bold fs-5'>{task.title}</div>
				{task.description}
			</div>
			<span>
				<button
					className='mbtn btn btn-secondary m-2 ms-0'
					onClick={() => handleEdit(task)}
				>
					<FaPen />
				</button>
				<button className='mbtn btn btn-danger' onClick={() => handleDelete(task)}>
					<FaTrash />
				</button>
			</span>
		</li>
	);
};

export default Row;
