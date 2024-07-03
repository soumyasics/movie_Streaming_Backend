const userSchema = require('../userSchema');
const Subscription = require('./userSubSchema');

const addSubscription = (req, res) => {
  const newSubscription = new Subscription({
    userId: req.body.userId,
    date: new Date(),
    subId: req.body.subId,
    
   

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
  Subscription.find()
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

    await userSchema.findByIdAndUpdate({ _id: user._Id },
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

const viewSubscriptionsByUserId = (req, res) => {
  Subscription.find({ userId: req.params.id })
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
