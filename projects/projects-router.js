const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

//  Get all projects
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

//  Get project by ID
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

//  Get all actions for specific project
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

//  Add a new project
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

//  Add a new action for a specific project
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

//  Delete a project
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
        .then(project => {
            res.status(200).json({ message: "Project has been successfully deleted" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting project" });
        })
});

//  Update a project
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Projects.update(id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error updating project" });
        })
})




module.exports = router;