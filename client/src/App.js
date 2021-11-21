import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/Header';
import MainMenu from './components/MainMenu/MainMenu';
import { GlobalContext } from './utils/Context';
import { PageContainer } from './components/GlobalStyles/GlobalStyles';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

function App() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('Home')


  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider value={{ menuOpen, setMenuOpen, user, setPage, setUser }}>

        <div className="App">
          <Router>
            <Header page={page} />
            <MainMenu />
            <PageContainer>
              <Routes>
                <Route exact path="/dashboard" element={<Dashboard />}></Route>
              </Routes>
            </PageContainer>
          </Router>
        </div>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
}

export default App;
