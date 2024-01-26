const express = require("express");
const app = express();
const port = 3001;
const fs = require("fs");
const papa = require("papaparse");
const cors = require("cors");
app.use(cors());

app.get("/questions", (req, res) => {
  console.log("inside");
  fs.readFile("./questions.csv", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      papa.parse(data.toString(), {
        header: true,
        complete: (result) => {
          console.log(result.data);
          res.send(result.data);
        },
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
