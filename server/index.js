const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();
// google oauth routes
authRoutes(app);

/* dynamic port binding
listen to port that is provided by third party platform
Ex. Heroku
PORT would listen to 5000 by default if a port is not provided
*/
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send({hi:'Hello World!'})
})

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});



