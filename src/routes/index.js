import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GlobalLayout } from '~/layouts';
import NotFound from '~/pages/NotFound';
import routes from './routes';
import Auth from './Auth';

export default function Routes() {
  const renderRoutes = () => {
    return routes.map(({ layout, component, isPrivate, ...props }) => {
      return (
        <Route
          {...props}
          key={props.path}
          render={(route) => (
            <Auth
              route={route}
              layout={layout}
              isPrivate={isPrivate}
              component={component}
            />
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
  )
}
