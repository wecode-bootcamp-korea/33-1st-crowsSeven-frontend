import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/productDetail/ProductDetail';
import Store from './pages/store/Store';
import Cart from './pages/cart/Cart';
import Nav from './components/Nav/Nav';
import Post from './pages/review/Post';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Main from './pages/main/Main';
import MyPage from './pages/mypage/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/store" element={<Store />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/review_post" element={<Post />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
