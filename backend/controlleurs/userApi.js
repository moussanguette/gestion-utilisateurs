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
    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const { prenom, nom, pseudo, adresse, email, role, telephone } = req.body;
    //La variable contient un nombre aléatoire compris entre 1 et 1000
    const password = nom + entierAleatoire(1, 1000);
    console.log(req.body)
    if (prenom == undefined || prenom == '' || nom == undefined || nom == '' || pseudo == undefined || pseudo == '' || password == undefined || password == '' || email == undefined || email == '' || adresse == undefined || adresse == '' || telephone == undefined || telephone == '') {
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
                            pseudo: pseudo,
                            adresse: adresse,
                            email: email,
                            telephone: telephone,
                            role: role,
                            password: hash
                        }).then((value) => {
                            res.status(201).json({
                                message: "Account has created succefully",
                                status: res.statusCode
                            }),
                                    // send mail 
        // create reusable transporter object using the default SMTP transport
         transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ACCOUNT, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let mailOption = {
            from: 'mossanguette@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Gestion d'utilisateur ✔", // Subject line
            text: "Bonjour votre mot de passe est " + password // plain text body
        };

        transporter.sendMail(mailOption, (err, data) => {
            if (err) {
                console.log('error', err)
            } else {
                console.log("mail sent !!!",email)
            }
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


    }
})

// router login
router.post('/login', (req, res) => {
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
                    message: "Email is not register please please singUp",
                    status: res.statusCode,
                    token: ''
                })
            } else {

                //if mail is there, check the password is correct or not
                const dbPassword = value.getDataValue('password');
                bcrypt.compare(password, dbPassword, (err, resultat) => {
                    if (resultat) {
                        //if password is correct sent json webtoken

                        const userDetail = {
                            id: value.getDataValue('id'),
                            username: value.getDataValue('username'),
                            nom: value.getDataValue('nom'),
                            prenom: value.getDataValue('prenom'),
                            email: value.getDataValue('email'),
                            pseudo: value.getDataValue('pseudo'),
                            role: value.getDataValue('role'),
                            adresse: value.getDataValue('adresse'),
                            telephone: value.getDataValue('telephone')
                        }
                        const token = webToken.sign(userDetail, process.env.secret_key, {
                            expiresIn: "60s"
                        })

                        res.status(200).json({
                            message: "Logged in succeffully",
                            status: res.statusCode,
                            userDetail: userDetail,
                            token

                        })
                    } else {
                        //if password not match sent error message
                        res.status(203).json({
                            message: "Invalid crendential given",
                            status: res.statusCode,
                            token: ''
                        })

                    }
                })
            }
        })
    }
})

// supprimer utilisateur
router.post('/supprimer', (req, res) => {
    id = req.body.delId
    models.Utilisateur.destroy({
        where: {
            id
        }
    }).then(()=>{
        res.status(200).json({
            message : "suppression effectuée "
        })
    })
})

// mot de passe oublier
router.post('/oublier', (req, res) => {
    var email
    var user
    email = req.body.data
    console.log(email)
    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
     var password = 'user' + entierAleatoire(1, 100000);
     console.log(password)
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, (err, hash) => {
            //create record
            models.Utilisateur.update(
                {
                    password: hash
                },
               { where: { email }}
            )
         // send mail 
        // create reusable transporter object using the default SMTP transport
         transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ACCOUNT, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let mailOption = {
            from: 'mossanguette@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Gestion d'utilisateur ✔", // Subject line
            text: "Bonjour votre mot de passe a été modifié. Le nouveau mot de passe est : " + password // plain text body
        };

        transporter.sendMail(mailOption, (err, data) => {
            if (err) {
                console.log('error', err)
            } else {
                console.log("mail sent !!!",email)
            }
        })
 
        })
    })
    res.status(200).json({
        message: "mot de passe renouvelé avec succes",
        status: res.statusCode
    })

    /* models.Utilisateur.update(
        {
         "name":'sam',
        "city":'USA'
        },
       { where:
            { id }
        }
    ) */
})


//get user profile
router.get('/profile', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        //web token
        const token = authHeader.substr('bearer'.length, +1);
        webToken.verify(token, process.env.secret_key, (err, user) => {
            if (user) {
                res.status(200).json({
                    message: "success",
                    status: res.statusCode,
                    data: user
                })
            }
            else {
                res.status(401).json({
                    message: "please login",
                    status: res.statusCode,
                    token: ''
                })
            }
        })

    }
})

// get user
router.get('/getUser', (req, res) => {

    const users = models.Utilisateur.findAll().then((users) => {
        res.status(200).json({
            users
        })
    })

    //console.log(users)

})
//info user
router.post('/info', (req, res) => {
    id = req.body.info
    console.log('info')
    console.log(id)
    models.Utilisateur.findOne({
        where: {
            id
        }
    }).then((data) => {
        res.status(200).json({
            data
        })
    })
})




// detail
router.post('/detail', (req, res) => {
    dataId = req.body
    id = dataId.value
    console.log(req.body)
    models.Utilisateur.findOne({
        where: {
            id
        }
    }).then((value) => {
        //data
        res.status(200).json({
            data: userDetail = {
                id: value.getDataValue('id'),
                username: value.getDataValue('username'),
                nom: value.getDataValue('nom'),
                prenom: value.getDataValue('prenom'),
                email: value.getDataValue('email'),
                role: value.getDataValue('role'),
                adresse: value.getDataValue('adresse'),
                telephone: value.getDataValue('telephone')
            }
        })
    })


})



//modifier
router.post('/modifier', (req, res) => {
    var email
    var user
    data = req.body.data
    console.log(data)
/*     function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
     var password = 'user' + entierAleatoire(1, 100000);
     console.log(password)
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, (err, hash) => {
            //create record
            models.Utilisateur.update(
                {
                    password: hash
                },
               { where: { email }}
            )
         // send mail 
        // create reusable transporter object using the default SMTP transport
         transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ACCOUNT, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let mailOption = {
            from: 'mossanguette@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Gestion d'utilisateur ✔", // Subject line
            text: "Bonjour votre mot de passe a été modifié. Le nouveau mot de passe est : " + password // plain text body
        };

        transporter.sendMail(mailOption, (err, data) => {
            if (err) {
                console.log('error', err)
            } else {
                console.log("mail sent !!!",email)
            }
        })
 
        })
    })
    res.status(200).json({
        message: "mot de passe renouvelé avec succes",
        status: res.statusCode
    }) */
})


module.exports = router