const subscriptions = require('./subSchema');

const addsubscriptions =async (req, res) => {
 

  const sub = new subscriptions({
    
    title:req.body.title,
   
    price:req.body.price,
    noOfMonth:req.body.noOfMonth,
    description:req.body.description,
     
  });
let existingPlan=await subscriptions.findOne({title:req.body.title})
if(existingPlan){
  return   res.json({
    status:409,
    message: `${req.body.title} Plan is already added by you !!`,
})
}
  await sub.save()
  .then(data=>{
    res.json({
      status:200,
      message: "subscriptions added  successfully",
      data: data,
  }
  )
})
   .catch(err=>{
    console.error(err);
      res.json({
        err:err,
      status:500, 
   });
  })
   
}

const viewAllsubscriptionss = (req, res) => {
  subscriptions.find()
  
  .exec().
    then((complaints) => {
      res.status(200).json({
        status:200,
        message: "subscriptions retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status:500,
        message: "Error retrieving subscriptions",
        error: err,
      });
    });
};


const deletesubscriptionsById = (req, res) => {
  subscriptions.findByIdAndDelete({ _id: req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "subscriptions deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving subscriptions",
        error: err,
      });
    });
};

const editsubscriptionsById = (req, res) => {
  subscriptions.findByIdAndUpdate({ _id: req.params.id },
    {
      title:req.body.title,
   
    price:req.body.price,
    noOfMonth:req.body.noOfMonth,
    description:req.body.description,
    }
  )
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "subscriptions updated successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving subscriptions",
        error: err,
      });
    });
};

const viewsubscriptionsById = (req, res) => {
  subscriptions.findById({ _id: req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "subscriptions obtained successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving subscriptions",
        error: err,
      });
    });
};



module.exports = {
  addsubscriptions,
  viewAllsubscriptionss,
  viewsubscriptionsById,
  deletesubscriptionsById,
  editsubscriptionsById
 
}
