//queries in the database
var url=require('url');
module.exports.search = function(req,res){
    
    if(req.session.user_name){
    
      var sql_search="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where SCHOLORSHIP_NAME=?" ;
      console.log("req.body.Bachelors=",req.body.Search);
      connection.query(sql_search,[req.body.Search],function(err,row,fields){
      if(err)
        console.error(err);
      else if(row.length>0){
        console.log(row[0].ID_NO);
        res.redirect('/a/'+row[0].ID_NO)
      }
      
  
      });  
    }

  else
  { 
    req.session.Home=true;
    res.redirect('/signin.ejs');


  }
  
}