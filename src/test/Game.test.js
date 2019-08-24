import React from 'react';
import ReactDOM from 'react-dom';
import Game from '../components/Game';
import { getSudukuProblem } from '../utils';

it('renders without crashing', () => {
  const arr = getSudukuProblem(5)
  const div = document.createElement('div');
  ReactDOM.render(<Game initialArr={arr}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
