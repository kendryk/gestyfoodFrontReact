import React, {useEffect} from 'react';
import error from '../img/404.gif'
export default function NoMatchScreen(){

    useEffect(() => {
        document.title = "404"
    }, []);

    return(
        <>
            <section class="my-5 text-center ">
                <h1 class="fw-bold">Aie !  Dommage ! Cette page est introuvable.</h1>
            </section>

            <section className="d-flex justify-content-center m-5">
                <div>
                    <img src={error} alt="error404"/>
                </div>

            </section>
        </>
    )
}