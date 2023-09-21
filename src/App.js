import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/noteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <div className="container">
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/about" Component={About}></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
