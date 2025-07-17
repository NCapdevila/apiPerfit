require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const perfitRoute = require('./routes/perfitRoute.js');

const app = express();
app.use(bodyParser.json());

app.use('/enviar-a-perfit', perfitRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
})
