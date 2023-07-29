const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const auth = require('basic-auth');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
const uploadsDir = path.join(__dirname, 'uploads');


// Create a new directory to upload, if it dont exist
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cors to identify the origin of the uploaded files, in this case it is the React Application.
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost', 'http://localhost:80']
}));


const authenticate = (req, res, next) => {
  const user = auth(req);
  if (!user || user['pass'] !== 'password') {
    res.status(401);
    return res.json({ error: 'Failed: Unauthorized' });
  }
  next();
};

app.use('/download/:name', authenticate, (req, res) => {
  const filePath = path.join(uploadsDir, req.params.name);
  if (fs.existsSync(filePath)) {
    return res.download(filePath);
  } else {
    res.status(404);
    return res.json({ error: 'File not found' });
  }
});

app.post('/upload/:name', authenticate, upload.single('file'), (req, res) => {
  // check if file was actually received
  if (!req.file) {
    res.status(400);
    return res.json({ error: 'No file received' });
  }
  
  // if a file with the same name exists, log a warning
  const filePath = path.join(uploadsDir, req.params.name);
  if (fs.existsSync(filePath)) {
    console.warn('File already exists and will be replaced');
  }

  // move the file to the target directory
  fs.renameSync(req.file.path, filePath);
  return res.json({ 
    success: true, 
    message: 'File uploaded successfully',
    downloadUrl: `http://localhost:3001/download/${req.params.name}` 
  });
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
