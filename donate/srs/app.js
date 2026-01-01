const express = require("express");
/**Loads Express from node_modules
Node uses CommonJS modules (require, module.exports)**/

const app = express();
/**Creates an Express application
This app is basically a request handler pipeline**/

app.use(express.json());

/**Middleware: Runs before routes, Parses JSON → req.body
🧠 Middleware = functions that sit between request and response**/

app.get('/', (req, res) => {
  res.json({
    message: 'Donation API is running'
  });
});

module.exports = app;






