import './App.css';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import SocketContext from './SocketContext';

function App() {
	return (
		<SocketContext>
			<Header />
			<ChatContainer />
		</SocketContext>
	);
}

export default App;
