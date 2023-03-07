import { Routes, Route } from 'react-router-dom';
import './App.css';
import Checklist from './checklist/checklist';
import Header from './header/header';
import Home from './home/home';
import Technology from './technology/Technology';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Technology />}>
          <Route path="/:id" element={<>Select Category</>} />
          <Route path="/:id/:cat" element={<Checklist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
