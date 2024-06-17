import { useSelector } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import { useState } from 'react';

const Home = () => {
  const [tab, setTab] = useState('new');
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
  const handleChangeTab = (tabName) => {
    if (tabName === 'new') {
      setTab('new');
    } else {
      setTab('done');
    }
  };
  return (
    <div className='home'>
      <div className='home-new'>
        <div className='home-tab'>
          <p
            className={tab === 'new' ? 'active' : ''}
            onClick={() => handleChangeTab('new')}
          >
            New Question
          </p>
          <p
            className={tab === 'done' ? 'active' : ''}
            onClick={() => handleChangeTab('done')}
          >
            Done Question
          </p>
        </div>
        {tab === 'new' && (
          <div className='home-list'>
            {listQuestionsNew.length > 0
              ? listQuestionsNew.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))
              : noData}
          </div>
        )}
      </div>
      <div className='home-done'>
        {tab === 'done' && (
          <div className='home-list'>
            {listQuestionsDone.length > 0
              ? listQuestionsDone.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))
              : noData}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
