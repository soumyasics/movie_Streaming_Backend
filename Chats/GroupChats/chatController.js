const chat = require("./chatSchema");
const group = require("./groupsSchema");
const groupMembers = require("./groupMembers");
const groupChat = require("./chatSchema");

const createGroup = async (req, res) => {

  // Create a new group
  const addGroup = new group({

    title: req.body.title,
    adminId: req.params.id,
    isActive: false,
    date: new Date()
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
    .find({ status: true, isActive: true })

    .populate("adminId")

    .exec()
    .then((data) => {

      if (data.length > 0) {
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
  group.findByIdAndUpdate({ _id: req.params.id }, { status: false })
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


const addUserToGroup = async (req, res) => {
  
  // Create a new group
  let flag = 0
  const exUser = await groupMembers.findOne({
    memberId: req.body.memberId,
    groupId: req.body.groupId
  })
  if (exUser) {
    flag = 1
    return res.json({
      status: 200,
      msg: "User Already added in this group",
    });
  }
  if (flag == 0) {
    const datas = new groupMembers({

      memberId: req.body.memberId,
      groupId: req.body.groupId,
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
  }
  let done = await group.findByIdAndUpdate({ _id: req.body.groupId }, { isActive: true })
  console.log(done);
};


const removeUserToGroup = async (req, res) => {


  await groupMembers.findByIdAndDelete({

    _id: req.body.id
  }).exec()

    .then((data) => {
      res.json({
        status: 200,
        msg: "removed successfully",
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
}

// View Interns by ID
const viewgroupChatsByGroupId = (req, res) => {
  chat.find({ groupId: req.params.id }).populate('memberId').sort({ createdAt: 1 })
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
const groupChatting = async (req, res) => {

  // Create a new group
  const addGroup = new groupChat({
    msg: req.body.msg,
    memberId: req.body.memberId,
    groupId: req.body.groupId,
    date: new Date()
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
// View Interns by ID
const viewgroupsByUserId = (req, res) => {
  group.find({ userId: req.params.id, status: true }).populate('groupId')
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
  addUserToGroup,
  viewgroupChatsByGroupId,
  viewgroupsByUserId,
  removeUserToGroup,
  groupChatting
};
