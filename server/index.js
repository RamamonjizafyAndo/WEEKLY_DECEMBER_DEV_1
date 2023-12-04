const cors = require('cors')
const express = require('express');
const app = express();
const routerAutoCorrect = require('./routes/autocorrect');
const routerAnalyse = require('./routes/analyse');

app.use(cors());

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/api/autocorrect',routerAutoCorrect)
app.use('/api/analyse', routerAnalyse);

app.listen(4200,()=>{
    console.log('app listening on port 4200');
})