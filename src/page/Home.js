import { useSelector } from 'react-redux';
import QuestionCard from '../components/QuestionCard';

const Home = () => {
  const noData = <span>Not data to display</span>;
  const infoAuth = useSelector((state) => state.authUser);
  const answerOfUser = useSelector((state) => state.users.users)[
    infoAuth.username
  ].answers;
  const arrIdAnswerOfUser = Object.keys(answerOfUser);

  const listQuestionsSortNewst = Object.values(
    useSelector((state) => state.questions.questions)
  ).sort((a, b) => b.timestamp - a.timestamp);

  const listQuestionsNew = listQuestionsSortNewst.filter(
    (question) => !arrIdAnswerOfUser.includes(question.id)
  );
  const listQuestionsDone = listQuestionsSortNewst.filter((question) =>
    arrIdAnswerOfUser.includes(question.id)
  );
  return (
    <div className='home'>
      <div className='home-new'>
        <h1>New Question</h1>
        <div className='home-list'>
          {listQuestionsNew.length > 0
            ? listQuestionsNew.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            : noData}
        </div>
      </div>
      <div className='home-done'>
        <h1>Done</h1>
        <div className='home-list'>
          {listQuestionsDone.length > 0
            ? listQuestionsDone.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            : noData}
        </div>
      </div>
    </div>
  );
};

export default Home;
