const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

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

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            if (!req.body.name || !req.body.description) {
                res.status(404).json({ message: "Project name and description are required" });
            } else {
            res.status(201).json(project);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error adding project" });
        })
})

router.post('/:id/actions', (req, res) => {
    const id = req.params.id;
    if (req.body.project_id === id) {
        Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error adding action" });
        })
    } else {
        res.status(404).json({ error: "Make sure project id matches route path and try again" });
    }
    

})



module.exports = router;