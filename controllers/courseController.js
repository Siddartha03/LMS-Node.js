const Course = require('../models/Course')

exports.listCourses = (req, res) => {
    Course.find()
        .then(courses => {
            const data = {
                title: 'LMS | List of Courses',
                courses
            }
            res.render('listCourses', data);
        })
        .catch(err => {
            res.json(err)
        })
}

exports.createCourse = (req, res) => {
    const data = {
        title: 'LMS | Add Course',
        errors: req.session.errors
    }
    req.session.errors = {}
    res.render('createCourse', data)
}

exports.createCourseProcess= (req, res) => {
    const {name, description, photo, duration} = req.body
    const course = new Course()
    course.name = name
    course.description = description
    course.photo = photo
    course.duration = Number(duration)

    course.save()
        .then(() => {
            res.status(200).json({
                message: "Insert Success!"
            })
            res.redirect('/listCourses')
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.deleteCourse = (req, res) => {
    let id = req.params.id;
    Course.deleteOne({_id: id})
        .then((result) => {
            res.status(200).json({
                message: "Deleted!"
            })
            //res.rendirect('/listCourses')
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.fetchCourse = (req, res) => {
    let id = req.params.id;
    Course.findOne({_id: id})
        .then(course => {
            const data = {
                title: 'LMS | List of Courses',
                errors: req.session.errors,
                course
            }
            
            res.render('updateCourse', data)
        })
        .catch(err => {
            res.json(err)
        })
}

exports.updateCourse = (req, res) => {
    let id = req.params.id;
    const {name, description, photo, duration} = req.body
    Course.updateOne({_id: id}, {$set:{name: name, description: description, photo: photo, duration: duration}})
    .then(() => {
        res.status(200).json({
            message: "Updated!"
        })
        //res.redirect('/listCourses')
    })
    .catch(err => {
        res.json(err)
    })
}