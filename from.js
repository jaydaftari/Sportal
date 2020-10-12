module.exports.form=function(req,res){
    
    console.log(req.query);                  //displays the query in the url.
    
    /* if session does not exist and initial query is empty */
    if( Object.keys(req.query).length===0 && !req.session.user_name){
    req.session.redirect_name="/fun";
    res.render('form/log',{c:0,redirect:req.session.redirect_name});
    }
    
    /* if session does not exist and incorrect enteries are selected. */
    else if(!req.session.user_name){
        if(req.query.class!=-1&&req.query.Bachelors!=-1||req.query.class!=-1&&req.query.Masters!=-1||req.query.Bachelors!=-1&&req.query.Masters!=-1){
            req.session.redirect_name="/fun";
            res.render('form/log',{c:1,redirect:req.session.redirect_name});       
        }    
    }
    
    /* if session exist and incorrect enteries are selected. */
    /* Object.keys(req.query).length  returns the length of the object in the query in url
    if session exist then redirection is towards fun1*/
    else if(Object.keys(req.query).length!=0 && req.session.user_name){
        console.log("inside else if ")
        if(req.query.class!=-1&&req.query.Bachelors!=-1||req.query.class!=-1&&req.query.Masters!=-1||req.query.Bachelors!=-1&&req.query.Masters!=-1){
            req.session.redirect_name="/fun1";
            res.render('form/log',{c:1,redirect:req.session.redirect_name});       
        }  
    }
     /* if session exist  */
    else if(Object.keys(req.query).length===0 && req.session.user_name){
            console.log("inside else if");
            req.session.redirect_name="/fun1";
            res.render('form/log',{c:0,redirect:req.session.redirect_name});
        }
    
}