// IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")


//CONFIGURATIONS
const app = express()
dotenv.config();
app.use(express.json())



// GET ALL THE ROUTES
const userRouter = require('./Routes/userRoutes');
app.use('/customAPI/v1/user', userRouter);





// END-POINTS
app.get('/', (req, res) => {
  res.send('Hello WebCRAFTERS!')
})
app.get('/loadData', (req, res) => {
    try {
        fetch('https://tradestie.com/api/v1/apps/reddit')
        .then((data)=>{
            return data.json();
          })
          .then((data)=>{
            console.log(data);
            res.send(data);
          })
    }
    catch{
        res.send({err : "some api error"})
    }
})




// CONNECT TO DB
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('connected to DB'))


// START THE SERVER
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
