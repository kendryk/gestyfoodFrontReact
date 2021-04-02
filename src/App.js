import React, { useState} from 'react';
import {HashRouter,Switch, Route, withRouter} from 'react-router-dom';
import './App.scss';
import {
    Navigation,
    Footer,
    HomePageScreen,
    AboutPageScreen,
    NoticePageScreen,
    LoginPageScreen,
    CreateNewRegisterPageScreen,
    CreateNewHearthPageScreen,
    DashboardHomePageScreen,
    DashboardUnitiesScreen,
    UnityPageScreen,
    UserPageScreen,
    RegimePageScreen,
    GestionFoodPageScreen,
    PreferencePageScreen
} from './pages'
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/layouts/PrivateRoute";


AuthAPI.setup();


function App() {
    const[isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    const NavigationWithRouter = withRouter (Navigation);



  return (
      <HashRouter>
      <AuthContext.Provider value={
          {
              isAuthenticated,
              setIsAuthenticated
          }
      }>
        <div className="App">

            <NavigationWithRouter/>
            <main>
            <Switch>

                {/*Route d'accueil*/}
                <Route exact path="/" component={HomePageScreen} />

                <Route exact path="/about" component={AboutPageScreen}/>

                <Route exact path="/notice" component={NoticePageScreen}/>


                {/*Route de login*/}

                <Route exact path="/login" component={LoginPageScreen}/>

                <Route exact path="/createNewHearthPage" component={CreateNewHearthPageScreen}/>

                <Route exact path="/createNewRegisterPage/:id" component={ CreateNewRegisterPageScreen}/>}/>


                {/*TODO SECURISATION DES ROUTES*/}



                <PrivateRoute
                    path="/dashboardHomePage"
                    isAuthenticated={isAuthenticated}
                    component={DashboardHomePageScreen }
                />

                <PrivateRoute
                    path="/dashboardUnities"
                    isAuthenticated={isAuthenticated}
                    component={DashboardUnitiesScreen}
                />

                <PrivateRoute
                    path="/unity/:id"
                    isAuthenticated={isAuthenticated}
                    component={UnityPageScreen}
                />

                <PrivateRoute
                    path="/userPage"
                    isAuthenticated={isAuthenticated}
                    component={UserPageScreen}
                />

                <PrivateRoute
                    path="/regimePage"
                    isAuthenticated={isAuthenticated}
                    component={RegimePageScreen}
                />

                <PrivateRoute
                    path="/gestionFoodPage"
                    isAuthenticated={isAuthenticated}
                    component={GestionFoodPageScreen}
                />

                <PrivateRoute
                    path="/preferencePage"
                    isAuthenticated={isAuthenticated}
                    component={PreferencePageScreen}
                />



            </Switch>




            </main>
           <Footer/>
        </div>
      </AuthContext.Provider>
      </HashRouter>
  );
}

export default App;
