import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';

test('renders learn react link', () => {
    let store;
  render( <Provider store={store}>
    <App />
</Provider>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
