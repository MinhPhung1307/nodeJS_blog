const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
    
    // [GET] /couses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [GET] /couses/edit/:id
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [POST] /couses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(req.body)
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {})
    }

    // [PUT] /couses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [PATCH] /couses/:id/restore
    restore(req, res, next){
        Course.restore({ _id: req.params.id })
            .then(() => {return Course.updateOne({ _id: req.params.id }, { deleted: false });})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /couses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /couses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /couses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>
                res.render('courses/show', { course: mongooseToObject(course) })
            )
            .catch(next)
    }
    
}

module.exports = new CourseController();
