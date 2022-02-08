// implement your posts router here
const Post = require('./posts-model');
const router = require('express').Router();


/* #### 1 [GET] /api/posts */

router.get('/', (req,res) =>{
    Post.find(req.query)
        .then(posts =>{
            res.status(200).json(posts);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        });
});

/* #### 2 [GET] /api/posts/:id */

router.get('/:id', (req,res) =>{
    Post.findById(req.params.id)
        .then(posts =>{
            if(posts){
                res.status(200).json(posts);
            }else{
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message: "The post information could not be retrieved", 
            });
        });
});
/* #### 3 [POST] /api/posts

- If the request body is missing the `title` or `contents` property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON: `{ message: "Please provide title and contents for the post" }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON: `{ message: "There was an error while saving the post to the database" }`. */

router.post('/', (req,res) =>{
    Post
})  

module.exports = router;