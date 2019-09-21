import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import GridViewConnected from './components/GridView/GridViewConnected';
import ToolboxConnected from './components/Toolbox/ToolboxConnected';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <header>CSS Grid editor</header>
      <main>
        <GridViewConnected />
      </main>
      <menu>
        <ToolboxConnected />
      </menu>
      <footer>Copyright (c) 2019 by GrelaDesign</footer>
    </Provider>
  );
};

export default App;
