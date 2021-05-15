const express = require('express');
const router = express.Router();

const nodemailer = require("nodemailer");

//const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

const webToken = require('jsonwebtoken');
const { Router } = require('express');
const models = require('../models');

require('dotenv').config();

//register API

router.post('/register', (req, res) => {
    const { prenom, nom, age, adresse, password, email, role, telephone } = req.body;

    if (prenom == undefined || prenom == '' ||nom == undefined || nom == '' || password == undefined || password == '' || email == undefined || email == ''|| age == undefined || age == '' || adresse == undefined || adresse == ''|| telephone == undefined || telephone == '') {
        res.status(401).json({
            message: "fill all field",
            status: res.statusCode
        })
    } else {
        //verifier si le mail existe
        models.Utilisateur.findOne({
            attributes: ["email"],
            where: {
                email
            }
        }).then((value) => {
            if (value === null) {
                //if not found create a new record i db with hashed password
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, (err, hash) => {
                        //create record
                        models.Utilisateur.create({
                            prenom: prenom,
                            nom: nom,
                            age: age,
                            adresse: adresse,
                            email: email,
                            telephone: telephone,
                            role: role,
                            password: hash
                        }).then((value) => {
                            res.status(201).json({
                                message: "Account has created succefully",
                                status: res.statusCode
                            })
                        }).catch(err => res.status(404).json({
                            message: "something went wront"
                        }))
                    })
                })
            } else {
                res.status(401).json({
                    message: "email already taken",
                    status: res.statusCode
                })
            }
        })

         // send mail 
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                service : 'gmail',
                auth: {
                user: process.env.ACCOUNT, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
                },
            });
          // send mail with defined transport object
            let mailOption = {
                from: 'mossanguette@gmail.com', // sender address
                to: "assane.thiaw9@gmail.com", // list of receivers
                subject: "Gestion d'utilisateur ✔", // Subject line
                text: "Bonjour votre mot de passe est "+password // plain text body
            };

            transporter.sendMail(mailOption, (err, data)=>{
                if(err){
                    console.log('error', err)
                }else{
                    console.log("mail sent !!!")
                }
            })
    }
})

// router login
router.post('/login',(req,res)=>{
    data = req.body
    console.log(data)

    const { email, password } = data;
    
    if (password == undefined || password == '' || email == undefined || email == '') {
        res.status(401).json({
            message: "fill all field",
            status: res.statusCode
        })
    } else {
        //verifier si le mail existe
        models.Utilisateur.findOne({
            where: {
                email
            }
        }).then((value) => {
            //if mail not found ask user to register
            if (value === null) {
                res.status(401).json({
                    message:"Email is not register please please singUp",
                    status: res.statusCode,
                    token:''
                })
            } else {

                //if mail is there, check the password is correct or not
                const dbPassword = value.getDataValue('password');
                bcrypt.compare(password,dbPassword,(err, resultat)=>{
                    if(resultat){
                        //if password is correct sent json webtoken

                        const userDetail={
                            id: value.getDataValue('id'),
                            username: value.getDataValue('username'),
                            nom: value.getDataValue('nom'),
                            prenom: value.getDataValue('prenom'),
                            email: value.getDataValue('email'),
                            age: value.getDataValue('age'),
                            adresse: value.getDataValue('adresse'),
                            telephone: value.getDataValue('telephone')
                        }
                        const token=webToken.sign(userDetail, process.env.secret_key,{
                            expiresIn:"60s"
                        })

                        res.status(200).json({
                            message: "Logged in succeffully",
                            status: res.statusCode,
                            userDetail: userDetail,
                            token

                        })
                    }else{
                        //if password not match sent error message
                        res.status(203).json({
                            message: "Invalid crendential given",
                            status: res.statusCode,
                            token:''
                        })

                    }
                })
            }
        })
    }
})

//get user profile
router.get('/profile',(req,res)=>{
    const authHeader = req.headers['authorization'];
    if(authHeader){
        //web token
        const token =authHeader.substr('bearer'.length,+1);
        webToken.verify(token, process.env.secret_key,(err, user)=>{
            if(user){
                res.status(200).json({
                    message: "success",
                    status: res.statusCode,
                    data:user
                })
            }
            else{
                res.status(401).json({
                    message: "please login",
                    status: res.statusCode,
                    token:''
                })
            }
        })
        
    }
})

// get user
router.get('/getUser', (req,res)=>{

   const users= models.Utilisateur.findAll().then((users)=>{
    res.status(200).json({
        users
    })
   })
   
   //console.log(users)
   
})
//info user
router.post('/info', (req,res)=>{
    id =req.body.info
    console.log('info')
    console.log(id)
    models.Utilisateur.findOne({
        where: {
            id
        }
    }).then((data)=>{
        res.status(200).json({
            data
        })
    })
 })




// detail
router.post('/detail',(req,res)=>{
    dataId = req.body
    id= dataId.value
    console.log(req.body)
    models.Utilisateur.findOne({
        where: {
            id
        }
    }).then((value) => {
        //data
            res.status(200).json({
                data: userDetail={
                    id: value.getDataValue('id'),
                    username: value.getDataValue('username'),
                    nom: value.getDataValue('nom'),
                    prenom: value.getDataValue('prenom'),
                    email: value.getDataValue('email'),
                    age: value.getDataValue('age'),
                    adresse: value.getDataValue('adresse'),
                    telephone: value.getDataValue('telephone')
                }
            })
    })
    

})


// mot de passe oublié
router.post('/oublier',(req,res)=>{
    const { email, telephone } = req.body;
console.log(email)
    if (telephone == undefined || telephone == '' || email == undefined || email == '') {
        res.status(401).json({
            message: "fill all field",
            status: res.statusCode
        })
    } else {
        //verifier si le mail existe
        models.Utilisateur.findOne({
            where: {
                email
            }
        }).then((value) => {
            //if mail not found ask user to register
            if (value === null) {
                res.status(401).json({
                    message:"Email is not register please please singUp",
                    status: res.statusCode,
                    token:''
                })
            } else {
                //if mail is there, check the password is correct or not
                const dbPassword = value.getDataValue('password');
                const salt = bcrypt.genSaltSync(dbPassword);
                console.log(dbPassword)   
            }
        })
    }
})


module.exports = router