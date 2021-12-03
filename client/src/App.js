import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import MainMenu from "./components/MainMenu/MainMenu";
import { GlobalContext } from "./utils/Context";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { managerRoute, userRoute } from "./utils/ConditionalRoutes";
import Logout from "./pages/Auth/Logout";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Hotel from "./pages/HotelPage/Hotel";
import Payment from "./pages/Payment/Payment";
import { ToastContainer } from "react-toastify";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home");

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider
        value={{ menuOpen, setMenuOpen, user, setPage, setUser }}
      >
        <div className="App">
          <ToastContainer />
          <Router>
            <Header page={page} />
            <MainMenu />
            <Routes>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/logout" element={<Logout />}></Route>

              <Route
                exact
                path="/dashboard"
                element={
                  managerRoute ? <Dashboard /> : <Navigate to="/login" />
                }
              ></Route>

              <Route
                exact
                path="/"
                element={
                  managerRoute || userRoute ? (
                    <Home />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>

              <Route path="/explore">
                <Route
                  path=":location/:checkIn/:checkOut/:people"
                  element={
                    managerRoute || userRoute ? (
                      <Explore />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path=""
                  element={
                    managerRoute || userRoute ? (
                      <Explore />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Route>

              <Route
                exact
                path="/hotel/:id"
                element={
                  managerRoute || userRoute ? (
                    <Hotel />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>

              <Route
                exact
                path="/payment/:hotelId/:roomId"
                element={
                  managerRoute || userRoute ? (
                    <Payment />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>

            </Routes>
          </Router>
        </div>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
}

export default App;
