import React, { useEffect, useState } from 'react'
import './css/Hamburger.css'

const Hamburger = (props) => {
    
    return (
        <div onClick={props.handleClick} className={`hamburger ${props.open ? "active" : ""}`} id="hamburg" >
            <div class="line one"></div>
            <div class="line two"></div>
            <div class="line three"></div>
        </div >
    )
}

export default Hamburger