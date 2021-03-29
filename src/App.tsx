import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Layout } from './components';
import { TODO_ROUTE, WELCOME_ROUTE } from './routes';
import { Todo } from './Todo';
import { Welcome } from './Welcome';

export const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={WELCOME_ROUTE} component={Welcome} />
          <Route exact path={TODO_ROUTE} component={Todo} />
        </Switch>
      </Layout>
    </Router>
  );
};
