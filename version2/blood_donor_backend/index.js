const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./routes/user.route.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth',userRoute);

app.get('/ping',(req,res)=>{
    res.send("pong");
})

app.listen(PORT,()=>{
    console.log(`Up and running at http://localhost:${PORT}`);
})