import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PostForm.scss';

const PostForm = () => {
  const navigate = useNavigate();
  const goToReviewList = () => {
    navigate('/review_page');
  };

  const [makeListTransfer, setMakeListTransfer] = useState({
    title: '',
    option: '',
    context: '',
    password: '',
  });

  const [selectOption, setSelectOption] = useState([]);

  const { title, option, context, password } = makeListTransfer;
  const postComment = e => {
    e.preventDefault();
    fetch(`http://10.58.1.252:8000/reviews/product/${option}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        title: title,
        context: context,
        password: password,
      }),
    }).then(res => {
      if (res => res === 'SUCCESS') {
        navigate('/review_page');
      } else {
        alert('잘못된 요청입니다');
      }
    });
  };

  useEffect(() => {
    fetch('http://10.58.1.252:8000/users/purchasedproduct', {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setSelectOption(data.message);
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
      <form className="reviewFormContainer" method="POST">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" onChange={postTransfer} />
                <select
                  className="reviewOption"
                  name="option"
                  onChange={postTransfer}
                >
                  <option>제품 선택</option>
                  {selectOption.map(a => {
                    return (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="textArea" colSpan="2">
                <textarea name="context" onChange={postTransfer} />
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
