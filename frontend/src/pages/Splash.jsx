import React, { useEffect, useState } from 'react'
import Button from '../components/UI/Button'
import './css/Splash.css'
import survheyArt from '../assets/survheygraphic3d.png'
import boxesImg from '../assets/boxes.png'
import { Link } from 'react-router-dom'



const Heading = () => {
    return (
        <h1 className='heading-gradient'>Create Surveys Online</h1>
    )
}

const Brief = () => {
    return (
        <p className='brief'>
            <b>Surv<span style={{ color: "rgba(142,0,224,1)" }}>hey! </span></b>
            is a <b>free</b> and <b>simple,</b> and <b>fun </b>
            app for creating and sharing surveys and questionnaires.
        </p>
    )
}

const Action = () => {
    return (
        <Link to="/dashboard">
            <Button variety="regular">Let's Begin</Button>
        </Link>
    )
}

const Splash = () => {
    const items = [<Heading />, <Brief />, <Action />]
    const [fade, setFade] = useState(true)

    useEffect(() => {
            setTimeout(() => {
                setFade(false)
            }, 300)
    }, [items])

    return (
        <>
        
        <div className='splash'>
            <div className='splashContainer'>

                <div className='left-splash'>

                    {items.map((item, id) => (
                        <div key={id} className={`transContainer ${fade ? 'load' : 'loaded'}`}>
                            {item}
                        </div>
                    ),
                    
                    )}
                </div>

                <div>
                    <img className={`clipart ${fade ? 'load' : 'loaded'}`} src={survheyArt} />
                </div>
            </div>
        </div>

        <div className='splash lower'>
            <h2 className=''>👨‍💻 Created by Nathaniel Pownell</h2>
            <div className='question'>
            <p><a target='_blank' href="https://www.nathanielpownell.com"><Button variety="small regular"><b>Visit My Site</b></Button></a></p>
            </div>
            <img className='boxesImg' src={boxesImg} />
        </div>
        </>
    )
}


export default Splash