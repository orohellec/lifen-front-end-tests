import React, { useState } from 'react';
import axios from 'axios';

import './DropCard.css';
import Dropzone from '../Dropzone/Dropzone';
import FlashMessage from '../FlashMessage/FlashMessage';

const DropCard = (props) => {
  // to show some interaction with the dropzone component
  const [highlight, setHighlight] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  // to display informations to the user
  const [flashParams, setFlashParams] = useState({
    display: false,
    message: '',
    bgColor: ''
  });

  // add files in the classic way (click) - functions
  const onFilesAdded = e => {
    if (props.disabled) return;
    const files = e.target.files;
    const array = fileListToArray(files);
    setFileList(array);
  }

  // add files with drag and leave - functions
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

  // display - functions
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

  const displayButton = () => {
    if (!fileList.length) {
      return;
    }
    return (
      <button className="card-submit" type="button" onClick={onSubmitFiles}>
        Envoyer le(s) Fichier(s)
      </button>
    )
  }

  const displayLoading = () => {
    if (fileLoading) {
      return(
        <div>Loading...</div>
      )
    }
  }

  // onSubmit function
  const onSubmitFiles = async (e) => {
    if (fileList.length) {
      setFileLoading(true);
      try {
        const res = await axios.post('https://fhirtest.uhn.ca/baseDstu3/Binary', {body: fileList[0]})
        if (res.status === 201) {
          setFlashParams({
            display: true,
            message: 'Votre fichier à bien été envoyé',
            bgColor: 'green'
          })
          setFileList([]);
        }
      } catch (error) {
        setFlashParams({
          display: true,
          message: "Erreur, votre fichier n'a pas été envoyé",
          bgColor: 'red'
        })
      }
      setFileLoading(false);
    }
    return;
  }

  // to delete the flash message
  const onFlashRemove = (e) => {
    setFlashParams({
      display: false,
      message: '',
      bgColor: ''
    });
  }

  return(
    <div className="card">
      <FlashMessage flash={flashParams} onFlashRemove={onFlashRemove}/>
      <span>Cliquer ou glisser déposer pour ajouter des fichiers PDF</span>
      <span>taille max (2MB)</span>
      <Dropzone 
        highlight={highlight}
        onFilesAdded={onFilesAdded}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
      <div className="card-loading">
        {displayLoading()}
      </div>
      <div className="card-display">
        {displayFiles()}
      </div>
      {displayButton()}
    </div>
  )
}

export default DropCard; 
