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

/* #### 3 [POST] /api/posts */
router.post('/', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ 
            message: 'Please provide title and contents for the post'
        })
    } else {
        Post.insert({ title, contents })
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                message: "There was an error while saving the post to the database",
            })
        })
    }
})

/* #### 4 [PUT] /api/posts/:id */

router.put('/:id', (req,res) =>{
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ 
            message: 'Please provide title and contents for the post'
        })
    } else {
        Post.findById(req.params.id)
        .then(stuff => {
            if (!stuff) {
                res.status(404).json({ 
                    message: "The post with specified ID does not exist",
                })
            } else {
                return Post.update(req.params.id, req.body)
            }
        })
        .then(data => {
            if (data){
                return Post.findById(req.params.id)
            }
        })
        .then(post => {
            if (post) {
                res.json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ 
                message: "The post information could not be retrieved",
                err: err.message,
                stack: err.stack,
            })
        }) 
    }
})


module.exports = router;