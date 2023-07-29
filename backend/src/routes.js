module.exports = function(app, upload, fs, path, uploadsDir) {
  app.post('/upload/:name', upload.single('file'), (req, res) => {
    res.json({ downloadUrl: `http://localhost:3001/download/${req.file.filename}` });
  });

  app.get('/download/:name', (req, res) => {
    // Ainda nao sei oq posso colocar aqui...
  });
};
