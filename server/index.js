const express = require('express');
const app = express();

/* dynamic port binding
listen to port that is provided by third party platform
Ex. Heroku
PORT would listen to 3000 by default if a port is not provided
*/
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send({hi:'Hello World!'})
})

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});
