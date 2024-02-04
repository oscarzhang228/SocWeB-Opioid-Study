import fs from "fs";
import papa from "papaparse";
export default (req, res) =>
  fs.readFile("./api/questions.csv", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      papa.parse(data.toString(), {
        header: true,
        complete: (result) => {
          res.send(result.data);
        },
      });
    }
  });

// const express = require("express");
// const app = express();
// const port = 3001;
// const fs = require("fs");
// const papa = require("papaparse");
// const cors = require("cors");
// app.use(cors());

// app.get("/questions", (req, res) => {
//   console.log("inside");
//   fs.readFile("./questions.csv", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       papa.parse(data.toString(), {
//         header: true,
//         complete: (result) => {
//           res.send(result.data);
//         },
//       });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
