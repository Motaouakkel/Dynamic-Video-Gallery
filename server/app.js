const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');

const port=process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
let dirPath = __dirname+'/short-video';
 
app.get('/video' , (req,res)=>{
    res.setHeader('Content-Type','text/json');
    fs.readdir(__dirname+'/short-video', (err, files) => {
        if (err)
          console.log(err);
        else {
          res.send(files);
        }
      })
});



app.get("/video/:videoName", function (req, res) {
  
  //console.log(req.headers);

  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 11MB)
  
  const coursName  = req.params.CoursName;
  const chapter  = req.params.chapter;
  const videoName  = req.params.videoName;
  const videoPath = `/video/${videoName}`;
  const videoSize = fs.statSync(videoPath).size;
  //console.log(videoSize)

  // Parse Range
  // Example: 'bytes=6750208-'
  const CHUNK_SIZE = 5 * 10 ** 5; // ~500 KB => 500000 Bytes
  const start = Number(range.replace(/\D/g, ""));// 'bytes=6750208-' => 6750208
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  //console.log(start,end);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});


app.listen(port,()=> {
    console.log(`Server is Listening on port ${port}`);
})
