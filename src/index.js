import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import App from './App';
import './index.css';
import authReducer from './redux/authReducer';

// Configuração do persistor
const persistConfig = {
  key: 'root', // a chave do localStorage
  storage, // o armazenamento a ser usado
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
