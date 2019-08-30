import React, { Fragment } from 'react';

import './FlashMessage.css';

const FlashMessage = (props) => {
  console.log('flash message props: ', props);
  console.log('props.flash.message: ', props.flash.message);

  const flashStyle = {
    backgroundColor: `${props.flash.bgColor}`,
    opacity: '0.5'
  }

  const displayFlash = () => {
    if (props.flash.display) {
      return(
        <div className="flash-message" style={flashStyle}>
          {props.flash.message}
          <span 
            className="flash-message-remove"
            onClick={props.onFlashRemove}
          >
            x
          </span>
        </div>
      )
    }
    return;
  }
 
  return(
    <Fragment>
      {displayFlash()}
    </Fragment>
  )
}

export default FlashMessage;