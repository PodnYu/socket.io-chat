import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import AppContext from './AppContext';

function App() {
	return (
		<AppContext>
			<Header />
			<ChatContainer />
		</AppContext>
	);
}

export default App;
