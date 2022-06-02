import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import ProductDetail from './pages/productDetail/ProductDetail';
import Store from './pages/store/Store';
import Cart from './pages/cart/Cart';
import Nav from './components/Nav/Nav';
import Orderpage from './pages/Order/OrderPage';
import Post from './pages/review/Post';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import StoreModal from './components/storeModal/StoreModal';
import ReviewPage from './pages/review/ReviewPage';
import PostForm from './pages/review/PostForm';
import MyPage from './pages/mypage/MyPage';
import OrderCheck from './pages/OrderCheck/OrderCheck';
import DeleteOrder from './pages/DeleteOrder/DeleteOrder';
import SearchResult from './pages/searchResult/SearchResult';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/order" element={<Orderpage />} />
        <Route path="/" element={<Main />} />
        <Route path="/store" element={<Store />} />
        <Route path="/storeModal" element={<StoreModal />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/review_post" element={<Post />} />
        <Route path="/review_page" element={<ReviewPage />} />
        <Route path="/review_form" element={<PostForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/orderCheck" element={<OrderCheck />} />
        <Route path="/deleteOrder" element={<DeleteOrder />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
