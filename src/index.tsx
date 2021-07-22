import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import './index.scss';

const $root = document.querySelector('#root');

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	$root
);
