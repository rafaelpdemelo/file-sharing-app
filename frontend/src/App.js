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
      formData.append('password', passwordRef.current.value);
  
      const res = await axios.post(
        `http://localhost:3001/upload/${fileInputRef.current.files[0].name}`,
        formData
      );
      
      if (res.status === 200) {
        alert(`File uploaded successfully. Download URL: ${res.data.downloadUrl}`);
        
        passwordRef.current.value = "";
        fileInputRef.current.value = null;
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(`${error.response.data.message}`);
      } else if (error.response && error.response.status === 403) {
        alert(`${error.response.data.message}`); 
      }else {
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
          headers: {
            password: passwordRef.current.value
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
      console.log(error.response)
      if (error.response && error.response.status === 403) {
        alert('Incorrect Password or File Name');
      } else {
        alert(`Failed to download file: ${error.message}`);
      }
    }
};


  return (
    <AppWrapper>
      <StyledInput type="password" ref={passwordRef} placeholder="Password to encrypt or decrypt" />
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

// Styles for the Application
const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const StyledInput = styled.input`
  width: 178px;
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
