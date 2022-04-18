require("../models/database");
const Path = require("../models/Path");
const Course = require("../models/Course");

/**
 * GET PAGE/
 * HOMEPAGE
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const paths = await Path.find({}).limit(limitNumber);
    const latest = await Course.find({}).sort({ _id: -1 }).limit(limitNumber);
    const CSS = await Course.find({ path: "CSS" }).limit(limitNumber);
    const JS = await Course.find({ path: "JS" }).limit(limitNumber);
    const Node = await Course.find({ path: "Node" }).limit(limitNumber);
    const Database = await Course.find({ path: "Database" }).limit(limitNumber);
    const Express = await Course.find({ path: "Express" }).limit(limitNumber);

    const word = { latest, CSS, JS, Node, Database, Express };

    res.render("index", { title: "EDUCO-Home", paths, word });
  } catch (error) {
    res.status(500).send({ message: error || "Error Occured" });
  }
};

/**
 * GET paths/
 * paths
 */
exports.explorePaths = async (req, res) => {
  try {
    const limitNumber = 5;
    const paths = await Path.find({}).limit(limitNumber);

    res.render("paths", { title: "EDUCO-Paths", paths });
  } catch (error) {
    res.status(500).send({ message: error || "Error Occured" });
  }
};

/**
 * GET paths/id
 * paths By id
 */
exports.explorePathsById = async (req, res) => {
  try {
    //grab the id from the page
    let pathId = req.params.id;
    const limitNumber = 20;
    const pathById = await Course.find({ path: pathId }).limit(limitNumber);

    res.render("paths", { title: "EDUCO-Paths", pathById });
  } catch (error) {
    res.status(500).send({ message: error || "Error Occured" });
  }
};

/**
 * GET course/:id
 * course page
 */
exports.exploreCourse = async (req, res) => {
  try {
    let courseId = req.params.id;
    //query
    const course = await Course.findById(courseId);

    res.render("course", { title: "EDUCO-Course", course });
  } catch (error) {
    res.status(500).send({ message: error || "Error Occured" });
  }
};

/**
 * POST search
 * Search
 */
exports.searchCourse = async (req, res) => {
  //searchTerm query

  try {
    let searchTerm = req.body.searchTerm;
    //searchTerm query

    let course = await Course.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    //res.json(course);
    res.render("search", { title: "EDUCO-Search", course });
  } catch (error) {
    res.status(500).send({ message: error || "Error Occured" });
  }
};

/**
 * GET explore-latest
 * explore-latest page
 */
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const course = await Course.find({}).sort({ _id: -1 }).limit(limitNumber);

    res.render("explore-latest", { title: "EDUCO-Paths", course });
  } catch (error) {
    res.status(500).send({ message: error || "Error Occured" });
  }
};

/**
 * GET submitCourse
 * submitCourse page
 */
exports.submitCourse = async (req, res) => {
  //flash messages

  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");

  res.render("submit-course", {
    title: "EDUCO-Paths",
    infoErrorsObj,
    infoSubmitObj,
  });
};

/**
 * POST submitCourse
 * submitCourse page
 */
exports.submitCourseOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).lenght === 0) {
      console.log("No files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    const newCourse = new Course({
      name: req.body.name,
      description: req.body.description,
      content: req.body.content,
      image: newImageName,
    });

    await newCourse.save();

    req.flash("infoSubmit", "Course has been added.");
    res.redirect("/submit-course");
  } catch (error) {
    req.flash("infoErrors", error);
    res.redirect("/submit-course");
  }
};





//DELETE COURSE
/* async function deleteCourse(){

  try{
    await Course.deleteOne({ name: ' CSS'});
  }catch(err){
    console.log(err)
  }
}
deleteCourse();

//UPDATE COURSE FUNCTION

/* async function updateCourse(){

  try{
    const res = await Course.updateOne({name: 'Css'},{name:'CSS'});
    res.n;//Number of documents match
    res.nModified;// Number of documents motified
  }catch(err){
    console.log(err)
  }
}

updateCourse(); */

/* async function insertDummyCategoryData() {
  try {
    await Path.insertMany([
      {
        name: "CSS",
        image: "thai-food.jpg",
      },
      {
        name: "Node",
        image: "thai-food.jpg",
      },
      {
        name: "Express",
        image: "thai-food.jpg",
      },
      {
        name: "Database",
        image: "thai-food.jpg",
      },
      {
        name: "JS",
        image: "thai-food.jpg",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

insertDummyCategoryData(); */

/* async function insertDummyCourseData() {
  try {
    await Course.insertMany([
      {
        name: "CSS",
        description: "css hakkinda hersey",
        email: "esgiefe@gmail.com",
        content: ["ezgi"],
        path: "CSS",
        image: "aaa.jpg",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
insertDummyCourseData(); */
