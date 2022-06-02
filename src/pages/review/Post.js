import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import TextItem from '../../components/reviews/TextItem';
import ReviewPost from '../../components/reviews/ReviewPost';
import './Post.scss';

const PRODUCT_INFO = [
  {
    img: 'https://crowcanyon.co.kr/web/product/tiny/202201/340ff70c75de7d1e91b0979a59a228e6.jpg',
    NEW: true,
    품절: true,
    name: 'D49 스몰스푼 베이비 블루마블',
    price: 9000,
  },
];

const Post = () => {
  const [postList, setPostList] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/data/relatedProductData.json/${params.id}`)
      .then(res => res.json())
      .then(productData => setPostList(productData));
  }, []);
  // console.log(textList[0]?.post); ?. => optional chaining 조건부 랜더링

  const navigate = useNavigate();
  const goToTextList = () => {
    navigate('/review_page');
  };
  return (
    <>
      <Nav />
      <div className="post">
        <header className="slideRight">
          <h1>상품후기</h1>
        </header>
        <section className="product">
          <div className="productInfo">
            <img src={`${PRODUCT_INFO[0].img}`} alt="productPhoto" />
            <div className="detailedInfo">
              <div className="receivingStatus">
                <span>{PRODUCT_INFO[0].NEW && 'NEW'}</span>
                <span>{PRODUCT_INFO[0].품절 && '품절'}</span>
              </div>
              <div className="productName">{PRODUCT_INFO[0].name}</div>
              <div className="productPrice">{PRODUCT_INFO[0].price}</div>
              <button className="viewDetails">상품 상세보기</button>
            </div>
          </div>
        </section>
        <ReviewPost textList={postList} />
        {/* 목데이터를 따로 만드는 게 낫다 하나라도 */}
        <button className="goList" onClick={goToTextList}>
          목록
        </button>
        <section className="reply">
          <article className="replyText">
            <div className="replyModifyDelete">
              <div className="replyAuthorContainer">
                <span className="replyAuthor">크로우캐년 코리아</span>
                <span className="replydate">2022-05-19 10:02:30</span>
              </div>
              <div className="replyBtnContainer">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
            <div className="replyTextArea">
              안녕하세요, 고객님
              <br />
              SCOPESEOUL 입니다. <br />
              소중한 리뷰를 남겨주셔서 감사합니다 ^^ <br />
              우선 고객님께 제품으로 인해 아쉬움을 드려 죄송하며, <br />
              고객 서비스로 인해 불편을 드려 죄송합니다.
              <br />
              더 다양하고 만족스러운 제품과 개선된 고객 서비스로 찾아뵙겠습니다.
              <br />
              앞으로도 크로우캐년 많은 사랑 부탁드립니다. <br />
              늘 건강에 유의하시길 바라며, <br />
              오늘도 행복한 하루 보내세요 :-)
            </div>
          </article>
          <article className="replyAdmin">
            회원에게만 댓글 작성 권한이 있습니다.
          </article>
        </section>
        <div className="nextText">
          <div className="prevArticle">
            <div className="arrowUp">
              <AiOutlineArrowDown /> 이전글
            </div>
          </div>
          <div className="nextArticle">
            <div className="arrowDown">
              <AiOutlineArrowUp /> 다음글
            </div>
            <div className="articleLink">
              <button>너무 예쁨</button>
            </div>
          </div>
        </div>
        <section className="relatedArticles">
          <h3>관련 글 보기</h3>
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>상품명</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {postList
                .filter(data => data.id < 6)
                .map(productData => (
                  <TextItem
                    key={productData.id}
                    postItem={productData}
                    isImgShow={false}
                  />
                ))}
              {/* 백엔드가 나와야 게시글 id에 대해 이동가능하고 화요일에 세션있음 */}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Post;
