import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import TextItem from '../../components/reviews/TextItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import './ReviewPage.scss';

const ReviewPage = () => {
  const [textList, setTextList] = useState([]);

  const [searchTransfer, setSearchTransfer] = useState({
    searchTag: '',
    searchPerid: '',
    searchInput: '',
  });

  const inputTransfer = e => {
    setSearchTransfer({
      ...searchTransfer,
      [e.target.name]: e.target.value,
    });
  };
  console.log('text', textList);

  const transferBack = () => {
    fetch('http://10.58.0.159:8000/products/', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify(searchTransfer),
    })
      .then(res => res.json())
      .then(res => {
        if (res => res === 'SUCCESS') {
          navigate('/review_page');
        } else {
          alert('잘못된 요청입니다');
        }
      });
  };
  const location = useLocation();

  useEffect(() => {
    fetch('http://10.58.1.252:8000/reviews/whole')
      // 백 api
      // fetch('/data/relatedProductData.json')
      .then(res => res.json())
      .then(productData => setTextList(productData.message));
  }, [location.pathname]);

  const navigate = useNavigate();
  const goToReviewForm = () => {
    navigate('/review_form');
  };

  const token = localStorage.getItem('Authorization');

  return (
    <>
      <Nav />
      <div className="ReviewPage">
        <header className="slideRight">
          <h1>상품후기</h1>
        </header>
        <main className="productList">
          <h3>모든리뷰</h3>
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>PRODUCT</th>
                <th>SUBJECT</th>
                <th>NAME</th>
                <th>DATE</th>
                <th>HIT</th>
              </tr>
            </thead>
            <tbody>
              {textList.map(productData => (
                <TextItem
                  key={productData.id}
                  postItem={productData}
                  isImgShow={true}
                />
              ))}
            </tbody>
          </table>
        </main>
        <section className="btnSearch">
          <article className="prevNextBtn">
            <button className="prevBtn">
              <AiOutlineArrowLeft />
              PREV
            </button>
            <ul className="orderBtnList">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
            </ul>
            <button className="nextBtn">
              NEXT
              <AiOutlineArrowRight />
            </button>
          </article>
          <article className="searchText">
            <fieldset className="searchField">
              <span>검색어</span>
              <select
                className="searchPeriod"
                name="searchPeroid"
                onChange={inputTransfer}
              >
                <option>일주일</option>
                <option>한달</option>
                <option>세달</option>
                <option>전체</option>
              </select>
              <select
                className="searchOption"
                name="searchTag"
                onChange={inputTransfer}
              >
                <option>제목</option>
                <option>내용</option>
                <option>글쓴이</option>
                <option>아이디</option>
                <option>별명</option>
                <option>상품정보</option>
              </select>
              <input
                className="searchInput"
                name="searchInput"
                onInput={inputTransfer}
                type="text"
              />
              <button className="searchBtn" onClick={transferBack}>
                찾기
              </button>
            </fieldset>
            {token && (
              <button className="reviewWrite" onClick={goToReviewForm}>
                글쓰기
              </button>
            )}
          </article>
        </section>
      </div>
    </>
  );
};

export default ReviewPage;
