import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GlobalLayout } from '~/layouts';
import NotFound from '~/pages/NotFound';
import routes from '~/routes';

function App() {
  const renderRoutes = () => {
    return routes.map(({ layout, component, ...props }) => {
      const Layout = layout ? layout : GlobalLayout;

      return (
        <Route
          {...props}
          key={props.path}
          render={(route) => (
            <Layout Component={component} route={route} />
          )}
        />
      )
    })
  }

  return (
    <BrowserRouter>
      <Switch>
        {renderRoutes()}
        <Route render={(route) => (
          <GlobalLayout Component={NotFound} route={route} />
        )} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
