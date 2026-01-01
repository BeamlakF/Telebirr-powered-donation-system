const app = require('./app');
/**Imports the Express app
No server started yet**/

require('dotenv').config();
/**Loads variables from .env into process.env
This is how secrets enter your app safely**/

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**Until listen() is called, the app is just a function*/
