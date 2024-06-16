import { useSelector } from 'react-redux';

const Leaderboard = () => {
  const listUsers = useSelector((state) => state.users.users);

  const leaderboardSorted = Object.entries(listUsers)
    .map(([user, value]) => {
      let username = value.name;
      let avatar = value.avatarURL;
      let answerCount = Object.keys(value.answers).length;
      let questionCount = value.questions.length;
      return {
        user,
        username,
        avatar,
        answerCount,
        questionCount
      };
    })
    .sort(function (a, b) {
      return (
        b.answerCount - a.answerCount ||
        b.questionCount - a.questionCount ||
        b.username.localeCompare(a.username)
      );
    });
  return (
    <div>
      <h1>LeaderBoard</h1>
      <table className='leaderboard'>
        <thead>
          <tr>
            <th className='leaderboard-user'>Users</th>
            <th className='leaderboard-answered'>Answered</th>
            <th className='leaderboard-created'>Created</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardSorted.map((user, index) => (
            <tr key={index}>
              <td className='leaderboard-user'>
                <div className='leaderboard-info'>
                  <img className='leaderboard-avatar' src={user.avatar} />
                  <div className='leaderboard-detail'>
                    <p className='username'>{user.username}</p>
                    <p className='userid'>{user.user}</p>
                  </div>
                </div>
              </td>
              <td className='leaderboard-answered'>{user.answerCount}</td>
              <td className='leaderboard-created'>{user.questionCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Leaderboard;
