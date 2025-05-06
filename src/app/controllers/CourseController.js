const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
    
    // [GET] /couses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /couses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {})
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
