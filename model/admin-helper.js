const bcrypt = require('bcrypt');
const { response } = require('express');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');
const db = require('../config/connection');
const collection = require('../config/collection');


module.exports = {
    adminDoLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}
            // console.log(adminData);
            let admin = await db.get().collection(collection.ADMIN_CREDENTIALS).findOne({ Name: adminData.Name })
            if (admin) {
                // compare(adminData.password,admin.password).then((status)=>{
                if (adminData.pass == admin.Password) {
                    console.log("login success");
                    response.admin = admin
                    response.status = true
                    resolve(response)
                } else {
                    console.log("login failed")
                    resolve({ status: false })
                }
                // })
            } else {
                console.log("login not success")
                resolve({ status: false })
            }
        })
    },
    showUser: () => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection('user').find().toArray()
            resolve(user)
        })
    }
}