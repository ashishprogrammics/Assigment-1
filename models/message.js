const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   senderId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
      // required: true
   },
   reciverId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
      // required: true
   },
   groupId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'group',
      // If you want to allow individual messages, set required to false
      // For group messages, set required to true
      required: false,
   },
   content: {
      type: String,
      default: null
   },
   
   timestamp: { 
      type: Date, default: Date.now 
   }
});

module.exports = mongoose.model("message", messageSchema)
