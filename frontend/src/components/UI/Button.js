import React from 'react'
import './Button.css'

const Button = (props) => {
    return (
        <button disabled={props.disabled} onClick={props.onClick} type={props.type} className={`button ${props.variety}`}>
            {props.children}
        </button>
    )
}

export default Button
