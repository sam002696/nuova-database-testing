const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//create post

router.post("/", async (req, res) => {
    // const user = await User.findById(req.body.id)
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err)
    }
})

//update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {
                    new: true
                })
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(404).json(err)
            }

        }
        else {
            res.status(401).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted")
            } catch (err) {
                res.status(404).json(err)
            }

        }
        else {
            res.status(401).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
//get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err)
    }

})

// get all posts
router.get("/", async (req, res) => {
    const userquery = req.query.user;
    const catquery = req.query.cat;
    try {
        let posts;
        if (userquery) {
            posts = await Post.find({ username: userquery })
        }
        else if (catquery) {
            posts = await Post.find({
                categories: {
                    $in: [catquery]
                }
            })
        }
        else {
            posts = await Post.find()
        }
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;