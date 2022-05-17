import React from 'react'
import "./css/Card.css"

const Card = (props) => {
    return (
        <div style={{backgroundImage: props.background}} onClick={props.onClick} className={`card ${props.type ? props.type : ""} `}>
          {props.children}  
          
        </div>
    )
}

export default Card
