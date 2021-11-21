import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <Header page={page} />
            <MainMenu />
            <div className="page-container">
              <Switch>
                {/* <Route path="/login" exact component={Auth} /> */}
                {/* <Route path="/logout" exact render={(props) => {
                  localStorage.removeItem('User')
                  window.location.href = "/login"
                  return null
                }} /> */}
                <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
              </Switch>
            </div>
          </Router>
        </div>
    </ApolloProvider>
  );
}

export default App;
