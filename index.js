const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());


const posts = {};

app.get("/posts", (req, res) => {
   res.send(posts);
});

app.post("/posts/create", async (req, res) => {
   console.log('received post')
   const id = randomBytes(4).toString("hex");
   const { title } = req.body;

   posts[id] = {
      id,
      title,
   };

   try {
      await axios.post("http://event-bus-srv:4005/events", {
         type: "PostCreated",
         data: {
            id,
            title,
         },
      });
   } catch (error) {
      console.log("Error in posts services: ", error.message);
   }

   res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
   console.log("Received Event:", req.body.type);

   res.send({});
});

const port = 4000;

app.listen(port, () => {
   console.log('v50')
   console.log(`Listening on port ${port}`);
});
