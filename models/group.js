const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
groupName: {
   type: String,
   default: null
},
members: [{ 
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
   }],
admin: { 
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
   },
token:{
   type:String
},
});

module.exports = mongoose.model("group", groupSchema)