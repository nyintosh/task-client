import React from 'react';

interface IProps {
	isCompleted: boolean;
	setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const TabList: React.FC<IProps> = ({ isCompleted, setIsCompleted }) => {
	return (
		<div className='nav nav-tabs'>
			<span
				className={isCompleted ? 'nav-link active' : 'nav-link'}
				onClick={() => setIsCompleted(true)}
			>
				Completed
			</span>
			<span
				className={isCompleted ? 'nav-link' : 'nav-link active'}
				onClick={() => setIsCompleted(false)}
			>
				Incomplete
			</span>
		</div>
	);
};

export default TabList;
