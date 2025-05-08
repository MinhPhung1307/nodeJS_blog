const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let coursesQuery = Course.find({});

        if(req.query.hasOwnProperty('_sort')) {
            coursesQuery = coursesQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([coursesQuery, Course.countDocumentsDeleted()])
            .then(([courses, coursesDelete]) => 
                res.render('me/stored-courses', {
                    coursesDelete,
                    courses: mutipleMongooseToObject(courses)
                })  
            )
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next){
        Course.findDeleted({}) 
        .then(courses => res.render('me/trash-courses', {
            courses: mutipleMongooseToObject(courses)
        }))
        .catch(next)
    }
}

module.exports = new MeController();
