const express = require('express');
const localdata = require("./local.json");
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();

  
  // if(posts != false){
    const result = await posts.find({}).toArray();
    console.log("MULTIMEDIA DATA!"); 
    res.json(result);
    
  // }else{
  //   console.log("LOCALDATA!");
  //   res.json(localdata);    
  // }



});
//add post

//delete post

async function loadPostsCollection() {
   try{
       const client = await mongodb.MongoClient.connect(
        'mongodb+srv://c4a_log:3CnrrywpsLNtRx2a@cluster0.ztouclj.mongodb.net/?retryWrites=true&w=majority',
        {
          useNewUrlParser: true
        }
      );
      return client.db('creator4all').collection('c4a_log');
    }
    catch(err)
    {
      return false;
    }
    
   
  

  
   
  
  }


module.exports = router;

