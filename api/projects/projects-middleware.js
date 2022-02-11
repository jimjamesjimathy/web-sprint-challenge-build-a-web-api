// add middlewares here related to projects
const Projects = require('./projects-model')

const validateUserId = async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
            if(!project){
                next({ status: 404, message: 'requested project not found' })
            } else {
                req.valid = project
                next()
            }  
    } catch (err) {
        next(err)
    }
}

const validatePost = (req, res, next) => {
    try {
        if(!req.body.name || !req.body.description){
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
                    allComplete, }