import { useState } from 'react';
import {
  createQuestion,
  startLoading,
  stopLoading,
  updateQuestionOfUser
} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _saveQuestion } from '../common/_DATA';

const CreateQuestion = () => {
  const [optionOne, setoptionOne] = useState('');
  const [optionTwo, setoptionTwo] = useState('');
  const [error, setError] = useState('');
  const infoAuth = useSelector((state) => state.authUser);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!optionOne || !optionTwo) {
      setError(`Option can't empty`);
      return;
    }
    dispatch(startLoading());
    _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: infoAuth.username
    })
      .then((question) => {
        dispatch(createQuestion(question));
        dispatch(updateQuestionOfUser(question));
        dispatch(stopLoading());
        setError('');
        navigate('/');
      })
      .catch((e) => {
        console.log('Create question error: ', e);
      });
  };

  return (
    <div className='createquestion'>
      <h1>WOULD YOU RATHER</h1>
      <p>Create your Own Poll</p>
      <form className='createquestion-form' onSubmit={handleSubmit}>
        <div className='createquestion-info'>
          <label>First Option</label>
          <input
            type='text'
            placeholder='Option One'
            value={optionOne}
            onChange={(e) => setoptionOne(e.target.value)}
          />
          <label>Second Option</label>
          <input
            type='text'
            placeholder='Option Two'
            value={optionTwo}
            onChange={(e) => setoptionTwo(e.target.value)}
          />
        </div>
        {isLoading ? <span>Submitting</span> : <button>Submit</button>}
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CreateQuestion;
