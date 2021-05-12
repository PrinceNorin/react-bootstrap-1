import React from 'react';

import Routes from '~/routes';
import { GlobalContext, useGlobal } from '~/hooks/global';

function App() {
  const global = useGlobal();

  return (
    <GlobalContext.Provider value={global}>
      <Routes />
    </GlobalContext.Provider>
  );
}

export default App;
