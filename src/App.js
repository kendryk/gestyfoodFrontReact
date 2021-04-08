import React, { useState} from 'react';
import {BrowserRouter,Switch, Route, withRouter} from 'react-router-dom';
import './App.scss';
import {
    Navigation,
    Footer,

    HomePage,
    AboutPage,
    NoticePage,

    LoginPage,
    CreateNewRegisterPage,
    CreateNewHearthPage,

    DashboardHomePage,
    DashboardUnities,
    NewUpDelUnity,
    UnityPage,

    ResidentPage,

    UserPage,
    UserNewUp,

    RegimePage,
    RegimeNewPage,
    TextureNewPage,

    GestionFoodPage,
    PreferencePage,

    NoMatchScreen
} from './pages'
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/layouts/PrivateRoute";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

AuthAPI.setup();


function App() {
    const[isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    const NavigationWithRouter = withRouter (Navigation);



  return (

      <AuthContext.Provider value={
          {
              isAuthenticated,
              setIsAuthenticated
          }
      }>
      <BrowserRouter>
        <div className="App">

            <NavigationWithRouter/>
            <main>
            <Switch>

                {/****************Route d'accueil****************/}
                <Route exact path="/" component={HomePage} />

                <Route exact path="/about" component={AboutPage}/>

                <Route exact path="/notice" component={NoticePage}/>


                {/****************Route de login********************/}

                <Route exact path="/login" component={LoginPage}/>

                <Route exact path="/createNewHearth" component={CreateNewHearthPage}/>

                <Route exact path="/createNewRegister/:id" component={ CreateNewRegisterPage}/>}/>


                {/*TODO SECURISATION DES ROUTES*/}

                {/*******************RESIDENT***********************/}

                <PrivateRoute
                    path="/dashboardHome"
                    isAuthenticated={isAuthenticated}
                    component={DashboardHomePage }
                />


                {/*******************RESIDENT***********************/}
                <PrivateRoute
                    path="/dashboardUnities/unity/:id/:id/:id"
                    isAuthenticated={isAuthenticated}
                    component={ResidentPage}
                />


                {/******************UNITIES**************************/}
                <PrivateRoute
                    path="/dashboardUnities/unity/:id"
                    isAuthenticated={isAuthenticated}
                    component={UnityPage}
                />

                <PrivateRoute
                    path="/dashboardUnities/:id"
                    isAuthenticated={isAuthenticated}
                    component={NewUpDelUnity}
                />

                <PrivateRoute
                    path="/dashboardUnities"
                    isAuthenticated={isAuthenticated}
                    component={DashboardUnities}
                />
                {/*******************USER***********************/}


                <PrivateRoute
                    path="/user/:id"
                    isAuthenticated={isAuthenticated}
                    component={UserNewUp}
                />


                <PrivateRoute
                    path="/user"
                    isAuthenticated={isAuthenticated}
                    component={UserPage}
                />



                {/*******************REGIME***********************/}

                <PrivateRoute
                    path="/texture/:id"
                    isAuthenticated={isAuthenticated}
                    component={TextureNewPage}
                />


                <PrivateRoute
                    path="/regime/:id"
                    isAuthenticated={isAuthenticated}
                    component={RegimeNewPage}
                />


                <PrivateRoute
                    path="/regime"
                    isAuthenticated={isAuthenticated}
                    component={RegimePage}
                />


                {/*******************GESTIONFOOD***********************/}
                <PrivateRoute
                    path="/gestionFood"
                    isAuthenticated={isAuthenticated}
                    component={GestionFoodPage}
                />





                {/*******************PREFERENCE***********************/}
                <PrivateRoute
                    path="/preference"
                    isAuthenticated={isAuthenticated}
                    component={PreferencePage}
                />

                <Route component={NoMatchScreen}/>

            </Switch>




            </main>
           <Footer/>
        </div>

      </BrowserRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
      </AuthContext.Provider>


  );
}

export default App;
