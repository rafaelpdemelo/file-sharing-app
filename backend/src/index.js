const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const upload = multer({ dest: 'uploads/' });
const uploadsDir = path.join(__dirname, 'uploads');

// Objeto para armazenar pares de arquivo/senha
const filePasswords = {};

// Create a new directory to upload, if it dont exist
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cors to identify the origin of the uploaded files, in this case it is the React Application.
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost', 'http://localhost:80', 'http://127.0.0.1:30080']
}));


app.post('/upload/:name', upload.single('file'), (req, res) => {
  // check if file was actually received
  if (!req.file) {
    res.status(400);
    return res.json({ error: 'No file received' });
  }
  
  const filePath = path.join(uploadsDir, req.params.name);
  // Check if file exists before upload
  if (fs.existsSync(filePath)) {
    console.warn('File already exists and will be replaced');
    return res.status(409).json({
      success: false, 
      message: 'File already exists and will be replaced',
    });
  }

  // Store the password associated with this file
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  filePasswords[req.params.name] = hashedPassword;
  
  // If file doesn't exist, proceed with upload
  fs.renameSync(req.file.path, filePath);
  return res.json({ 
    success: true, 
    message: 'File uploaded successfully',
    downloadUrl: `http://localhost:3001/download/${req.params.name}` 
  });
});

app.get('/download/:name', (req, res) => {
  const password = req.headers.password;
  const hashedPassword = filePasswords[req.params.name];

  if (password && hashedPassword && bcrypt.compareSync(password, hashedPassword)) {
    const filePath = path.join(uploadsDir, req.params.name);
    if (fs.existsSync(filePath)) {
      return res.download(filePath);
    } else {
      res.status(404);
      return res.json({ error: 'File not found' });
    }
  } else {
    return res.status(403).json({
      success: false, 
      message: 'Wrong password',
    });
  }
});



app.listen(3001, () => {
  console.log('Listening on port 3001');
});
