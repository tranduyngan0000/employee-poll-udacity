import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions';
const Navigation = () => {
  const infoAuth = useSelector((state) => state.authUser);
  const listUsers = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className='navigation'>
      <div className='navigation-title'>
        <span>Udacity</span>
      </div>
      <div className='navigation-main'>
        <div className='navigation-left'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/leaderboard'>Leaderboard</NavLink>
          <NavLink to='/newquestion'>New Question</NavLink>
        </div>
        <div className='navigation-right'>
          {infoAuth.isLoggedIn ? (
            <div>
              <img
                className='avatar'
                src={listUsers[infoAuth.username].avatarURL}
              />
              <div className='navigation-info'>
                <span>{listUsers[infoAuth.username].name}</span>
                <NavLink to='/' onClick={handleLogout}>
                  Logout
                </NavLink>
              </div>
            </div>
          ) : (
            <NavLink to='/login'>Login</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navigation;
