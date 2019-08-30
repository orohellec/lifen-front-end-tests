import React from 'react';


import './Dropzone.css';
import fileIcon from '../../pictures/icons/file.png';

const Dropzone = (props) => {
  // we need it because we don't want to display the file input
  const fileInputRef = React.createRef();

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  }

  return (
    <div className="dropzone-container">
      <div 
        className={`dropzone ${props.highlight ? "highlight" : ""}`}
        onClick={openFileDialog}
        onDragOver={props.onDragOver}
        onDragLeave={props.onDragLeave}
        onDrop={props.onDrop}
        style={{ cursor: props.disabled ? "default" : "pointer" }}
      >
        <img
          alt="file icon"
          className="Icon"
          src={fileIcon}
        />
        <input
          ref={fileInputRef}
          className="dropzone-input"
          type="file"
          multiple
          onChange={props.onFilesAdded}
        />
      </div>
    </div>
  );
}

export default Dropzone;