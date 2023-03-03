if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const router = require("express").Router();
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
  
  //get peers
  router.get("/peers", async (req, res) => {
      try {
  
        let results = await User.find()
        results = results.filter((user) => user.email !== req.query.email)

        res.status(200).json({peers: results});
        } catch (err) {
          console.log("error")
          res.status(500).json(err)
        }
  });
  
  module.exports = router;