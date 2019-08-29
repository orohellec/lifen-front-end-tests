import React, { useState } from 'react';

import './Dropzone.css';
import fileIcon from '../../pictures/icons/file.png';

const Dropzone = (props) => {
  const [highlight, setHighlight] = useState(false);
  const [fileList, setFileList] = useState([]);

  // we need it because we don't want to display the file input
  const fileInputRef = React.createRef();

  // add files in the classic way (click) - functions
  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  }

  const onFilesAdded = e => {
    if (props.disabled) return;
    const files = e.target.files;
    const array = fileListToArray(files);
    setFileList(array);
  }

  // add files with drop and drag - functions
  const onDrop = e => {
    e.preventDefault();
    if (props.disabled) return;
    const files = e.dataTransfer.files;
    const array = fileListToArray(files);
    setFileList(array);
    setHighlight(false);
  }

  const onDragOver = e => {
    e.preventDefault();
    if (props.disabled) return;
    setHighlight(true);
  }

  const onDragLeave = () => {
    setHighlight(false);
  }

  // shared functions
  const fileListToArray = list => {  // typeof list: object
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    if (fileList.length) { // check if the user has already added some files
      return fileList.concat(array);
    }
    return array;
  }

  const removeFileFromList = i => {
    const copyFileList = [...fileList];
    copyFileList.splice(i, 1);
    setFileList(copyFileList); 
  }

  // display function
  const displayFiles = () => {
    if (fileList.length) {
      const files = fileList.map((file, i) => {
      return(
        <li className="dropzone-list-element" key={i} onClick={(e) => removeFileFromList(i)}>
          {file.name}
        </li>
      )
    })
      return (
      <ul>{files}</ul>
      )
    }
  }

  return (
    <div className="dropzone-container">
      <div 
        className={`dropzone ${highlight ? "highlight" : ""}`}
        onClick={openFileDialog}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
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
          onChange={onFilesAdded}
        />
      </div>
      <div className="dropzone-list">
        {displayFiles()}
      </div>
    </div>
  );
}

export default Dropzone;