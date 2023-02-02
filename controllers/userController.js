const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    // get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that id' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},

// create a new user
createUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {username: req.body.username}
        )
        .then((user) =>
             !user
            ? res.status(404).json({message: 'No user found with that id'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete(
            {_id: req.params.userId}
        )
        .then((user) =>
             !user
            ? res.status(404).json({message: 'No user found with that id'})
            : res.json({message: 'User was deleted'})
            )
            .catch((err) => res.status(500).json(err));
    },

    // add a new friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends:req.params.friendId}}
        )
        .then((user) =>
             !user
            ? res.status(404).json({message: 'No user found with that id'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove a friend
    deleteFriend(req, res) {
        // it's update instead of delete because we aren't deleting a user, just a friend
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends:req.params.friendId}}
        )
        .then((user) =>
             !user
            ? res.status(404).json({message: 'No user found with that id'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}