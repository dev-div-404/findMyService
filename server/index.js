import express from 'express';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv';


import connectDB from './db/connDB.js'
import UserModel from './db/UserModel.js'



const app = express()


app.use(cors({
    origin: 'http://localhost:3000',
    secure: false,
    credentials: true,
    methods: ['POST', 'GET']
}));

app.use(cookieParser())
app.use(bodyParser.json())

dotenv.config();
const port = process.env.PORT || 8080;

app.use(
    session({
    secret: 'helloworld',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 *60 * 24,
    },
    })
);



connectDB();

app.post('/usersignup', async (req, res)=>{
    const email = req.body.email;
    const phone = req.body.phone;

    var user = await UserModel.findOne({email : email});
    if(user)
    {
        res.status(201).json({ msg : 'email address already exist'});
        console.log('trying to create user with same email')
    }else{
        const user1 = await UserModel.findOne({phone : phone});
        if(user1){
            res.status(201).json({ msg : 'phone number already exist' });
            console.log('trying to create user with same phone')
        }else{
            UserModel.create(req.body).then((result) =>{
                console.log('one user created : '+req.body.name);
                res.status(200).json({msg : 'one user created'});
            }).catch(err =>{
                console.log(err);
            })
        }
    }
})

app.post('/userlogin', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    var user = await UserModel.findOne({email : email});
    if(!user)
    {
        res.status(201).json({ msg : 'no user found'});
    }else if(user.password !== password){
        res.status(201).json({ msg : 'incorrect passcode'});
    }else{
        req.session.useremail = email;
        req.session.username = user.name;
        res.status(200).json({ msg : 'logged in'});
        console.log(user.name+' user logged in');
    }
})

app.get('/getuser', (req,res)=>{
    if(req.session.username){
        res.status(200).json({loggedin : true, useremail : req.session.useremail, username : req.session.username});
    }else{
        res.status(201).json({loggedin : false});
    }
})

app.get('/userlogout', (req,res)=>{
    console.log(req.session.username + ' logging out')
    req.session.destroy();
    res.status(200).json({msg : 'logged out'})
})



app.listen(port, () => {
    console.log('server is listining on port '+port);
})