// import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'

function App() {
  return (
    <div className="App">
      
      
      {/* <HomePage title={"Home Page"}></HomePage> */}
      <LoginPage title={"Scraper Log In"}></LoginPage>
      
      
      
      
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
