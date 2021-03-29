import React, {useEffect} from 'react';
import './homePage.scss';
export default function HomePageScreen({history}){
    console.log(history)

    useEffect(() => {
        document.title = "Home Page"
    }, []);

    const handleSubmit =(element)=> {
        history.push("/"+element);
    }


    return(
            <>
                <section className="block_bg-hand">

                    <div className='d-flex'>
                        <div className='block-empty'/>
                        <div className='block-welcome'>
                            <h1>Bienvenue sur GestyFood</h1>
                            <p>
                            <strong>GestyFood® </strong> est une Plateforme web de gestion de repas dédié aux foyers
                            médicaux-sociaux qui hébergent et accompagnent des personnes en situation d’handicap ou de vieillesse.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="block_why ">
                    <article className=" block-article bg_myDark">

                        <div className=" d-flex justify-content-center w-100 p-2">
                            <img  className="img" src={process.env.PUBLIC_URL + '/img/pexel.jpg'} alt=""/>
                        </div>


                        <div  className="p-2 ">
                            <div >
                                <h2>Pourquoi utiliser GestyFood ?</h2>
                            </div>

                            <div >
                                <p>GestyFood complète les outils de gestion administrative existant.</p>

                                <p>Par sa nature, l’ensemble des foyers ont la possibilité d’accéder
                                    à une plateforme de soutien dans la gestion de leur quotidien sur les repas.</p>

                                <p>GestyFood® fournit une plateforme collaborative simplifié favorisant le partage
                                     d'informations auprès des équipes pluridisciplinaires travaillant au sein
                                    de l’établissement cette question.</p>
                            </div>
                        </div>

                    </article>
                    <div className="d-flex justify-content-center bg_myDark">
                        <div className='ligne'/>
                    </div>



                    <article className=" block-article bg_myDark">

                        <div  className="py-2 ">
                            <div >
                                <h2>Comment utiliser GestyFood ?</h2>
                            </div>

                            <div >
                                <p>La plateforme web sera consultable sur différents support,*/}
                                                    tel qu’ordinateur, tablette, mobile.</p>

                                                <p> La consultation de ce service sera sécurisée
                                                    et ne s’effectuera par le consentement de la Direction.
                                                    Celle-ci aura un accès à son service par un procède CRUD .</p>

                                                <p> Lors de la création de l’instance, ils auront en charge l’attribution
                                                    d’un accès sécurisé à leurs salariés.</p>

                                                <p> Cette autorisation pourra donnée un accès à la lecture,
                                                    à la modification ou à la suppression de certaine donnée.
                                                    Cliquez sur Notice pour de plus ample information.</p>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button onClick={() => handleSubmit('notice')} className="btn btn-gold">Notice</button>
                            </div>

                        </div>

                        <div className=" d-flex justify-content-center w-100 p-2">
                            <img  className="img" src={process.env.PUBLIC_URL + '/img/work.jpg'} alt=""/>
                        </div>


                    </article>






                </section>

                <section className=" block_when">
                    <div className=" block_bg_hand">
                        <div>
                            <div className=" block_question ">
                                <h2>Vous n'êtes pas inscrit ?</h2>
                            </div>
                            <div className=" block_button ">
                                <button onClick={() => handleSubmit('createNewRegisterPage')}
                                        className="btn btn-gold ">Inscrivez-vous</button>
                            </div>
                        </div>
                    </div>

                </section>





            </>







    )
}