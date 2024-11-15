// import './App.css';
import {                                                         
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify' 
import { ContextProvider } from './ContextProvider';
import "./styles/tooltip.css"

function App() {
  return (
    <ContextProvider>
    <div className="App">
      <ToastContainer /> 
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








