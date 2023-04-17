import './App.css';
import './styles.scss';
import Header from './header';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <Header />
      <h1>This is the Home Page</h1>
      <MainPage />
    </div>
  );
}

export default App;
