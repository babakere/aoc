import './App.css';
import './styles.scss';
import Header from './header';
import MainPage_ali from './pages/MainPage_ali';
import deregister_ali from './pages/deregister_ali';


function App() {
  return (
    <div className="App">
      <Header />
      <h1>AOC Surgery</h1>
      <h1>WeLcoMe TO AOC SURGERY</h1>

      
      
      <MainPage_ali/>
      
      <deregister_ali />
    </div>
  );
}

export default App;
