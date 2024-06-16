import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { _saveQuestionAnswer } from '../common/_DATA';
import {
  answerVoteOfUser,
  answerVoteQuestion,
  startLoading,
  stopLoading
} from '../actions';
import NotFound from './NotFound';

const ShowQuestion = () => {
  const dispatch = useDispatch();
  const { questionId } = useParams();

  const username = useSelector((state) => state.authUser.username);
  const listQuestions = useSelector((state) => state.questions.questions);
  const listUsers = useSelector((state) => state.users.users);
  const isLoading = useSelector((state) => state.loading.isLoading);

  const infoQuestion = listQuestions[questionId];
  if (!infoQuestion || !username) {
    return <NotFound />;
  }

  const isVotedOptionOne = infoQuestion.optionOne.votes.includes(username);
  const isVotedOptionTwo = infoQuestion.optionTwo.votes.includes(username);
  const isVoted = isVotedOptionOne || isVotedOptionTwo;
  const optionOne = infoQuestion.optionOne.text;
  const optionTwo = infoQuestion.optionTwo.text;

  const cntVoteOptionOne = infoQuestion.optionOne.votes.length;
  const cntVoteOptionTwo = infoQuestion.optionTwo.votes.length;
  const totalVoted = cntVoteOptionOne + cntVoteOptionTwo;
  const percentOptionOne = Math.round((cntVoteOptionOne / totalVoted) * 100);
  const percentOptionTwo = 100 - percentOptionOne;

  const classNameVotedOptionOne = isVotedOptionOne
    ? 'answer isVoted'
    : 'answer';
  const classNameVotedOptionTwo = isVotedOptionTwo
    ? 'answer isVoted'
    : 'answer';

  const handleVote = (option) => {
    dispatch(startLoading());
    _saveQuestionAnswer({
      authedUser: username,
      qid: questionId,
      answer: option
    })
      .then(() => {
        dispatch(
          answerVoteOfUser({
            user: username,
            qid: questionId,
            answer: option
          })
        );
        dispatch(
          answerVoteQuestion({
            user: username,
            qid: questionId,
            answer: option
          })
        );
        dispatch(stopLoading());
      })
      .catch((e) => {
        console.log('Error is occured: ', e);
      });
  };

  return (
    <div className='showquestion'>
      <h1>Poll by {listUsers[infoQuestion.author].name}</h1>
      <img src={listUsers[infoQuestion.author].avatarURL} />
      <h3>Would You Rather</h3>
      <p>
        Total Voted: {totalVoted}
        <br />
        Option One: {cntVoteOptionOne} ({percentOptionOne}%)
        <br />
        Option Two: {cntVoteOptionTwo} ({percentOptionTwo}%)
      </p>
      {isVoted && (
        <p>
          You are vodted for <b>{isVotedOptionOne ? optionOne : optionTwo}</b>
        </p>
      )}
      <div className='chooseanswer'>
        <div className={classNameVotedOptionOne}>
          <p>{optionOne}</p>
          {isVoted && <button disabled>Voted</button>}
          {!isVoted && isLoading && <button disabled>Voting</button>}
          {!isVoted && !isLoading && (
            <button onClick={(e) => handleVote('optionOne')}>Click</button>
          )}
        </div>
        <div className={classNameVotedOptionTwo}>
          <p>{optionTwo}</p>
          {isVoted && <button disabled>Voted</button>}
          {!isVoted && isLoading && <button disabled>Voting</button>}
          {!isVoted && !isLoading && (
            <button onClick={(e) => handleVote('optionTwo')}>Click</button>
          )}
        </div>
      </div>
      {isVoted && <NavLink to='/'>Back to Home</NavLink>}
    </div>
  );
};

export default ShowQuestion;
