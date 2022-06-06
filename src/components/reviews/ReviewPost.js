import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './ReviewPost.scss';

const ReviewPost = ({ itemInfo }) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(itemInfo);

  const deletePost = () => {
    fetch(`http://10.58.1.252:8000/reviews/${params.id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        if (result => result === 'SUCCESS') {
          navigate(-1);
        } else {
          alert('잘못된 요청입니다');
        }
      });
  };

  return (
    <main className="mainPost" key={itemInfo.review_id}>
      <div className="postSubject">
        <div>제목</div>
        <div>{itemInfo.title}</div>
      </div>
      <div className="postAuthor">
        <div>작성자</div>
        <div>{itemInfo.review_writer}</div>
      </div>
      <div className="postDateView">
        <div>
          <span className="postDate">작성일 {itemInfo.title_created_at}</span>
          <span className="postView">조회수 {itemInfo.view_count}</span>
        </div>
        <div>
          <button onClick={deletePost}>삭제</button>
        </div>
      </div>
      <article className="postArea">{itemInfo.review_title}</article>
    </main>
  );
};

export default ReviewPost;
