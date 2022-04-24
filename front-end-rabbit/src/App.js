import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home.js'
import EditFilm from './components/EditFilm.js';


function App() {

  return (

    <div className="App">

      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EditFilm" element={<EditFilm />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
