import React from 'react';

interface IProps {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TabList: React.FC<IProps> = ({ filter, setFilter }) => {
	return (
		<div className='nav nav-tabs'>
			<span
				className={filter === 'all' ? 'nav-link active' : 'nav-link'}
				onClick={() => setFilter('all')}
			>
				All
			</span>
			<span
				className={filter === 'completed' ? 'nav-link active' : 'nav-link'}
				onClick={() => setFilter('completed')}
			>
				Completed
			</span>
			<span
				className={filter === 'pending' ? 'nav-link active' : 'nav-link'}
				onClick={() => setFilter('pending')}
			>
				Incomplete
			</span>
		</div>
	);
};

export default TabList;
