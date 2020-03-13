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

module.exports = router;