const express = require("express");

const server = express();

// Necessário para receber json por post
server.use(express.json());




server.listen(3000);
