const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to the MongoDB"))
    .catch(err => console.log("Error : " + err));


const schema = new mongoose.Schema({
    name : String, 
    author : String, 
    tags : [String], 
    date : { type : Date, default : Date.now}, 
    isPublished: Boolean
});

const Course = mongoose.model("Course", schema);

module.exports = Course;


// async function createCourse(){
//     const course = new Course({
//         name: "Angular Course", 
//         author : "Mosh Ali", 
//         tags : ['angular', 'frontend'], 
//         isPublished : true
//     }); 
//     const result = await course.save();
//     console.log(result);
// }


// async function updateCourse(courseid){
//     const course = await Course.findById(courseid);
//     if(!course) return;

//     course.author = "New Author";
//     course.isPublished = true;

//     const result = await course.save();
//     console.log("Update result: " + result);
// }


// updateCourse("5bf2bf2876f7581ddb022ab2")

// async function getCourse(){
//    const output  = await Course.find()
//    .limit(2)
//    .sort({name: -1})
//    .select({name: 1, tags: 1})
//    .count()
//    console.log(output);
// }
// createCourse();
// getCourse();