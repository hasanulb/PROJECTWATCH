const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");

module.exports = {
  displayUser: () => {
    return new Promise(async (resolve, reject) => {
      let UserDetails = await db
        .get()
        .collection(collection.USER)
        .find()
        .toArray();
        console.log("wqww",UserDetails);
      resolve(UserDetails);
      
    });
  },

  blockUser:(userID)=>{
    console.log("qqqqq",userID);
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER).updateOne({_id:ObjectID(userID)},{
        $set:{
          state:'blocked'
        }
      }).then((response)=>{
        resolve(response)
      })
    })
  },

 
  unblockUser:(userID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER).updateOne({_id:ObjectID(userID)},{
        $set:{
          state:'active'
        }
      }).then((response)=>{
        resolve(response)
      })
    })
  }
};
