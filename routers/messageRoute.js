const express = require('express')
const router = express.Router()
const message = require("../models/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const group = require('../models/group');
const user = require('../models/user');
const auth = require("../middleware/auth");

router.post('/viewMessage', async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, "apple");
    const ownerId = decodedToken.user_id;

    const Messages = await message.find({ $or: [{ senderId: ownerId }, { reciverId: ownerId },] })
      .populate('senderId')
      // .select('content')
      .sort({ timestamp: -1 });

    res.json(Messages);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/send-message', async (req, res) => {
  try {
    const { token, messages, reciver_id } = req.body;
    const decodedToken = jwt.verify(token, "apple");
    const ownerId = decodedToken.user_id;
    const sendMessage = await message.create({
      content: messages,
      senderId: ownerId,
      reciverId: reciver_id,

    });
    res.json({ message: 'message send successfully', sendMessage });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/send-group-message', async (req, res) => {
  try {
    const { token, group_name, messages } = req.body;
    const decodedToken = jwt.verify(token,"apple");
    const ownerId = decodedToken.user_id;
    const Group = await group.findOne({ groupName: group_name, members: ownerId });
    if (!Group) {
      return res.status(404).json({ error: 'Group not found or you are not a member' });
    }
    const sendMessage = await message.create({
      content: messages,
      senderId: ownerId,
      groupId: Group._id,
    });
    res.json({ message: 'message send successfully', sendMessage });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});


router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});



module.exports = router