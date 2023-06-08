import logo from './logo.svg';
import './App.css';
import useDataFetching from './hooks/useData';

function App() {
  console.log('env is '  +process.env.NODE_ENV);
  const appRoot = process.env.NODE_ENV === 'production' ? 'https://app.linn.co.uk' : 'https://app-sys.linn.co.uk';
  const { data, loading, error } = useDataFetching(appRoot + '/users/promotions/lp12-50');

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A nice new React App
        </p>
      </header>
    </div>
  );
}

export default App;
