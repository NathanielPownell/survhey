import React from 'react'
import  './css/Modal.css'
import Card from './UI/Card'

const Modal = (props) => {
  return (
    <div className='modal'>
      <Card type="modal-card">
        {props.children}
      </Card>
    </div>
  )
}

export default Modal