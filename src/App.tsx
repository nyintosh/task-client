import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ITask } from './interfaces';
import { Modal } from './components';

const INITIAL_STATE = {
	completed: false,
	title: '',
	description: '',
	name: '',
	pickup_location: '',
	dropoff_location: '',
	notes: '',
	date: '',
};

const App: React.FC = () => {
	const [isCompleted, setIsCompleted] = useState(false);
	const [taskList, setTaskList] = useState<ITask[]>([]);
	const [activeModal, setActiveModal] = useState(false);
	const [activeTask, setActiveTask] = useState<ITask>(INITIAL_STATE);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const res = await axios.get('/api/todo/');
			const data = await res.data;
			setTaskList(data);
		} catch (e) {
			console.log(e.response.data);
		}
	};

	const toggleModal = () => {
		setActiveModal((flag) => !flag);
		setActiveTask(INITIAL_STATE);
	};

	const handleSubmit = async (item: ITask) => {
		toggleModal();

		try {
			if (item.id) {
				await axios.put(`/api/todo/${item.id}/`, item);
				return fetchTasks();
			}
			await axios.post('/api/todo/', item);
			fetchTasks();
		} catch (e) {
			console.log(e.response.data);
		}
	};

	const handleEdit = (task: ITask) => {
		setActiveModal(true);
		setActiveTask(task);
	};

	const handleDelete = async (task: ITask) => {
		try {
			await axios.delete(`/api/todo/${task.id}`);
			fetchTasks();
		} catch (e) {
			console.log(e.response.data);
		}
	};

	const handleAdd = () => setActiveModal(true);

	const renderTabList = () => (
		<div className='nav nav-tabs'>
			<span className={isCompleted ? 'nav-link active' : 'nav-link'} onClick={() => setIsCompleted(true)}>
				Completed
			</span>
			<span className={isCompleted ? 'nav-link' : 'nav-link active'} onClick={() => setIsCompleted(false)}>
				Incomplete
			</span>
		</div>
	);

	const renderItems = () => {
		const tasks = taskList.filter((todo) => isCompleted === todo.completed);

		return tasks.map((task) => (
			<li key={task.id} className='list-group-item d-flex justify-content-between align-items-center'>
				<div className='ms-2 me-auto'>
					<div className='fw-bold fs-5'>{task.title}</div>
					{task.description}
				</div>
				<span>
					<button className='btn btn-secondary me-2' onClick={() => handleEdit(task)}>
						Edit
					</button>
					<button className='btn btn-danger' onClick={() => handleDelete(task)}>
						Delete
					</button>
				</span>
			</li>
		));
	};

	return (
		<main className='container'>
			<h1 className='text-white text-center my-4'>Tasks™</h1>
			<div className='row'>
				<div className='col-md-6 col-sm-10 mx-auto p-0'>
					<div className='card p-3'>
						<div className='mb-4'>
							<button className='btn btn-primary' onClick={handleAdd}>
								Add Task
							</button>
						</div>
						{renderTabList()}
						<ul className='list-group list-group-flush border-top-0'>{renderItems()}</ul>
					</div>
				</div>
			</div>
			{activeModal && <Modal activeTask={activeTask} toggle={toggleModal} onSave={handleSubmit} />}
		</main>
	);
};

export default App;
