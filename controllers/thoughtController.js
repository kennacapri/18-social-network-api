const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    // get a single thought
    getSingleUser(req, res) {
        User.findThought({ _id: req.params.userId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that id' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},

// create a new thought
createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
               {_id: req.body.userId},
               {$addToSet: { thoughts: thought._id}} 
            );
        })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'Thought was created, but no user was found with that id' })
        : res.json(user)
    )

        .catch((err) => res.status(500).json(err))
    },

    // update a thought
    updateUser(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.userId},
            {thoughtText: req.body.thoughtText}
        )
        .then((thought) =>
             !thought
            ? res.status(404).json({message: 'No thought found with that id'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete a thought
    deleteThought(req, res) {
        thought.findOneAndDelete(
            {_id: req.params.thoughtId}
        )
        .then((thought) =>
             !thought
            ? res.status(404).json({message: 'No thought found with that id'})
            : User.findOneAndDelete(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}}
            )
        )
        .then((user) =>
            !user
            ? res.status(404).json({message: 'Thought was deleted, but no user was found with that id'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // add a new reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions:req.body}}
        )
        .then((thought) =>
             !thought
            ? res.status(404).json({message: 'No thought found with that id'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove a reaction
    deleteReaction(req, res) {
        // it's update instead of delete because we aren't deleting a user, just a reaction
        User.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions:req.params.reactionId}}
        )
        .then((thought) =>
             !thought
            ? res.status(404).json({message: 'No thought found with that id'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
}