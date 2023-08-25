import { FC } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'

import { MainLayout } from './routes'
const App: FC = () => {
	return (
		<>
			<Provider store={store}>
				<MainLayout />
			</Provider>
		</>
	)
}

export default App
