// import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'
import SearchCriteriaPage from './components/SearchCriteriaPage.js'

function App() {
  return (
    <div className="App">
      <div className="pageContent">
        <div className="pageTitleContainer">
            <text className="pageTitle">
            </text>
        </div>
      
      <SearchCriteriaPage></SearchCriteriaPage>
      {/* <HomePage title={"Home Page"}></HomePage> */}
      {/* <LoginPage title={"Scraper Log In"}></LoginPage> */}
    </div>
      
      
      
      
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
