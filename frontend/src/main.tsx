import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Router (for navigation)
import { BrowserRouter as Router } from 'react-router-dom';

// NextUI
import { NextUIProvider } from '@nextui-org/react';

// App
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Router>
		<Provider store={store}>
			<NextUIProvider>
				<App />
			</NextUIProvider>
		</Provider>
	</Router>
);
