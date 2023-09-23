import React from 'react';
import ReactDOM from 'react-dom/client';

const App = ()=> {
  return (
    <h1>My Movies</h1>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

console.log('hello world')