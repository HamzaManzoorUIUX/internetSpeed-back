const fs = require('fs');
const express = require('express');
const cors=require('cors')
const app = express();
app.use(cors())
app.get('/', (req, res) => {
  const content = 'x'.repeat(1024 * 1024); // create 1MB content
  const fileName = 'sample.txt';

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    const fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);

    fileStream.on('end', () => {
      fs.unlink(fileName, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
