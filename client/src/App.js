import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import Header from "./components/Header/Header";
import MainMenu from "./components/MainMenu/MainMenu";
import { GlobalContext } from "./utils/Context";

import { managerRoute, userRoute } from "./utils/ConditionalRoutes";
import { ToastContainer } from "react-toastify";
import { GET_USER } from "./graphql/queries/userQueries";
import { GENERATE_TOKEN } from "./graphql/mutations/userMutations";

import Logout from "./pages/Auth/Logout";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Hotel from "./pages/HotelPage/Hotel";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PageLoader from "./components/Loaders/PageLoader";

const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Bookings = React.lazy(() => import("./pages/Bookings/Bookings"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Payment = React.lazy(() => import("./pages/Payment/Payment"))


function App() {

  const [generateToken] = useMutation(GENERATE_TOKEN)

  const cahedUser = JSON.parse(localStorage.getItem('user'))
  const { error } = useQuery(GET_USER, { variables: { id: cahedUser?.id } })

  useEffect(() => {
    if (error && error.message === 'Unauthenticated user!') {
      generateToken({ variables: { refreshToken: cahedUser.refreshToken } })
        .then(res => {
          let user = res.data.generateToken
          localStorage.setItem('user', JSON.stringify(user))
        })
    }
  }, [error])

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(cahedUser);
  const [page, setPage] = useState("Home");

  return (
    <GlobalContext.Provider
      value={{ menuOpen, setMenuOpen, user, setPage, setUser }}
    >
      <div className="App">
        <ToastContainer />
        <Router>
          <Header page={page} />
          <MainMenu />
          <Suspense fallback={
            <PageLoader />
          }>
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
                path="/payment/:hotelId/:roomId/:step"
                element={
                  managerRoute || userRoute ? (
                    <Payment />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>

              <Route
                exact
                path="/bookings"
                element={
                  managerRoute || userRoute ? (
                    <Bookings />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>

              <Route
                exact
                path="/profile"
                element={
                  managerRoute || userRoute ? (
                    <Profile />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>

            </Routes>
          </Suspense>
        </Router>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
