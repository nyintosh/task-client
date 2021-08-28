import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

import { ITask } from './interfaces';
import { TabList, Row, Modal, Preloader } from './components';

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
	const [filterTask, setFilterTask] = useState('all');
	const [taskList, setTaskList] = useState<ITask[]>([]);
	const [isModal, setIsModal] = useState(false);
	const [activeTask, setActiveTask] = useState<ITask>(INITIAL_STATE);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		syncTasks();
	}, []);

	const syncTasks = async () => {
		try {
			setIsLoaded(false);
			const res = await axios.get('/api/todo/');
			const data = await res.data;
			setTaskList(data);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoaded(true);
		}
	};

	const modalToggle = () => {
		console.clear();
		setIsModal((isActive) => !isActive);
		setActiveTask(INITIAL_STATE);
	};

	const handleAdd = () => setIsModal(true);

	const handleDelete = async (task: ITask) => {
		try {
			setIsLoaded(false);
			await axios.delete(`/api/todo/${task.id}/`);
			syncTasks();
		} catch (e) {
			console.log(e);
		}
	};

	const handleEdit = (task: ITask) => {
		setIsModal(true);
		setActiveTask(task);
	};

	const handleSubmit = async (item: ITask) => {
		modalToggle();

		try {
			setIsLoaded(false);
			if (item.id) {
				await axios.put(`/api/todo/${item.id}/`, item);
				return syncTasks();
			}
			await axios.post('/api/todo/', item);
			syncTasks();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Preloader active={!isLoaded} />
			<main className='container'>
				<h1 className='text-white text-center my-4'>Tasks™</h1>
				<div className='row'>
					<div className='col-md-6 col-sm-10 mx-auto p-0'>
						<div className='card p-3'>
							<div className='mb-4'>
								<button className='mbtn btn btn-primary' onClick={handleAdd}>
									<FaPlus />
								</button>
							</div>
							{<TabList filter={filterTask} setFilter={setFilterTask} />}
							<ul className='list-group list-group-flush border-top-0'>
								{taskList
									.filter((task) =>
										filterTask === 'completed'
											? task.completed
											: filterTask === 'pending'
											? !task.completed
											: task
									)
									.map((task) => (
										<Row
											key={task.id}
											handleDelete={handleDelete}
											handleEdit={handleEdit}
											task={task}
										/>
									))}
							</ul>
						</div>
					</div>
				</div>
				{isModal && (
					<Modal activeTask={activeTask} toggle={modalToggle} onSave={handleSubmit} />
				)}
			</main>
		</>
	);
};

export default App;
