const chat = require("./chatSchema");

const chatting = async (req, res) => {
  // Create a new message
  const message = new chat({
    msg: req.body.msg,
    support: req.body.support,
    from: req.body.from,
    fromId: req.body.fromId,
    toId: req.body.toId,
    date: new Date(),
  });
  await message
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

// const viewChatRecipientsforUserById = (req, res) => {
//   let uniqueUsers=[],support=false
//   chat
//     .find({ $or:[{fromId:req.params.id},{toId:req.params.id}]})
//     .populate("fromId toId")
  

//     .exec()
//     .then((data) => {
//       // console.log(data);
//       if (data.length > 0) {
//         let users = []
//         data.map((x) => {
//           if(x.fromId || x.toId){
        
//           users.push(x.fromId);
        
//           users.push(x.toId);
//             }
          
//         if(x.from=="support" || x.to=="support")
//           support=true
//         });
//         if(users.length>0)
//          users = [...new Set(users)]
       

//         res.json({
//           status: 200,
//           msg: "Data obtained successfully",
//           users: users,
//         support:support
//         });
//       } else {
//         res.json({
//           status: 200,
//           msg: "No Data obtained ",
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({
//         status: 500,
//         msg: "Data not Inserted",
//         Error: err,
//       });
//     });
// };
// const viewChatRecipientsforUserId = (req, res) => {
//   chat
//     .find({ userId: req.params.id })
//     .populate("advId")
//     .exec()
//     .then((data) => {
//       if (data.length > 0) {
//         adv = [];
//         data.map((x) => {
//           adv.push(x.advId);
//         });
//         const uniqueAdvs = [...new Set(adv)];
//         res.json({
//           status: 200,
//           msg: "Data obtained successfully",
//           data: uniqueAdvs,
//         });
//       } else {
//         res.json({
//           status: 200,
//           msg: "No Data obtained ",
//         });
//       }
//     })
//     .catch((err) => {
//       res.json({
//         status: 500,
//         msg: "Data not Inserted",
//         Error: err,
//       });
//     });
// };



const viewChatRecipientsforUserById = (req, res) => {
  let support = false;

  chat
    .find({ $or: [{ fromId: req.params.id }, { toId: req.params.id }] })
    .populate("fromId toId")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        let users = [];
        data.forEach((x) => {
          if (x.fromId && x.fromId._id.toString() !== req.params.id) {
            users.push(x.fromId);
          }
          if (x.toId && x.toId._id.toString() !== req.params.id) {
            users.push(x.toId);
          }
          if (x.from === "support" || x.to === "support") {
            support = true;
          }
        });

        // Remove duplicates
        users = users.filter((user, index, self) =>
          index === self.findIndex((t) => t._id.toString() === user._id.toString())
        );

        res.json({
          status: 200,
          msg: "Data obtained successfully",
          users: users,
          support: support,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained",
          users: [],
          support: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not obtained",
        error: err,
      });
    });
};
const viewChatBetweenUsers = (req, res) => {
  let fromId = req.body.fromId;
  let toId = req.body.toId;
  let loggedInUserId =req.body.loggedInUserId 
  chat
    .find({
      $or: [
        {
          fromId: fromId,
          toId: toId,
        },
        { fromId: toId, toId: fromId },
      ],
      $nor: [{ hiddenFor: loggedInUserId }]
    })
    .sort({ date: 1 })
    .populate("fromId")
    .populate("toId")
    .exec()

    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};
const viewChatBetweenuserandSuopport = (req, res) => {
  let userid = req.params.id;
  chat
    .find({
      $or: [
        {
          fromId: userid,
          support: true,
        },
        { toId: userid, support: true },
      ],
    })
    .sort({ date: 1 })
    .populate("fromId")
    .populate("toId")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};


const clearChatForUser = async (req, res) => {
  const { userId, chatPartnerId } = req.body; 
  try {
    await chat.updateMany(
      {
        $or: [
          { fromId: userId, toId: chatPartnerId },
          { fromId: chatPartnerId, toId: userId }
        ]
      },
      { $addToSet: { hiddenFor: userId } } // Add userId to hiddenFor array if not already present
    );

    res.status(200).json({
      status: 200,
      msg: 'Chat cleared successfully for the user',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Failed to clear chat',
      error: err.message,
    });
  }
};



const clearChatWithSupport = async (req, res) => {
  try {
    const  userId  = req.params.id;

 

    await chat.deleteMany({
      $or: [
        { fromId: userId, support: true },
        { toId: userId, support: true }
      ]
    });

    res.status(200).json({
      status: 200,
      msg: 'Chat with support cleared successfully.',
    });
  } catch (error) {
    console.error('Error clearing chat with support:', error);
    res.status(500).json({
      status: 500,
      msg: 'Failed to clear chat with support.',
      error: error.message,
    });
  }
};


module.exports = {
  chatting,
  viewChatBetweenUsers,
  viewChatBetweenuserandSuopport,
  viewChatRecipientsforUserById,
  clearChatForUser,
  clearChatWithSupport
};
