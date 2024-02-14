const User = require('../database/models/registration.js')
const Post = require('../database/models/post.js')
const jwt = require('jsonwebtoken');
const Token = require('../database/models/token.js')
const ImageKit = require('imagekit');

require('dotenv').config();
const signup = async (req, res) => {
    try {
        const user = req.body;
        const newUser = new User(user);
        await newUser.save()
        return res.status(200).json({ msg: 'Registration successfull!' })

    } catch (e) {

        console.log(e);
    }
}

const login = async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).json({ msg: "User not found" })
    try {
        let match = (user.password === req.body.password);
        if (match) {

            return res.status(200).json({ name: user.username, id: user._id })
        } else {
            res.status(400).json({ msg: "Password does not  match" })
        }
    } catch (e) {

        res.status(500).json({ msg: 'Error during login' });
    }
}

const createpost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = new Post(post);
        newPost.save()
        return res.status(200).json({ msg: 'Post Created' })
    } catch (e) {
        console.error('Error while posting');
        console.error(e)
    }

}

const getpost = async (req, res) => {
    try {
        const data = await Post.find();
        res.status(200).json(data)
    } catch (e) {

        console.log(e);
    }

}

const userinfo = async (req,res) => {
    try {
        const user = await User.findOne({_id: req.body.userid})
        return res.status(200).json(user)
        
    } catch(e) {
        
        return res.status(500).json({msg:'User not found!'})
    }
}


const changepassword = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        user.password = req.body.password;
        await user.save();
        return res.status(200).json({ msg: "Password changed" })
    } catch (err) {
        console.log(err.message)
    }
}
const deletepost = async (req, res) => {
    try {
        const postId = req.body.id;


        const deletedPost = await Post.deleteOne({ id: postId });

        if (deletedPost.deletedCount === 1) {
            return res.status(200).json({ msg: "Deleted Successfully!" });
        } else {
            return res.status(404).json({ msg: "Post not found" });
        }
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({ msg: "Internal Server Error" });
    }
};
const increaselike = async (req, res) => {
    const postId = req.body.id;
    const liker = req.body.userid;
    try {
        const post = await Post.findOne({ id: postId })
        if(!post.likedBy.includes(liker)) {
            post.likes += 1;
            post.likedBy.push(liker)
            await post.save()
            return res.status(200).json({ msg: "Liked" })
        } else {
            return res.status(500).json({msg: "Already liked"})
        }
        
    } catch (err) {
        return res.status(500).json({ msg: 'Post not found' })
    }
}
const addcomment = async (req, res) => {
    const postId = req.body.id;
    const author = req.body.author;
    const comment = req.body.text;

    try {
        const post = await Post.findOne({ id: postId });
        post.comments.push({
            text: comment,
            author: author,
        });
        await post.save()
        return res.status(200).json({ msg: "Comment saved" })

    } catch (e) {

        console.log(e.message);
    }
}

const imagekitauth = async (req,res)=>{
    const imagekit = new ImageKit({
      urlEndpoint: 'https://ik.imagekit.io/uwei6az6zu/',
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY
});
    var result = await imagekit.getAuthenticationParameters();
    res.send(result);
    
}

module.exports = { signup, login, changepassword, createpost, getpost, deletepost, increaselike, addcomment, imagekitauth, userinfo };