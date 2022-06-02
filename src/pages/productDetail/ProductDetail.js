import { FiHeart } from 'react-icons/fi';
import { MdPhotoSizeSelectSmall } from 'react-icons/md';
import { GrFacebook, GrTwitter, GrClose } from 'react-icons/gr';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import ReviewDrawerPage from './ReviewDrawer';
import QnADrawerPage from './QnADrawer';
import './ProductDetail.scss';

const ProductDetail = () => {
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(1);
  const [reviewDrawer, setReviewDrawer] = useState(false);
  const [QnADrawer, setQnADrawer] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { thumbnail_image_url, name, description, price, option_product_id } =
    items;

  useEffect(() => {
    fetch(`http://10.58.1.252:8000/products/${params.id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => setItems(result.results));
  }, [params.id]);

  const goToCart = () => {
    fetch(`http://10.58.1.252:8000/carts/`, {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTB9.i1C1V7Mue-i8VfcUp-ZO-kzEDgLOxX7xzQK7WLadk7U',
      },
      body: JSON.stringify({
        option_product_id: Number(option_product_id),
        count: Number(amount),
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          navigate('../cart');
        }
      });
  };

  const currentAmount = e => {
    const amount = e.target;
    setAmount(amount);
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    setAmount(amount - 1);
    if (amount <= 1) {
      alert('주문 수량은 1 이상이어야 합니다.');
      setAmount(1);
    }
  };

  const priceToString = Number(price).toLocaleString('ko-KR');
  const calculateTotalPrice = price * amount;
  const totalPriceToString = calculateTotalPrice.toLocaleString('ko-KR');

  const handleWishList = () => {
    alert('로그인 후 관심상품 등록을 해주세요.');
  };

  const handleReviewDrawer = () => setReviewDrawer(!reviewDrawer);

  const handleQnADrawer = () => {
    setQnADrawer(!QnADrawer);
  };

  return (
    <>
      <Nav />
      <div className="productDetail">
        <section className="imgSide">
          <img src={thumbnail_image_url} alt="Product Detail" />
        </section>
        <section className="descriptionSide">
          <div className="sideWrapper">
            <h2>{name}</h2>
            <div className="description">
              <ul>
                <li className="description">{description}</li>
                <li className="price">￦{priceToString}</li>
                <li>택배</li>
                <li>￦3,000 (￦50,000 이상 구매 시 무료)</li>
              </ul>
              <div className="amountTab">
                {name}
                <div className="inputAmount">
                  <div
                    className="amountInput"
                    onChange={currentAmount}
                    type="number"
                  >
                    <span>{amount}</span>
                  </div>
                  <div className="amountHandler">
                    <button onClick={increaseAmount} className="up">
                      <IoMdArrowDropup className="arrow" />
                    </button>
                    <button onClick={decreaseAmount} className="down">
                      <IoMdArrowDropdown className="arrow" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="totalPrice">
                TOTAL :<span> ￦{totalPriceToString} </span>({amount}개)
              </div>
              <div className="totalBuyBtn">
                <button className="buyBtn">구매하기</button>
                <button onClick={goToCart} className="cartBtn">
                  장바구니
                </button>
              </div>
              <button onClick={handleWishList} className="wishList">
                <FiHeart />
                <span>WISH LIST</span>
              </button>
              <div className="aboutItemBtn">
                <span>
                  <button onClick={handleReviewDrawer}>상품후기 (5)</button>
                  <button onClick={handleQnADrawer}>상품문의 (0)</button>
                </span>
                <button className="size">
                  <MdPhotoSizeSelectSmall className="sizeImg" />
                  SIZE
                </button>
              </div>
              <div className="snsBtn">
                <GrFacebook className="facebookBtn" />
                <GrTwitter className="twitterBtn" />
              </div>
            </div>
          </div>
        </section>
        <div className={reviewDrawer ? 'drawerPage active' : 'drawerPage'}>
          <ReviewDrawerPage />
          <GrClose onClick={handleReviewDrawer} className="cancel" />
        </div>
        <div
          className={
            reviewDrawer ? 'drawerBackground active' : 'drawerBackground'
          }
        />
        <div
          onClick={handleReviewDrawer}
          className={
            reviewDrawer ? 'drawerBackground active' : 'drawerBackground'
          }
        />

        <div className={QnADrawer ? 'drawerPage active' : 'drawerPage'}>
          <QnADrawerPage />
          <button onClick={handleQnADrawer}>x</button>
        </div>
        <div
          onClick={handleQnADrawer}
          className={QnADrawer ? 'drawerBackground active' : 'drawerBackground'}
        />
      </div>
    </>
  );
};

export default ProductDetail;
