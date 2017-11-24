import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

const render = Component => {
	ReactDom.render(
		<Component />,
		document.getElementById('root')
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./app', () => { render(App) });

	// module.hot.dispose(data => {
	// 	data.store = store;
	// });
}