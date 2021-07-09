var express = require('express');
var cookieParser = require('cookie-parser')
var path = require('path')


const {OAuth2Client} = require('google-auth-library');



var app = express();

app.use(express.json());
app.use(cookieParser());


//set view engine
app.set("view engine","jade")





//set view engine
app.set("view engine","jade")

app.get('/', function (req, res) {

    res.render(path.join(__dirname+'/home'));

});
app.get('/login', function (req, res) {

    res.render(path.join(__dirname+'/login'));

});
app.post('/login', function (req, res) {
    var token = req.body.token;
    // console.log("token",token)
    var CLIENT_ID = '894744928663-3j9hvrq2eskq1911quo6ckmul4gd0c86.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
// console.log("payload",payload)
}
verify().then(()=>{
    res.cookie("session-token",token);
    res.send("success");
}).catch(err =>{
    res.redirect('/login');
});

    // res.render('C:/Users/Mother teresa/OneDrive/Desktop/BackEnd/login');

});

app.get('/dashboad',checking, function (req, res) {
   
    var user = req.user
    // console.log("dashboard",user)
    res.send("Hello " + user.name + ", Thank you for subcribing. You email is " + user.email)
    // res.render('C:/Users/Mother teresa/OneDrive/Desktop/BackEnd/dashbord',{user});
  

});
function checking(req,res,next){
    // console.log(req)
var token = req.cookies['session-token'];
// console.log("token",token)
var user = {}
var CLIENT_ID = '894744928663-3j9hvrq2eskq1911quo6ckmul4gd0c86.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
const ticket = await client.verifyIdToken({
  idToken: token,
  audience: CLIENT_ID,  
});
const payload = ticket.getPayload();
user.name =payload.name;
user.email = payload.email;
// console.log(user)
}
verify().then(()=>{
    // console.log("req",user)
    // console.log(req,'req.user ')
req.user = user;
// console.log(req.user,'req.user ')
next();
}).catch(err => {
    res.redirect('/login')
});
}
app.get('/logout', function (req, res) {
   
    res.clearCookie('session-token');
    res.redirect('/login')
    // res.render('C:/Users/Mother teresa/OneDrive/Desktop/BackEnd/dashbord',{user});
  

});

app.listen(6060);



