
var url=require('url');
module.exports.login=function(req,res){
        var uname=req.body.username;
        console.log("uname=",uname);


        var password=req.body.password;

        console.log("password=", password);
        var sql="select * from aut where uname=? and password=?";

        connection.query(sql,[uname,password],function(err,row,fields){
                if(err)
                console.log(err);
                else if (row.length>0)
                {
                        console.log("row=",row.length);
                        console.log('login');
                        req.session.user_name=uname;
                        req.session.success=1;
                        console.log("req.session.user_name=",req.session.user_name);
                        if(!req.session.getHomePage&&!req.session.Home){
                                res.redirect(url.format({
                                pathname:'/form/log.ejs'
                                }))
                        }
                         
                        else if(req.session.Home&&!req.session.getHomePage){
                                res.redirect(url.format({
                                        pathname:'/'
                                        }))
                        }
                        else{
                                res.redirect(url.format({
                                pathname:'/'
                        })) 
                }
        }
        else if(row.length===0){
                console.log("invalid crediantals");
                req.session.success=-1;
                res.redirect(url.format({
                    pathname:'/signin.ejs'
                }));
        }

});
};