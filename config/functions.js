const Course = require('./database');


//create the functions 

async function createCourse(){
    const course = new Course({
        author : "Moshood Ifconfig", 
        name : "Pentesting for dummies", 
        tags : ['hacking', 'pentest'], 
        isPublished : true,
    });


    const result = await course.save();
    console.log("function result : " + result);
}

async function updateCourse(courseid){
    const course = await Course.findById(courseid);
    if(!course) return;

    course.author = "New Author";
    course.isPublished = true;

    const result = await course.save();
    console.log("Update result: " + result);
}


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