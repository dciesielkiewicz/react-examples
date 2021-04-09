import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Layout } from './components';
import { HOME_ROUTE, TODO_ROUTE } from './routes';
import { Home } from './Home';
import { Todo } from './Todo';

export const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={HOME_ROUTE} component={Home} />
          <Route exact path={TODO_ROUTE} component={Todo} />
        </Switch>
      </Layout>
    </Router>
  );
};
