import React, {useState} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import './App.scss';

import {
    Navigation,
    HomePageScreen,
    AboutPageScreen,
    NoticePageScreen,
    LoginPageScreen,
    CreateNewRegisterPageScreen,
    DashboardHomePageScreen,
    DashboardUnitiesScreen,
    UnityPageScreen,
    UserPageScreen,
    RegimePageScreen,
    GestionFoodPageScreen,
    PreferencePageScreen
} from './components'


import AuthAPI from "./components/services/AuthAPI";


AuthAPI.setup();


function App() {

    const[isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    console.log(isAuthenticated);


    const NavigationWithRouter = withRouter (Navigation)



  return (
    <div className="App">
        <NavigationWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
        <Switch>
            <Route exact path="/" component={HomePageScreen}/>

            <Route exact path="/about" component={AboutPageScreen}/>
            <Route exact path="/notice" component={NoticePageScreen}/>

            <Route exact path="/login"
                   render={props=>
                       <LoginPageScreen
                           onLogin={setIsAuthenticated} {...props}
                       />}
            />




            {/*TODO SECURISATION DES ROUTES*/}


            <Route exact path="/createNewRegisterPageScreen"
                   render={ props=> isAuthenticated ?  < CreateNewRegisterPageScreen{...props}/> : <Redirect to="/login"/>  }
            />


            <Route exact path="/dashboardHomePageScreen"
                   render={ props=> isAuthenticated ?  < DashboardHomePageScreen{...props}/> : <Redirect to="/login"/>  }
            />


            <Route exact path="/dashboardHomePageScreen"
                   render={ props=> isAuthenticated ?  < DashboardHomePageScreen{...props}/> : <Redirect to="/login"/>  }
            />

            <Route exact path="/dashboardUnitiesScreen"
                   render={ props=> isAuthenticated ?  < DashboardUnitiesScreen{...props}/> : <Redirect to="/login"/>  }
            />

            <Route exact path="/unityPageScreen"
                   render={ props=> isAuthenticated ?  < UnityPageScreen{...props}/> : <Redirect to="/login"/>  }
            />

            <Route exact path="/userPageScreen"
                   render={ props=> isAuthenticated ?  < UserPageScreen{...props}/> : <Redirect to="/login"/>  }
            />

            <Route exact path="/regimePageScreen"
                   render={ props=> isAuthenticated ?  < RegimePageScreen{...props}/> : <Redirect to="/login"/>  }
            />
            <Route exact path="/gestionFoodPageScreen"
                   render={ props=> isAuthenticated ?  < GestionFoodPageScreen{...props}/> : <Redirect to="/login"/>  }
            />
            <Route exact path="/preferencePageScreen"
                   render={ props=> isAuthenticated ?  < PreferencePageScreen{...props}/> : <Redirect to="/login"/>  }
            />








        </Switch>


    </div>
  );
}

export default App;
