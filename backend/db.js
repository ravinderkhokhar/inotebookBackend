const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true"
const connectToMongo = () =>{
   // mongoose.connect(mongoURI);
      //  console.log("connected to Mongo Successfully")
      mongoose.connect(mongoURI).then(()=>console.log("connected to Mongo Successfully")).catch((e)=>console.log(e.message))
    // mongoose.connect(mongoURI,()=>{
    //     console.log("connected to Mongo Successfully")
    // })
}

module.exports = connectToMongo;