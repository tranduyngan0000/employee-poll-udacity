import { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { setUsers, setListQuestions } from './actions';
import Navigation from './components/Navigation';
import Login from './page/Login';
import Home from './page/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { initData } from './common/_DATA';
import Leaderboard from './page/Leaderboard';
import CreateQuestion from './page/CreateQuestion';
import ShowQuestion from './page/ShowQuestion';
import NotFound from './page/NotFound';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initData().then(({ users, questions }) => {
      dispatch(setUsers(users));
      dispatch(setListQuestions(questions));
    });
  }, [dispatch]);
  return (
    <div className='App'>
      <Fragment>
        <Navigation />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/newquestion' element={<CreateQuestion />} />
            <Route path='/questions/:questionId' element={<ShowQuestion />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
