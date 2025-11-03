// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import App from './App';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import 'react-toastify/dist/ReactToastify.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);