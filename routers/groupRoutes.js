const express = require('express')
const router = express.Router()
const User = require("../models/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const group = require('../models/group');

router.post('/creategroup', async (req, res) => {
   
      try {
        const { token, group_name } = req.body;
        const decodedToken = jwt.verify(token,"apple");
        const ownerId = decodedToken.user_id;
        const createGroup = await group.create({ 
          groupName: group_name,
          members: [ownerId], 
          admin: ownerId 
        });
        res.json({ message: 'Group created successfully', createGroup });
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }
});

router.patch('/add-member-to-group', async (req, res) => {
  try {
    const { token, group_name, member_id } = req.body;
    const decodedToken = jwt.verify(token,"apple");
    const ownerId = decodedToken.user_id;
        const newGroup = await group.findOne({ groupName: group_name, admin: ownerId })
    if (!newGroup) {
      return res.status(404).json({ error: 'Group not found or you are not the admin' });
    }
    newGroup.members.push(member_id);    
    await newGroup.save();
    res.json({ message: 'Member added to the group successfully', newGroup});
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router
