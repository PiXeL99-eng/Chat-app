const router = require("express").Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");
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
        time: req.body.time,
        name: req.body.name
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

        req.body.members.map(async (member) => {

          let user = await User.findOne({ email: member.email });
          let convos = user.conversations
          convos.push(conv._id)

          user = await User.findOneAndUpdate({ email: member.email }, {conversations: convos});

        })
        
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

//get receiver details
router.get("/receiver", async (req, res) => {
    try {

      // console.log(req)
      const filter = {_id: req.query.conversationId}

      let doc = await Conversation.findOne(filter)
      // console.log(doc)

      res.status(200).json({members: doc.members});
      } catch (err) {
        console.log("error")
        res.status(500).json(err)
      }
});

//get all convs
router.get("/allConvs", async (req, res) => {
    try {

      // console.log(req)
      let filter = {email: req.query.email}

      let doc = await User.findOne(filter)

      let convs = doc.conversations
      let details = []
      
      for(let i=0; i<convs.length; i++){
        
        filter = {_id: convs[i]}
        let obj = {conversationId: '', name: '', message: '', time: ''}
        doc =  await Conversation.findOne(filter)

        // console.log(doc)

        obj.time = `${doc.updatedAt}`
        obj.conversationId = `${convs[i]}`
        obj.name = `${ doc.members.filter((user) => user.email !== req.query.email)[0].username }`
        obj.message = doc.messages.length!==0? `${ doc.messages[doc.messages.length - 1].text }` : ''
        // obj.sender = `${ doc.messages[doc.messages.length - 1].name }`

        details.push(obj)
      }

      // console.log(details)

      res.status(200).json({convs: details});

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