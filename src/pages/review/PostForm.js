import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PostForm.scss';

const PostForm = () => {
  const navigate = useNavigate();
  const goToReviewList = () => {
    navigate('/review_page');
  };

  const [makeListTransfer, setMakeListTransfer] = useState({
    subject: '',
    option: '',
    content: '',
    password: '',
  });

  const [option, setOption] = useState('');

  // id
  // name

  const postComment = () => {
    fetch('http://10.58.0.159:8000/products/', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.Xq23aHvqQlqnQtXkwVbGPaJQmKHPJHiD5QxERAx1kCU',
      },
      body: JSON.stringify(makeListTransfer),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'success') {
          navigate('/review_page');
        } else {
          alert('잘못된 요청입니다');
        }
      });
  };
  // http://10.58.0.159:8000/users/purchaseproduct

  useEffect(() => {
    fetch('/data/optiondata.json')
      .then(res => res.json())
      .then(res => {
        setOption(res);
      });
  }, []);

  const postTransfer = e => {
    setMakeListTransfer({
      ...makeListTransfer,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="postForm">
      <header className="slideRight">
        <h1>상품후기</h1>
      </header>
      <form className="reviewFormContainer">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="subject" onChange={postTransfer} />
                <select
                  className="reviewOption"
                  name="option"
                  onChange={postTransfer}
                >
                  <option>제품 선택</option>
                  {option.map(a => {
                    return (
                      <>
                        <option key={a.id}>{a.name}</option>
                      </>
                    );
                  })}
                </select>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="textArea" colSpan="2">
                <textarea name="content" onChange={postTransfer} />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input
                  type="password"
                  name="password"
                  onChange={postTransfer}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <section className="btns">
          <div>
            <button className="listBtn" onClick={goToReviewList}>
              목록
            </button>
          </div>
          <div>
            <button className="createBtn" onClick={postComment}>
              등록
            </button>
            <button className="cancleBtn" onClick={goToReviewList}>
              취소
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default PostForm;
