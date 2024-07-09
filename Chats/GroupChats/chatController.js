const chat = require("./chatSchema");
const group = require("./groupsSchema");

const createGroup = async (req, res) => {

  // Create a new group
  const addGroup = new group({
  
    title: req.body.title,
    adminId: req.params.id,
   
    date:new Date()
  });
  await addGroup
    .save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewAllActiveGroups = (req, res) => {
  group
    .find({ status:true })
  
    .populate("adminId")

    .exec()
    .then((data) => {
    
if(data.length>0){
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// View Interns by ID
const viewGroupById = (req, res) => {
  group.findById({ _id: req.params.id }).populate('adminId')
      .exec()
      .then(data => {
          res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: data
          });
      })
      .catch(err => {
          res.status(500).json({
              status: 500,
              msg: "No Data obtained",
              Error: err
          });
      });
};


// View Interns by ID
const closeGroupById = (req, res) => {
  group.findByIdAndUpdate({ _id: req.params.id },{status:false})
      .exec()
      .then(data => {
          res.json({
              status: 200,
              msg: "Data updated successfully",
              data: data
          });
      })
      .catch(err => {
          res.status(500).json({
              status: 500,
              msg: "No Data obtained",
              Error: err
          });
      });
};



//Chat Section


const joinGroup = async (req, res) => {

  // Create a new group
  const datas = new chat({
  
    internId: req.body.internId,
   groupId: req.params.id,
   msg:req.body.msg,
    date:new Date()
  });
  await datas
    .save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// View Interns by ID
const viewgroupChatsByGroupId = (req, res) => {
  chat.find({ groupId: req.params.id}).populate('internId').sort({createdAt:1})
      .exec()
      .then(data => {
          res.json({
              status: 200,
              msg: "Data updated successfully",
              data: data
          });
      })
      .catch(err => {
          res.status(500).json({
              status: 500,
              msg: "No Data obtained",
              Error: err
          });
      });
};
// View Interns by ID
const viewgroupsByInternId = (req, res) => {
  group.find({ internId: req.params.id,status:true}).populate('groupId')
      .exec()
      .then(data => {
          res.json({
              status: 200,
              msg: "Data updated successfully",
              data: data
          });
      })
      .catch(err => {
          res.status(500).json({
              status: 500,
              msg: "No Data obtained",
              Error: err
          });
      });
};

module.exports = {
  createGroup,
  viewAllActiveGroups,
  viewGroupById,
closeGroupById,
  joinGroup,  
  viewgroupChatsByGroupId,
  viewgroupsByInternId
  
};
