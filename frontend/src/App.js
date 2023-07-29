import React, { useRef } from 'react';
import { BsCloudUpload, BsCloudDownload } from 'react-icons/bs';
import styled from 'styled-components';
import axios from 'axios';


function App() {
  const fileInputRef = useRef(null);
  const passwordRef = useRef(null);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);
  
      const res = await axios.post(
        `http://localhost:3001/upload/${fileInputRef.current.files[0].name}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Basic ${btoa(`uploader:${passwordRef.current.value}`)}`
          },
        }
      );
      
      if (res.status === 200) {
        alert(`File uploaded successfully. Download URL: ${res.data.downloadUrl}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(`${error.response.data.message}`);
      } else {
        alert(`Failed to upload file: ${error}`);
      }
    }
  };
  

  const handleDownload = async () => {
    try {
      const filename = prompt('Enter filename to download:');
      const res = await axios.get(
        `http://localhost:3001/download/${filename}`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Basic ${btoa(`uploader:${passwordRef.current.value}`)}`
          },
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert(`Failed to download file: ${error}`);
    }
  };

  return (
    <AppWrapper>
      <StyledInput type="password" ref={passwordRef} placeholder="Enter password" />
      <StyledInput type="file" ref={fileInputRef} accept=".gz" />
      <StyledButton onClick={handleUpload}>
        <Icon><BsCloudUpload /></Icon>
        Upload
      </StyledButton>
      <StyledButton onClick={handleDownload}>
        <Icon><BsCloudDownload /></Icon>
        Download
      </StyledButton>
    </AppWrapper>
  );
}


//Styles for the Application
const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const StyledInput = styled.input`
  margin: 10px;
  padding: 10px;
  border: 2px solid #0080ff;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  color: white;
  background-color: #0080ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005cbf;
  }

  &:active {
    background-color: #003f7f;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;


export default App;
