const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();


//  Get all actions
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

//  Get action by ID
router.get('/:id', validateActionID, (req, res) => {
    Actions.get(req.params.id)
        .then(actions => {
                res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving actions" });
        })
})

//  Add a new action
router.post('/', (req, res) => {
        Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error adding action" });
        })
})

//  Delete action by ID
router.delete('/:id', validateActionID, (req, res) => {
    Actions.remove(req.params.id)
        .then(action => {
                res.status(200).json({ message: "Action deleted" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting post" });
        })
})

// Update action by ID
router.put('/:id', validateActionID, (req, res) => {
        Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ message: "Error updating post" });
        })
    
})

//  middleware
function validateActionID(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
            if (!action) {
                res.status(400).json({ message: "Invalid action ID" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving action" });
        })

    next();
}

module.exports = router;