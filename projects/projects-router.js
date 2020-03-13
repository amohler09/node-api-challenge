const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving projects" });
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Projects.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "Cannot find a project with that ID" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving the project" });
        })
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    Projects.getProjectActions(id)
        .then(actions => {
            if (actions.length > 0) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ message: "Cannot find any actions for the specified project ID" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving actions" });
        })
})


module.exports = router;