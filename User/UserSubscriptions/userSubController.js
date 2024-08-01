const userSchema = require('../userSchema');
const Subscription = require('./userSubSchema');
const SubPlans= require('../../Subscriptions/subSchema');

const addSubscription =async (req, res) => {
  let exSub=await Subscription.findOne({userId: req.body.userId,paymentStatus:true})
  if(exSub)
  {
    if(exSub.remainingDays>0)
return  res.json({
  status: 400,
  message: "You Have Already Subscribed here !!",

})
  }
  let exSub1=await SubPlans.findById({_id: req.body.subId})
  const remainingDays = exSub1.noOfMonth * 30;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + remainingDays);


  const newSubscription = new Subscription({
    userId: req.body.userId,
    date: new Date(),
    subId: req.body.subId,
    remainingDays:remainingDays,
    expired:expirationDate
    
   

  });

  newSubscription.save()
    .then(data => {
      res.json({
        status: 200,
        message: "Subscription added successfully",
        data: data,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        err: err,
        status: 500,
      });
    });
}

const viewAllSubscriptions = (req, res) => {
  Subscription.find({paymentStatus:true})
    .populate('userId')
    .populate('subId')
    .exec()
    .then(subscriptions => {
      res.status(200).json({
        status: 200,
        message: "Subscriptions retrieved successfully",
        data: subscriptions,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: "Error retrieving subscriptions",
        error: err,
      });
    });
};

const deleteSubscriptionById = (req, res) => {
  Subscription.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(subscription => {
      res.json({
        status: 200,
        message: "Subscription deleted successfully",
        data: subscription,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error deleting subscription",
        error: err,
      });
    });
};

const addPayment = async (req, res) => {
  let user=await Subscription.findById(req.params.id)
  console.log("user",user);
 await Subscription.findByIdAndUpdate({ _id: req.params.id },
    {
    cardNo: req.body.cardNo,
    cardName: req.body.cardName,
    cvv: req.body.cvv,
    year: req.body.year,
    month: req.body.month,
    paymentStatus:true
    }
  )
    .exec()
    .then(subscription => {
      res.json({
        status: 200,
        message: "Subscription Payment details added successfully",
        data: subscription,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error in subscription",
        error: err,
      });
    });

    await userSchema.findByIdAndUpdate({ _id: user.userId },
      {
        paymentStatus:true
        
      }
    )
      .exec()
      .then(subscription => {
    console.log("updated userScema");
      })
      .catch(err => {
        console.error(err);
      
      });
};
const viewSubscriptionById = (req, res) => {
  Subscription.findById({ _id: req.params.id })
  .populate('userId')
  .populate('subId')
    .exec()
    .then(subscription => {
      res.json({
        status: 200,
        message: "Subscription retrieved successfully",
        data: subscription,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving subscription",
        error: err,
      });
    });
};

const viewSubscriptionsByUserId = async(req, res) => {
  let sub=await Subscription.findOne({userId:req.params.id})

  const currentDate = new Date();
  const expirationDate = new Date(sub.expired);
  const remainingDays = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24));
  await Subscription.findByIdAndUpdate({_id:sub._id},{remainingDays:remainingDays})


  Subscription.findOne({ userId: req.params.id ,paymentStatus:true})
  .populate('subId')
    .exec()
    .then(subscriptions => {
      res.json({
        status: 200,
        message: "Subscriptions retrieved successfully",
        data: subscriptions,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving subscriptions",
        error: err,
      });
    });
};

module.exports = {
  addSubscription,
  viewAllSubscriptions,
  viewSubscriptionById,
  deleteSubscriptionById,
  viewSubscriptionsByUserId,
  addPayment
};
