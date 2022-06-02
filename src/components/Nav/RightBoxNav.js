import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './RightBoxNav.scss';

const RightBoxNav = ({ isToggle, handleClick }) => {
  const navigate = useNavigate();
  const [loginSign, setLoginSign] = useState(true);
  const data = localStorage.getItem('Authorization');

  useEffect(() => {
    let copy = loginSign;
    if (data) {
      copy = false;
      setLoginSign(copy);
    }
  }, [data, loginSign]);

  const handleMoveLogin = () => {
    let copy = loginSign;
    if (loginSign === true && !data) {
      navigate('../login');
    } else if (loginSign === false && data) {
      copy = true;
      setLoginSign(copy);
      alert('로그아웃 되었습니다');
      localStorage.clear();
    }
  };

  const handleMoveCart = () => {
    navigate('/cart');
  };

  const handleMoveOrderCheck = () => {
    navigate('/orderCheck');
  };

  const handleMoveMyPage = () => {
    navigate('/mypage');
  };

  return (
    <>
      <section
        onClick={handleClick}
        className={`rigthBoxWrapper ${isToggle ? 'opacityZero' : ''}`}
      />
      <div className={`rightNavBox ${isToggle ? 'widthZero' : ''}`}>
        <GrClose onClick={handleClick} className="cancel" />
        <ul className="rightBoxText" onClick={handleClick}>
          <li onClick={handleMoveLogin}>{loginSign ? '로그인' : '로그아웃'}</li>
          <li onClick={handleMoveCart}>장바구니</li>
          <li onClick={handleMoveOrderCheck}>주문조회</li>
          <li onClick={handleMoveMyPage}>마이쇼핑</li>
          <span>최근 상품</span>
        </ul>
        <div />
      </div>
    </>
  );
};

export default RightBoxNav;
