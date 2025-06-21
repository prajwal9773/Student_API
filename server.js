const express = require('express');
require('dotenv').config(); // Load .env first

const studentRoutes = require('./routes/students');
const app = express();

app.use(express.json());

app.use('/students', studentRoutes);

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`server runnig on port ${PORT}`);

})