if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const router = require("express").Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const ImageKit = require('imagekit');

//new message

const imagekit = new ImageKit({
  urlEndpoint: `${process.env.IMAGEKIT_URL_ENDPOINT}`,
  publicKey: `${process.env.IMAGEKIT_PUBLIC_KEY}`,
  privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`
});

router.get('/img_auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

router.post("/message", async (req, res) => {
  try {

    const filter = {_id: req.body.conversationId}

    let doc = await Conversation.findOne(filter)
    let messages = doc.messages
    messages.push({
        isImage: req.body.isImage,
        fileUrl: req.body.fileUrl,
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

        if(req.body.isGroup){

          //create new conversation
          const newConv = new Conversation({
            isGroup: req.body.isGroup,
            groupName: req.body.groupName,
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
          
          res.status(200).json({conversationId: conv._id});

        }
        else{

          let conv1 = await Conversation.findOne({ members: req.body.members });
          let conv2 = await Conversation.findOne({ members: [req.body.members[1],  req.body.members[0]]});

          if(conv1){
            res.status(200).json({conversationId: conv1._id});
          }
          else if(conv2){
            res.status(200).json({conversationId: conv2._id});
          }
          else{
            
            const newConv = new Conversation({
              isGroup: req.body.isGroup,
              groupName: req.body.groupName,
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
            
            res.status(200).json({conversationId: conv._id});

          }

        }
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

      res.status(200).json({isGroup: doc.isGroup, groupName: doc.groupName, members: doc.members});


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
        let obj = {conversationId: '', name: '', message: '', time: '', isImage: false}
        doc =  await Conversation.findOne(filter)

        // console.log(doc)

        obj.time = `${doc.updatedAt}`
        obj.conversationId = `${convs[i]}`
        if(doc.isGroup){
          obj.name = doc.groupName
        }
        else{
          obj.name = `${ doc.members.filter((user) => user.email !== req.query.email)[0].username }`
        }
        obj.message = doc.messages.length!==0? `${ doc.messages[doc.messages.length - 1].text }` : ''
        obj.isImage = doc.messages.length!==0 && doc.messages[doc.messages.length - 1].isImage
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