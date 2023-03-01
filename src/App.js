import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './header/header';
import Home from './home/home';
import Technology from './technology/technology';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Technology />} />
      </Routes>
    </div>
  );
}

export default App;
