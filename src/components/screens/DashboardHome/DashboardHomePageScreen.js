import React, {useEffect} from 'react';
import Aside from '../../layouts/Aside'
import './dashboardhome.scss';
export default function DashboardHomePageScreen(history){


    useEffect(() => {
        document.title = "Home Dasboard"
    }, []);






    return(

        <>

            <div className="d-flex">
                <Aside/>
                <section className="p-5 section_home bg_white">
                    <h1>Bienvenu   </h1>

                    <p>Bienvenu   dans votre espace personnelle.</p>
                    <p>D'ici vous pourrez naviguez sur l'ensemble des Services proposer par FoodGesty. </p>
                    <p>En cliquant sur Unités, vous avez accès à l'ensemble des unités.</p>
                </section>
            </div>


        </>


    )
}