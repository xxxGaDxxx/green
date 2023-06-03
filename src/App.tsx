import React from 'react';
import { observer } from 'mobx-react-lite';
import AppStore, { STATUS } from './stor/AppStore';
import { ChatPages } from './components/Chat/ChatPages';
import { AuthorizationPages } from './components/Authorization/AuthorizationPages';
import './App.css';

function App() {
  const { status } = AppStore;

  return (
    <div className="App">
      {status === STATUS.Success ? <ChatPages /> : <AuthorizationPages />}
    </div>
  );
}

export default observer(App);
