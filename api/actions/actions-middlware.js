// add middlewares here related to actions
const Actions = require('./actions-model')

const validateUserId = async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id)
            if(!action){
                next({ status: 404, message: 'requested action not found' })
            } else {
                req.action = action
                next()
            }  
    } catch (err) {
        next(err)
    }
}

const validatePost = (req, res, next) => {
    try {
        if(!req.body.notes || !req.body.description || !req.body.project_id){
            next({ status: 400, message: 'required fields not complete'})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const allComplete = (req, res, next) => {
    if(req.body.completed || req.body.completed === false){
        next()
    } else {
        next({ status: 400, message: 'required fields not completed'})
    }
}

module.exports = {
    validateUserId,
    validatePost,
    allComplete,
}