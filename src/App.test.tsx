// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import '@testing-library/jest-dom/extend-expect';

test('example test', () => {
  const element = document.createElement('div');
  element.className = 'my-class';

  expect(element).toHaveClass('my-class');
});


