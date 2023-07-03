const path = require("path");

module.exports = function uploadFile(req, res) {
  let sampleFile;
  let uploadPath;

  //   console.log(req.files.img);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.img;
  console.log(__dirname);

  uploadPath = path.join(__dirname, "../images/", sampleFile.name);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
};
