// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const { validateUserId, validatePost, allComplete } = require('./actions-middlware');
const Action = require('./actions-model');

router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.get()
        res.status(200).json(actions);
    } catch(err){
        next(err)
    }
});

router.get('/:id', validateUserId, async (req, res, next) => {
    try {
        const action = await Action.get(req.action.id)
        res.status(200).json(action)  
    } catch (err){
        next(err)
    }
})

router.post('/', validatePost, async (req, res, next) => {
    try {
        const newAction = await Action.insert(req.body)
            res.status(200).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateUserId, validatePost, allComplete, async (req, res, next) => {
    try {
        const updatedAction = await Action.update(req.action.id, req.body)
        res.status(200).json(updatedAction) 
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateUserId, async (req, res, next) => {
    try {
        await Action.remove(req.action.id)
        res.status(200).json({ message: 'Action successful'})
    } catch (err) {
        next(err)
    }
})

module.exports = router;