import React from 'react';
import { CircleLoader } from 'react-spinners';

interface IProps {
	active: boolean;
}

const Preloader: React.FC<IProps> = ({ active }) => {
	return (
		<div className={`preloader ${active && 'active'}`}>
			<CircleLoader color='#2196f3' />
		</div>
	);
};

export default Preloader;
