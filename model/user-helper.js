const { response } = require('express');
const { ObjectId, Collection } = require('mongodb');
const { resolve } = require('path');
const db = require('../config/connection');
const collection = require('../config/collection');
const bcrypt = require('bcrypt')

module.exports = {
    userDoLogin: (userdata) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            const user = await db.get().collection(collection.USER).findOne({ Email: userdata.Email })
            console.log("user is:", user);
            if (user) {
                if(user.state == 'active'){
                bcrypt.compare(userdata.Password, user.Password).then((status) => {
                    console.log(status);
                    console.log(user.Password);
                    console.log(userdata.Password);
                    if (status) {
                        console.log("login success");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("Password Wrong");
                        resolve({ status: false })
                    }
                })
            }else{
                resolve(response);
            }
            } else {
                console.log("There is no User");
                resolve({ status: false })
            }
        })
    },

    doSignup: (signupData) => {
        return new Promise(async (resolve, reject) => {
            signupData.Password = await bcrypt.hash(signupData.Password, 10)
            const checkuser = await db.get().collection(collection.USER).findOne({ Email: signupData.Email })
            if (checkuser) {
                console.log("user exists")
            } else {
                db.get().collection(collection.USER).insertOne(signupData).then((data) => {
                    resolve(data)
                })
            }
        })

    },
    viewproduct: (productId) => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT).find({state:'available'}).toArray()
            resolve(product)
        })
    },
    viewoneproduct: (productId) => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT).findOne({_id:ObjectId(productId)}).then((product)=>{
                resolve(product)
            })          
        })
    },


}