import {
  BrowserRouter as Router,
  Routes,
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
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={TODO_ROUTE} element={<Todo />} />
        </Routes>
      </Layout>
    </Router>
  );
};
