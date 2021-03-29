import React, {useState} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
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
} from './components'

import AuthAPI from "./services/AuthAPI";

AuthAPI.setup();

function App() {

    const[isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    console.log(isAuthenticated);

    const NavigationWithRouter = withRouter (Navigation)


  return (
    <div className="App">

        <NavigationWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
        <main>
        <Switch>


            <Route exact path="/" render={props=> <HomePageScreen{...props}/>}/>

            <Route exact path="/about" render={props=> <AboutPageScreen{...props}/>}/>

            <Route exact path="/notice" render={props=> <NoticePageScreen{...props}/>}/>

            <Route exact path="/login" render={props=> <LoginPageScreen onLogin={setIsAuthenticated} {...props}/>}/>

            <Route exact path="/createNewRegisterPage" render={props=> <CreateNewRegisterPageScreen onLogin={setIsAuthenticated} {...props}/>}/>

            <Route exact path="/createNewHearthPage" render={props=> <CreateNewHearthPageScreen onLogin={setIsAuthenticated} {...props}/>}/>

            <Route exact path="/dashboardHomePage" render={props=> <DashboardHomePageScreen onLogin={setIsAuthenticated} {...props}/>}/>

            <Route exact path="/dashboardUnities" render={props=> <DashboardUnitiesScreen onLogin={setIsAuthenticated}  {...props}/>}/>

            <Route exact
                   path="/unity/:id"
                   render={props=> <UnityPageScreen
                       onLogin={setIsAuthenticated} {...props}/>}/>


            {/*TODO SECURISATION DES ROUTES*/}



            <Route exact path="/userPage"
                   render={ props=> isAuthenticated ?  < UserPageScreen{...props}/> : <Redirect to="/login"/>  }
            />

            <Route exact path="/regimePage"
                   render={ props=> isAuthenticated ?  < RegimePageScreen{...props}/> : <Redirect to="/login"/>  }
            />
            <Route exact path="/gestionFoodPage"
                   render={ props=> isAuthenticated ?  < GestionFoodPageScreen{...props}/> : <Redirect to="/login"/>  }
            />
            <Route exact path="/preferencePage"
                   render={ props=> isAuthenticated ?  < PreferencePageScreen{...props}/> : <Redirect to="/login"/>  }
            />

        </Switch>




        </main>
       <Footer/>
    </div>
  );
}

export default App;
