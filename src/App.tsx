import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import GridViewConnected from './components/GridView/GridViewConnected';
import ToolboxConnected from './components/Toolbox/ToolboxConnected';
import store from './store';
import GridViewShadowConnected from './components/GridView/GridViewShadowConnected';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <header>CSS Grid editor</header>
      <main>
        <GridViewShadowConnected />
      </main>
      <main>
        <GridViewConnected />
      </main>
      <menu>
        <ToolboxConnected />
      </menu>
      <footer>Copyright (c) 2019 by GrelaDesign</footer>
      <span
        id="marker"
        style={{
          position: 'absolute',
          width: '5px',
          height: '5px',
          left: '0px',
          top: '0px',
          backgroundColor: 'red',
          pointerEvents: 'none',
        }}></span>
    </Provider>
  );
};

export default App;
