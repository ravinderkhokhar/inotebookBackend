const mongoose = require('mongoose');
const NotesSchema = new Schema({
    id:{
        type: Number,
        required:true,
        autoIndex:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('notes',NotesSchema)