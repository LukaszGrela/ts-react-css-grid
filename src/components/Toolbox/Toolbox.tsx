import React from 'react';

import './styles/index.scss';

const Toolbox: React.FC = (): JSX.Element => {
  return (
    <div className="Toolbox">
      <button className="Toolbox_button">Add Column</button>
      <button className="Toolbox_button">Delete Column</button>
      <button className="Toolbox_button">Add Row</button>
      <button className="Toolbox_button">Delete Row</button>
    </div>
  );
};

export default Toolbox;
