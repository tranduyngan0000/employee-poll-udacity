import { Link } from 'react-router-dom';

const QuestionCard = (props) => {
  const formatDate = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat(undefined, options).format(timestamp);
  };

  return (
    <div className='question-card'>
      <p className='question-author'>{props.question.author}</p>
      <p className='question-time'>{formatDate(props.question.timestamp)}</p>
      <Link to={`/questions/${props.question.id}`}>Show</Link>
    </div>
  );
};

export default QuestionCard;
