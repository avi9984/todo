const express = require("express");
const app = express();
const route = require("./router/router");
const mongoose = require("mongoose");
const bodyParser=require('body-parser')

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose
  .connect(
    "mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/next-todo",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => {
    console.log(err);
  });

app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server is running on the port is ${PORT}`);
});

// app.get('/',(req,res)=>{
//     res.send({name:"avi",age:20})
// })
