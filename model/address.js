const db = require("../config/connection")
const collection = require("../config/collection")
const { ObjectID } = require("bson");

module.exports = {
    addAddress:(details,userId)=>{
        let addObj = {
            name:details.name,
            mobile:details.mobile,
            country:details.country,
            state:details.state,
            address:details.address,
            pincode:details.pincode,
        }
        return new Promise(async(resolve,reject)=>{
            let userAddress = await db.get().collection(collection.ADDRESS).findOne({user:ObjectID(userId)})
            if(userAddress){
                db.get().collection(collection.ADDRESS).updateOne({user:ObjectID(userId)},
                {
                    $push:{details:addObj}
                }
                ).then((response)=>{
                    resolve()
                })
            }else{
                let addressObj = {
                    user:ObjectID(userId),
                    details:[addObj]
                }
                db.get().collection(collection.ADDRESS).insertOne(addressObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    showAddress:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            const address = db.get().collection(collection.ADDRESS).findOne({user:ObjectID(userId)})
            resolve(address)
        })
    }
}