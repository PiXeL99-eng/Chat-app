const router = require("express").Router();
const Conversation = require("../models/Conversation");
const bcrypt = require("bcrypt");

//new message
router.post("/message", async (req, res) => {
  try {

    const filter = {_id: req.body.conversationId}

    let doc = await Conversation.findOne(filter)
    let messages = doc.messages
    messages.push({
        text: req.body.text, 
        sender: req.body.sender, 
        time: req.body.time
    })

    const update = {messages: messages}

    doc = await Conversation.findOneAndUpdate(filter, update);

    res.status(200).json({messages: messages});
    // res.status(200).json();

  } catch (err) {
    console.log("error")
    res.status(500).json(err)
  }
});

//new conversation
router.post("/create", async (req, res) => {
    try {
    
        //create new conversation
        const newConv = new Conversation({
          members: req.body.members,
          messages: []
        });
    
        //save conversation
        const conv = await newConv.save();
        res.status(200).json(conv);
      } catch (err) {
        console.log("works")
        res.status(500).json(err)
      }
});

//get conversation
router.get("/conversation", async (req, res) => {
    try {

      // console.log(req)
      const filter = {_id: req.query.conversationId}

      let doc = await Conversation.findOne(filter)

      res.status(200).json({messages: doc.messages});
      } catch (err) {
        console.log("error")
        res.status(500).json(err)
      }
});

// {
//     "conversationId": "63fc5dd9eec9dcf6ded271ac",
//     "text": "Hey",
//     "sender": "sayan@gmail.com",
//     "time": "230010"
// }

module.exports = router;