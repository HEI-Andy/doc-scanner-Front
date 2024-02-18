import React, { useState } from "react";
import { Button } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ImageIcon from '@mui/icons-material/Image';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import jsPDF from "jspdf";
import Typography from '@mui/material/Typography';
import axios from 'axios';

function HomePage() {
  
  const [dataUri, setDataUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [scanMode, setScanMode] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function handleScanDocument() {
    setShowCamera(true);
    setScanMode("document");
  }

  function handleScanIdCard() {
    setShowCamera(true);
    setScanMode("idcard");
  }

  function handleImportFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.accept = '.txt,.docx,.rtf';
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    });
    input.click();
  }

  function handleConvertToPdf1() {
    if (!selectedFile || !selectedFile.name.endsWith('.txt')) {
      setErrorMessage('Please select a .txt file before converting to PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const textData = event.target.result;
      const pdf = new jsPDF();
      pdf.text(textData,  10,  10);
      pdf.save(`${selectedFile.name}.pdf`);
      setErrorMessage('');
    };
    reader.readAsText(selectedFile);
  }

  function handleImportImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.accept = '.img,.jpg,.jpeg';
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
    });
    input.click();
  }

  function handleConvertToPdf2() {
    if (!selectedImage) {
      setErrorMessage('Please select an image before converting to PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      const pdf = new jsPDF();
      pdf.addImage(imageData, 'JPEG',  10,  10);
      pdf.save(`${selectedImage.name}.pdf`);
      setErrorMessage('');
    };
    reader.readAsDataURL(selectedImage);
  }

  function handleTakePhoto(dataUri) {
    setDataUri(dataUri);
    setShowCamera(false);

    const pdf = new jsPDF();
    pdf.addImage(dataUri, "JPEG", 10, 10);
    pdf.save(`${scanMode}.pdf`);

    const scanData = {
      scanType: scanMode,
      image: dataUri 
    };
    axios.post('http://8080/scans', scanData)
    .then(response => {
      alert('Scan enregistré avec succès!');
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement du scan :', error);
      alert('Une erreur est survenue lors de l\'enregistrement du scan. Veuillez réessayer.');
    })
    .finally(() => {
      setShowCamera(false);
    });
  }

  return (
    <div style={{
      alignContent: "center"
    }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CameraAltIcon />}
        onClick={handleScanDocument}
        style={{
          position: "absolute",
          left: "100px",
          top: "200px",
          width: "200px",
          height: "100px",
          borderRadius: "20px",
          fontSize: "20px"
        }}
      >
        <Typography variant="h6" component="div">
          Scanner un document
        </Typography>
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<PermIdentityIcon />} 
        onClick={handleScanIdCard} 
        style={{
          position: "absolute", 
          left: "400px", 
          top: "200px", 
          width: "200px", 
          height: "100px",
          borderRadius: "20px",
          fontSize: "20px",
        }}
      >
        <Typography variant="h6" component="div">
          Carte d’identité
        </Typography>
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FileCopyIcon />}
        onClick={handleImportFile}
        style={{
          position: "absolute",
          left: "100px",
          top: "400px",
          width: "200px",
          height: "100px",
          borderRadius: "20px",
          fontSize: "20px",
        }}
      >
        <Typography variant="h6" component="div">
          Import de fichier
        </Typography>
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleConvertToPdf1}
        style={{
          position: "absolute",
          left: "100px",
          top: "520px",
          width: "200px",
          height: "100px",
          borderRadius: "20px",
          fontSize: "20px",
        }}
      >
        <Typography variant="h6" component="div">
          Convertir en PDF
        </Typography>
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<ImageIcon />}
        onClick={handleImportImage}
        style={{
          position: "absolute",
          left: "400px",
          top: "400px",
          width: "200px",
          height: "100px",
          borderRadius: "20px",
          fontSize: "20px"
        }}
      >
        <Typography variant="h6" component="div">
          Import de Photo
        </Typography>
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleConvertToPdf2}
        style={{
          position: "absolute",
          left: "400px",
          top: "520px",
          width: "200px",
          height: "100px",
          borderRadius: "20px",
          fontSize: "20px"
        }}
      >
        <Typography variant="h6" component="div">
          Convertir en PDF
        </Typography>
      </Button>

      {errorMessage && (
        <p style={{ color: 'red', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
          {errorMessage}
        </p>
      )}

      {showCamera && (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
        />
      )}
    </div>
  );
}

export default HomePage;
