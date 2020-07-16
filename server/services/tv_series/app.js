if(process.env.NODE_ENV == 'development'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Tv Series Service running at port ${PORT}`)
})
