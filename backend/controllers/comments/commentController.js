const asyncHandler = require('express-async-handler')
const Comment = require('../../models/comment/Comment');
const validateMongodbID = require('../../utils/validateMongodbID');

// ------------------ Create Comment ------------------ //
const createComment = asyncHandler(async(req, res) => {
    // 1 get user
    const user = req.user;
    // 2 get post id
    const {
        postId,
        description
    } = req.body;
    validateMongodbID(postId);
    // 3 create comment
    try {
        const comment = await Comment.create({
            post: postId,
            description,
            user
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400);
        throw new Error('Comment not created');
    }
});

// ------------------ GetAll Comments ------------------ //
const getAllComments = asyncHandler(async(req, res) => {
    try {
        const comments = await Comment.find({}).sort({
            createdAt: -1
        }).populate('post');
        res.status(200).json(comments);
    } catch (error) {
        res.status(400);
        throw new Error('Comments not found');
    }
});

// ---------------- Get Single Comment ---------------- //
const getSingleComment = asyncHandler(async(req, res) => {
    const {
        id
    } = req.params;
    validateMongodbID(id);
    try {
        const comment = await Comment.findById(id).populate('post');
        res.status(200).json(comment);
    } catch (error) {
        res.status(400);
        throw new Error('Comment not found');
    }
});

// ------------------ Update ------------------ //
const updateComment = asyncHandler(async(req, res) => {
    const {
        id
    } = req.params;
    validateMongodbID(id);

    try {
        const comment = await Comment.findByIdAndUpdate(id, {
            post: req.body?.postId,
            user: req?.user,
            description: req?.body?.description,
        }, {
            new: true,
            runValidators: true,
        });
        res.json(comment);
    } catch (error) {
        throw new Error('Comment not updated');
        res.status(400);
    }
});

// ------------------ Delete ------------------ //
const deleteComment = asyncHandler(async(req, res) => {
    const {
        id
    } = req.params;
    validateMongodbID(id);

    try {
        const comment = await Comment.findOneAndDelete(id);
        res.json({
            message: "deleted",
            comment
        })
    } catch (error) {
        throw new Error('Comment not deleted');
        res.status(400);
    }

});


module.exports = {
    createComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment
};