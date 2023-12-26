import express from 'express';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv';


import connectDB from './db/connDB.js'
import UserModel from './db/UserModel.js'
import JobModel from './db/JobModel.js';
import ProfModel from './db/ProfModel.js';
import OfferModel from './db/OfferModel.js';
import NotificationModel from './db/ProfNotificationSchema.js';



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

app.post('/profsignup', async (req, res)=>{
    const email = req.body.email;
    const phone = req.body.phone;

    var user = await ProfModel.findOne({email : email});
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
            ProfModel.create(req.body).then((result) =>{
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

app.post('/proflogin', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    var user = await ProfModel.findOne({email : email});
    if(!user)
    {
        res.status(201).json({ msg : 'no user found'});
    }else if(user.password !== password){
        res.status(201).json({ msg : 'incorrect passcode'});
    }else{
        req.session.profemail = email;
        req.session.profname = user.name;
        res.status(200).json({ msg : 'logged in'});
        console.log(user.name+' professional logged in');
    }
})

app.get('/getuser', (req,res)=>{
    if(req.session.username){
        res.status(200).json({loggedin : true, useremail : req.session.useremail, username : req.session.username});
    }else{
        res.status(201).json({loggedin : false});
    }
})

app.get('/getprof', (req,res)=>{
    if(req.session.profemail){
        res.status(200).json({loggedin : true, profemail : req.session.profemail, profname : req.session.profname});
    }else{
        res.status(201).json({loggedin : false});
    }
})

app.get('/userlogout', (req,res)=>{
    console.log(req.session.username + ' logging out')
    req.session.useremail = null;
    req.session.username = null;
    res.status(200).json({msg : 'logged out'})
})

app.get('/proflogout', (req,res)=>{
    console.log(req.session.profname + ' logging out')
    req.session.profemail = null;
    req.session.profname = null;
    res.status(200).json({msg : 'logged out'})
})

app.post('/addnewjob', async (req, res)=>{
    if(req.session.useremail){
        await JobModel.create({
            ...req.body,
            postdate : new Date().toISOString().split('T')[0],
            active : true,
            useremail : req.session.useremail
        }).then(async(result) =>{
            const profs = await ProfModel.find({zip : req.body.zip , jobtype : req.body.jobtype}).exec();

            const username = req.session.username;
            const text = `A new job is posted by ${username} near you`;
            const link = `${result._id}`;
            
            profs.map((prof)=>{
                let profemail = prof.email;
                NotificationModel.create({
                    profemail : profemail,
                    text : text,
                    link : link,
                    date : new Date().toISOString()
                });
            })

            res.status(200).json({created : true});
        }).catch(err => console.log(err));
    }else{
        res.status(200).json({created : false});
    }
})

app.get('/getuserjob', async(req,res)=>{
    const useremail = req.session.useremail;
    const jobs = await JobModel.find({useremail : useremail}).exec();
    res.status(200).json({jobs : jobs, success : true})
})


app.get('/getnearbyjobs', async(req,res)=>{
    if(req.session.profemail){
        const useremail = req.session.profemail;
        const user = await ProfModel.findOne({email : useremail});
        const zipcode = user.zip;
        const jobs = await JobModel.find({zip : zipcode, active : true, jobtype : user.jobtype}).exec();
        res.status(200).json({jobs : jobs, success : true})
    }else{
        res.status(200).json({success : false})
    }
})


app.get('/getprofnotification', async(req,res)=>{
    if(req.session.profemail){
        const profemail = req.session.profemail;
        const notifications = await NotificationModel.find({profemail : profemail}).sort({date : -1}).exec();
        res.status(200).json({success : true, notifications : notifications});
    }else{
        res.status(200).json({success : false});
    }
})

app.get('/getusernotification', async(req,res)=>{
    if(req.session.useremail){
        const profemail = req.session.useremail;
        const notifications = await NotificationModel.find({profemail : profemail}).sort({date : -1}).exec();
        res.status(200).json({success : true, notifications : notifications});
    }else{
        res.status(200).json({success : false});
    }
})


app.post('/getjobdetails', async (req, res)=>{
    try {
    const jobId = req.body.jobid;
    const jobinfo = await JobModel.findOne({ _id: jobId });

    if (jobinfo && req.session.useremail === jobinfo.useremail) {
        res.status(200).json({ validid: true, info: jobinfo });
    } else {
        res.status(200).json({ validid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/postoffer', async (req, res)=>{
    try {
        const profid = req.session.profemail;
        const prof = await ProfModel.findOne({email : profid});
        OfferModel.create({...req.body, profid : profid, profname : prof.name});

        //send notification

        const email = req.body.useremail;
        const text = `You Got A new Offer for ${req.body.jobtitle}. Click to see !`
        const link = `${req.body.jobid}`

        NotificationModel.create({
            profemail : email,
            text : text,
            link : link,
            date : new Date().toISOString()
        });

        res.status(200).json({msg : 'offfered', success : true});
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: 'Internal Server Error' }).json({msg : 'could not offer'});
    }
})


app.post('/getolderoffer', async (req, res)=>{
    try {
        const profid = req.session.profemail;
        const offer = await OfferModel.findOne({profid : profid, jobid : req.body.jobid , accepted : true});
        const otheroffer = await OfferModel.findOne({jobid : req.body.jobid , accepted : true});
        if(offer){
            res.status(200).json({exists : true, offer : offer});
        }else if(otheroffer){
            res.status(200).json({exists : false, otherofferstatus : true});
        }else{
            res.status(200).json({exists : false});
        }
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: 'Internal Server Error' }).json({msg : 'could not process'});
    }
})



app.post('/getoffer', async (req, res)=>{
    try {
        const acceptedOffer = await OfferModel.findOne({jobid : req.body.jobid , accepted : true});
        const offers = await OfferModel.find({jobid : req.body.jobid}).exec();
        res.status(200).json({validid : true , offers : offers, acceptedOffer : acceptedOffer});
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: 'Internal Server Error' }).json({validid : false,msg : 'could not offer'});
    }
})

app.post('/acceptoffer', async (req, res)=>{
    try {
        const offerid = req.body.offerid;
        await OfferModel.updateOne({_id : offerid},{$set : {accepted : true}})

        //sending notification
        const offer = await OfferModel.findOne({_id : offerid});
        const profid = offer.profid;
        const text = `Your offer got accepted !! click to check`;
        const link = `${offer.jobid}`;
        NotificationModel.create({
            profemail : profid,
            text : text,
            link : link,
            date : new Date().toISOString()
        });
        
        res.status(200).json({msg : 'Accepted', success : true});
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: 'Internal Server Error' }).json({msg : 'could not offer'});
    }
})


app.post('/getjobdetailsprof', async (req, res)=>{
    try {
        const jobId = req.body.jobid;
        const jobinfo = await JobModel.findOne({ _id: jobId });

        if (jobinfo && req.session.profemail) {
            res.status(200).json({ validid: true, info: jobinfo });
        } else {
            res.status(200).json({ validid: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/closeJob', async (req, res)=>{
    const jobId = req.body.jobid;
    await JobModel.updateOne({_id : jobId},{$set : {active : false}})
    res.status(200).json({status : true})
})


app.listen(port, () => {
    console.log('server is listining on port '+port);
})