const User=require('../User/userSchema')

  const secret = 'User'; // Replace this with your own secret key
const jwt=require('jsonwebtoken')

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-"; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename =
      uniquePrefix +
      originalname.substring(0, originalname.lastIndexOf(".")) +
      "-" +
      Date.now() +
      "." +
      extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("img");

const registerUser = async (req, res) => {
    try {
         const { name,dob,gender,contact, email,password,state, nationality, pincode } = req.body;

        const newUser = new User({
            name,
            contact,
            email,
            dob,
            password,
            state,
            nationality,
            pincode,
            gender,
            img:req.file
        });

        let existingUser1 = await User.findOne({ email });
        if (existingUser1) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        let existingUser = await User.findOne({ contact });
        if (existingUser) {
            return res.json({
                status: 409,
                msg: "contact Number Already Registered With Us !!",
                data: null
            });
        }
        await newUser.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// View all Users
const viewUsers = (req, res) => {
    User.find()
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

const editUserById = async (req, res) => {
    let flag = 0;
    const { name, dob, gender, contact, email, state, nationality, pincode } = req.body;
  
    try {
      // Check if contact number already exists
      let existingUser = await User.find({ contact });
      let userData = await User.findById(req.params.id);
       // Check if contact belongs to another 
       if (userData.contact!==req.body.contact)
    existingUser.map(x => {
      console.log("cont",x.contact,req.body.contact);
      
            if(x.contact == req.body.contact) {
          flag = 1;
        }
      });
  
      if (flag === 0) {
        // Update user data
        userData.name = name;
        userData.contact = contact;
        userData.email = email;
        userData.dob = dob;
        userData.state = state;
        userData.nationality = nationality;
        userData.pincode = pincode;
        userData.gender = gender;
        userData.img = req.file;
        
        // Save updated user document
        await userData.save();
  
        res.json({
          status: 200,
          msg: "Updated successfully"
        });
      } else {
        res.status(409).json({
          status: 409,
          msg: "Contact Number Already Registered With Us !!",
          data: null
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      });
    }
  };


  
const addUserPreferences = async (req, res) => {
    const { preferredLanguages,preferredGenre } = req.body;
    let userData = await User.findById(req.params.id);

    try {
        if(!preferredGenre&&!preferredLanguages){
            return  res.json({
                status: 200,
                msg: "No Data Given for preferences"
              });
         }
    
     if(preferredLanguages && preferredLanguages.length>0){
        userData.preferredLanguages=preferredLanguages;

     } else if(preferredGenre&&preferredGenre.length>0){
        userData.preferredGenre=preferredGenre;

     }

  
        // Save updated user document
        await userData.save();
  
        res.json({
          status: 200,
          msg: "Updated successfully"
        });
    
    } catch (err) {
        console.log(err);
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      });
    }
  };

// View User by ID
const viewUserById = (req, res) => {
    User.findById({ _id: req.params.id })
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

// Delete User by ID
const deleteUserById = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
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

// Forgot Password for User
const forgotPassword = (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
                });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};

// Reset Password for User
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await User.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await User.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.newpassword
        })
            .exec()
            .then(data => {
                if (data != null)
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
  };
  
  const login = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email }).then(user => {
     
  
      if (!user) {
        return res.json({status:405,msg: 'User not found' });
      }
  
        if (user.password!=password) {
          return res.json({ status:405,msg: 'Password Mismatch !!' });
        }
  
      
        const token = createToken(user);
  
        res.json({
            status:200,
            data:user, 
            token });
     
    }).catch(err=>{
     console.log(err);
            return res.json({status:500,msg: 'Something went wrong' });
          
    })
  };
     
  //validate
  
  const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    console.log("t1",token);
    console.log("secret",secret);
    if (!token) {
      return res.json({status:401,msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.json({status:401, messagge: 'Unauthorized' ,err:err});
      }
  
      req.user = decodedToken.userId;
      next();
      return res.json({ status:200,msg: 'ok' ,user:decodedToken.userId});
    });
    console.log(req.user);
  };
  
  //Login Custome --finished

// Search for users by name
const searchUserByName = async (req, res) => {
    const { name } = req.params;

 

    try {
        const users = await User.find({ name: new RegExp(name, 'i') });

        if (users.length > 0) {
            return res.json({
                status: 200,
                msg: 'Users found successfully',
                data: users
            });
        } else {
            return res.json({
                status: 404,
                msg: 'No users found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            msg: 'Error searching for users',
            error: error.message
        });
    }
};



module.exports = {
    registerUser,
    viewUsers,
    editUserById,
    viewUserById,
    deleteUserById,
    forgotPassword,
    resetPassword,
    login,
    requireAuth,
    upload,
    addUserPreferences,
    searchUserByName
};
