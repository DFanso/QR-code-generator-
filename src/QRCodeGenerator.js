import React, { useState, useRef } from 'react';
import QrCode from 'react-qr-code';
import html2canvas from 'html2canvas';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const qrCodeContainerRef = useRef(null);
  const qrCodeRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDownload = async () => {
    const qrCodeContainer = qrCodeContainerRef.current;
    const qrCode = qrCodeRef.current;
    if (!qrCodeContainer || !qrCode) return;


    await Promise.all([
      html2canvas(qrCodeContainer).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qr_code.png';
        link.href = imgData;
        link.click();
      }),
    ]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input..."
          style={styles.input}
        />
      </div>
      <div ref={qrCodeContainerRef} style={styles.qrCodeContainer}>
        <QrCode value={inputValue} style={styles.qrCode} ref={qrCodeRef} />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleDownload} style={styles.downloadButton}>
          Download QR Code
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
  },
  qrCodeContainer: {
    marginBottom: '20px',
    background: '#f0f0f0',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  qrCode: {
    width: '200px',
    height: '200px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  downloadButton: {
    padding: '10px 20px',
    fontSize: '16px',
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default QRCodeGenerator;
