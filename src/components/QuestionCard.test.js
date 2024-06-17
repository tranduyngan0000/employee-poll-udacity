import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../common/test-cmn';
import QuestionCard from './QuestionCard';

describe('QuestionCard', () => {
  it('Will match snapshot', () => {
    const question = {
      author: 'user',
      timestamp: '1493579767190',
      id: 'id'
    };
    renderWithProviders(<QuestionCard question={question} />);

    expect(screen).toMatchSnapshot();
  });
});
