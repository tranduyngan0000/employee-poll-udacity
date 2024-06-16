import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('LOGIN_SUCCESS');
export const register = createAction('REGISTER');
export const logout = createAction('LOGOUT');
export const setUsers = createAction('LIST_USERS');
export const setListQuestions = createAction('LIST_QUESTIONS');
export const createQuestion = createAction('CREATE_QUESTION');
export const updateQuestionOfUser = createAction('UPDATE_QUESTION_OF_USER');
export const answerVoteQuestion = createAction('ANSWER_VOTE_QUESTION');
export const answerVoteOfUser = createAction('ANSWER_VOTE_OF_USER');
export const startLoading = createAction('START_LOADING');
export const stopLoading = createAction('STOP_LOADING');
