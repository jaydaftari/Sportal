//require the connection from database
var connection =require('./connfig.js');                      /* connection with sportal */
var bodyparser= require('body-parser');                       /* middleware for static files */
var express=require('express');             
var app=express();
var queries=require('./views/scholorships/queries/1.js');      /* queries in the database */
var queries2=require('./views/scholorships/queries/2.js')
var form=require('./from.js');
var signup=require('./views/signup.js');
var login=require('./views/login.js') ;                         /* login authetication */
var session=require('express-session');
var validator=require('express-validator');
var url=require('url');


/* sets the view engine to ejs */
app.set('view engine','ejs');

/* middleware for static files */
app.use('/public',express.static('public'));

/* middleware for creating sessions */
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

/* middleware for .... */
var urlencodedParser = bodyparser.urlencoded({ extended: false });

/* middleware for validating form */
app.use(validator());

/* render the main homepage .... */
app.get('/',function(req,res){
    req.session.success=undefined;
    res.render('homepage/index1');
});

/* handles get request of logout and renders the homepage */
app.get('/l',function(req,res){
    req.session.destroy();                          /* destroy the sessions created*/
    res.render('homepage/index1');
});

/* render the aboutus page .... */
app.get('/about.ejs',function(req,res){
    if(req.session.user_name)
    res.render('scholorships/about1.ejs');
    else
    res.render('scholorships/about.ejs');
});


/* render the contactus page .... */
app.get('/contact.ejs',function(req,res){
    if(req.session.user_name)
    res.render('scholorships/contactus1');
    else
    res.render('scholorships/contactus');
});


/* render the supportus page .... */
app.get('/supportus.ejs',function(req,res){
    res.render('scholorships/supportus');
});


/* render the  top ten university page .. */
app.get('/topten',function(req,res){
    res.render('scholorships/topten.ejs')
})

/* handles get request to display the form */
app.get('/form/log.ejs',form.form);


/* handles get request to display the search for scholorship page */
app.get('/search/scholorship',function(req,res){
    if(req.session.user_name)
    res.render('searchpage.ejs')
    else{
        /* to render homepage in signup.js */
        req.session.getHomePage=true;  
        res.render('LOGIN/signin',{exist:0,errors:req.session.errors,success:req.session.success})
    }
});


/* handles get request to display the signin page */
app.get('/signin.ejs',function(req,res){
    if(!req.session.user_name)
    {
    console.log(req.session.success);
    console.log(req.session.errors);
    res.render('LOGIN/signin',{exist:0,errors:req.session.errors,success:req.session.success})

    }
    else
    res.render('form/log',{c:0});
});


app.get('/login',function(req,res){
    res.render('scholorships/72')
});


/* handles get request to display the scholorships page */
app.get('/a/:sid',function(req,res){
    res.render('scholorships/'+req.params.sid);
    });

/* handles post request for the query in form */
app.post('/fun',urlencodedParser ,queries.resultS);

//app.post('/fun',urlencodedParser ,queries2.resultS);
app.post('/fun1',urlencodedParser ,queries.resultS);

/* handles post request for login  */
app.post('/login',urlencodedParser,login.login);

/* handles post request for search  */
app.post('/search',urlencodedParser,queries2.search);

/* handles post request for signup  */
app.post('/signup',urlencodedParser,signup.signup);

app.listen(3000,()=>{
    console.log('listening');
});
