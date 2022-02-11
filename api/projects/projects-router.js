// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const { validateUserId, validatePost, allComplete, } = require('./projects-middleware');
const Project = require('./projects-model');

router.get('/', async (req, res, next) => {
    try {
        const project = await Project.get()
        res.status(200).json(project)
    } catch (err){
        next(err)
    }
})

router.get('/:id', validateUserId, async (req, res, next) => {
    try {
        const project = await Project.get(req.valid.id)
        res.status(200).json(project)  
    } catch (err){
        next(err)
    }
})

router.post('/', validatePost, async (req, res, next) => {
    try {
        const newProject = await Project.insert(req.body)
        res.status(200).json(newProject) 
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateUserId, validatePost, allComplete, async (req, res, next) => {
    try {
        const updatedProject = await Project.update(req.valid.id, req.body)
        res.status(200).json(updatedProject) 
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateUserId, async (req, res, next) => {
    try {
        await Project.remove(req.valid.id)
        res.status(200).json({ message: 'Action successful'})
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateUserId, async (req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.valid.id)
        res.status(200).json(actions) 
    } catch (err) {
        next(err)
    }
})

module.exports = router