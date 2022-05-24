import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Signup from './pages/jongeun/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
