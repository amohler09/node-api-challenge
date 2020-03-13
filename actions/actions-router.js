const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving actions" });
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ message: "Could not find an action with that ID" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving actions" });
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(action => {
            if (!action) {
                res.status(400).json({ message: "Invalid action ID" });
            } else {
                res.status(200).json({ message: "Action has been deleted" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting post" });
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (req.body.id === id) {
        Actions.update(id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error updating post" });
        })
    } else {
        res.status(400).json({ message: "Make sure ID to update matches route and try again" });
    }
    
})

module.exports = router;