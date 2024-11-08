// import './App.css';
import {                                                         
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import { ContextProvider } from './ContextProvider';

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
    </ContextProvider>
  );
}

export default App;








