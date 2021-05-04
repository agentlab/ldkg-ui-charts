import React from 'react';
import './App.css';
import { rootModelState } from './store/data';
import DataRenderer from './DataRenderer';

const App: React.FC = () => (
  <>
    <DataRenderer
      viewKinds={rootModelState.colls['rm:ViewKinds_Coll'].dataIntrnl}
      viewDescriptions={rootModelState.colls['rm:Views_Coll'].dataIntrnl}
      data={rootModelState.colls}
    />
  </>
);

export default App;
