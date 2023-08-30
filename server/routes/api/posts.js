const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  const result = await posts.find({}).toArray();
  res.json(result);
});
//add post

//delete post

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://c4a_log:3CnrrywpsLNtRx2a@cluster0.ztouclj.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('creator4all').collection('c4a_log');
  }


module.exports = router;

