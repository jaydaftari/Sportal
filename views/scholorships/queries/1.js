//queries in the database
var url=require('url');
module.exports.resultS = function(req,res){
    var sql_class='select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.schooling where class=?)';
    var sql_bachelors="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.graduations where STREAM=?)";
    var sql_masters="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in(select ID_NO from sportal.post_graduations where stream=?)"; 

    var sql_gender="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.gender where gender=?)";
    var sql_gender_class="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.gender where gender=? and ID_NO in(select ID_NO from sportal.schooling where class=? ))";
    var sql_gender_bachelors="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.gender where gender=? and ID_NO in(select ID_NO from sportal.graduations where stream=? ))";   
    var sql_gender_masters="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.gender where gender=? and ID_NO in(select ID_NO from sportal.post_graduations where stream=? ))";   
   
    var sql_caste="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=?)";
    var sql_caste_class="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in(select ID_NO from sportal.schooling where class=? ))";
    var sql_caste_bachelors="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in(select ID_NO from sportal.graduations where stream=? ))";  
    var sql_caste_masters="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in(select ID_NO from sportal.post_graduations where stream=? ))";   
    
    var sql_caste_gender="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in (select ID_NO from sportal.gender where gender=?))";
    var sql_caste_gender_class="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in(select ID_NO from sportal.gender where gender=? and ID_NO in (select ID_NO from sportal.schooling where class=?)))";
    var sql_caste_gender_bachelors="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in(select ID_NO from sportal.gender where gender=? and ID_NO in (select ID_NO from sportal.graduations where stream=? )))";
    var sql_caste_gender_masters="select SCHOLORSHIP_NAME,ID_NO from sportal.scholorship where ID_NO in (select ID_NO from sportal.caste where caste=? and ID_NO in(select ID_NO from sportal.gender where gender=? and ID_NO in (select ID_NO from sportal.post_graduations where stream=? )))";

    var classs=req.body.Class;
    var bach=req.body.Bachelors;
    var masters=req.body.Masters; 
    var gender= req.body.Gender; 
    var caste=req.body.Caste;



/****  query to fetch scholorship for selected bachelors degree only   ****/  
    
    
    /* sets the stream  */
  if(bach!=-1&&classs==-1&&masters==-1&&gender==-1&&caste==-1 ){
      if(bach==="Bsc" || bach ==="B-tech") {
      var stream='science';
    }
    else if(bach==="Be.com" ) {
      var stream='commerce';
    }
    else if(bach==="Bba" ) {
      var stream='arts';
    }
    
    /* search  */
    connection.query(sql_bachelors,[stream],function(err,row,fields){
      if(err)
      console.error(err);
      else{  
        if(req.session.redirect_name==="/fun")        
       res.render('fun',{data:row});
       else
       res.render('fun1',{data:row});
      } 
    }); 
  }

/* query to fetch scholorship for selected class only*/
  else if(classs!=-1&&bach==-1&&masters==-1&&gender==-1&&caste==-1){
    connection.query(sql_class,[classs],function(err,row,fields){
      if(err)
        console.error(err);
      else{
          if(req.session.redirect_name==="/fun")  
            res.render('fun',{data:row});
          else
            res.render('fun1',{data:row});
        }
      });
  }

/* query to fetch scholorship for selected masters degree only*/
  else if(masters!=-1&&classs==-1&&bach==-1&&gender==-1&&caste==-1 ){

    if(masters==="Msc" || masters ==="M-tech") {
      var stream='science';
    }
    else if(masters==="M.com" ) {
      var stream='commerce';
    }
    else if(masters==="Mba" ) {
      var stream='arts';
    }
    
    connection.query(sql_masters,[stream],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

/* query to fetch scholorship for selected class and gender only*/
  else if(classs!=-1&&masters==-1&&bach==-1&&gender!=-1&&caste==-1){
    console.log("gettting in ",gender);
    if(gender==="Male"){
      var gen='M';
      console.log(gen);
    }
    else if(gender==="Female"){
      var gen='F';
      console.log(gen);
    }
    connection.query(sql_gender_class,[gen,classs],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

/* query to fetch scholorship for bachelors degree and gender only*/
  else if(classs==-1&&masters==-1&&bach!=-1&&gender!=-1&&caste==-1 ){
    console.log("gettting in ",gender);
    if(gender==="Male"){
      var gen='M';
      console.log(gen);
    }
    else if(gender==="Female"){
      var gen='F';
      console.log(gen);
    }
    if(bach==="Bsc" || bach ==="B-tech") {
      var stream='science';
    }
    else if(bach==="Be.com" ) {
      var stream='commerce';
    }
    else if(bach==="Bba" ) {
      var stream='arts';
    }
    connection.query(sql_gender_bachelors,[gen,stream],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

/* query to fetch scholorship for masters degree and gender only*/
else if(classs==-1&&masters!=-1&&bach==-1&&gender!=-1&&caste==-1 ){
  console.log("gettting in ",gender);
  if(gender==="Male"){
    var gen='M';
    console.log(gen);
  }
  else if(gender==="Female"){
    var gen='F';
    console.log(gen);
  }
  if(masters==="Msc" || masters ==="M-tech") {
    var stream='science';
  }
  else if(masters==="M.com" ) {
    var stream='commerce';
  }
  else if(masters==="Mba" ) {
    var stream='arts';
  }
  connection.query(sql_gender_masters,[gen,stream],function(err,row,fields){
    if(err)
      console.error(err);
    else{
      if(req.session.redirect_name==="/fun")  
        res.render('fun',{data:row});
      else
        res.render('fun1',{data:row});
    }
  });
}


/* query to fetch scholorship for selected gender only*/
  else if(classs==-1&&masters==-1&&bach==-1&&gender!=-1&&caste==-1 ){
    console.log("gettting in ",gender);
    if(gender==="Male"){
      var gen='M'; 
      console.log(gen);
    }
    else if(gender==="Female"){
      var gen='F';
      console.log(gen);
    }
    connection.query(sql_gender,[gen],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

/* query to fetch scholorship for selected caste only*/
  else if(classs==-1&&masters==-1&&bach==-1&&gender==-1&&caste!=-1 ){
    console.log("gettting in ",caste);
    connection.query(sql_caste,[caste],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

/* query to fetch scholorship for selected class and caste only*/
  else if(classs!=-1&&masters==-1&&bach==-1&&gender==-1&&caste!=-1){
    console.log("gettting in ",caste);
    connection.query(sql_caste_class,[caste,classs],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

/* query to fetch scholorship for bachelors degree and caste only*/
else if(classs==-1&&masters==-1&&bach!=-1&&gender==-1&&caste!=-1 ){
  console.log("gettting in ",caste);
  if(bach==="Bsc" || bach ==="B-tech") {
    var stream='science';
    }
  else if(bach==="Be.com" ) {
    var stream='commerce';
    }
  else if(bach==="Bba" ) {
    var stream='arts';
    }
  connection.query(sql_caste_bachelors,[caste,stream],function(err,row,fields){
    if(err)
      console.error(err);
    else{
      if(req.session.redirect_name==="/fun")  
        res.render('fun',{data:row});
      else
        res.render('fun1',{data:row});
    }
  });
}


/* query to fetch scholorship for masters degree and caste only*/
else if(classs==-1&&masters!=-1&&bach==-1&&gender==-1&&caste!=-1 ){
  console.log("gettting in ",caste);
  if(masters==="Msc" || masters ==="M-tech") {
    var stream='science';
  }
  else if(masters==="M.com" ) {
    var stream='commerce';
  }
  else if(masters==="Mba" ) {
    var stream='arts';
  }
  connection.query(sql_caste_masters,[caste,stream],function(err,row,fields){
    if(err)
      console.error(err);
    else{
      if(req.session.redirect_name==="/fun")  
        res.render('fun',{data:row});
      else
        res.render('fun1',{data:row});
    }
  });
}

/* query to fetch scholorship for selected caste and gender only*/
  else if(classs==-1&&masters==-1&&bach==-1&&gender!=-1&&caste!=-1 ){
    console.log("gettting in ",gender);
    console.log("gettting in ",caste);
    if(gender==="Male"){
      var gen='M'; 
      console.log(gen);
    }
    else if(gender==="Female"){
      var gen='F';
      console.log(gen);
    }

    connection.query(sql_caste_gender,[caste,gen],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }

  /* query to fetch scholorship for selected caste and gender and class only*/
  else if(classs!=-1&&masters==-1&&bach==-1&&gender!=-1&&caste!=-1 ){
    console.log("gettting in ",gender);
    console.log("gettting in ",caste);
    if(gender==="Male"){
      var gen='M'; 
      console.log(gen);
    }
    else if(gender==="Female"){
      var gen='F';
      console.log(gen);
    }

    connection.query(sql_caste_gender_class,[caste,gen,classs],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }



  /* query to fetch scholorship for selected caste and gender and bachelors only*/
  else if(classs==-1&&masters==-1&&bach!=-1&&gender!=-1&&caste!=-1 ){
    console.log("gettting in ",gender);
    console.log("gettting in ",caste);
    if(gender==="Male"){
      var gen='M'; 
      console.log(gen);
    }
    else if(gender==="Female"){
      var gen='F';
      console.log(gen);
    }

    if(bach==="Bsc" || bach ==="B-tech") {
      var stream='science';
      }
    else if(bach==="Be.com" ) {
      var stream='commerce';
      }
    else if(bach==="Bba" ) {
      var stream='arts';
      }

      console.log(stream)
    connection.query(sql_caste_gender_bachelors,[caste,gen,stream],function(err,row,fields){
      if(err)
        console.error(err);
      else{
        if(req.session.redirect_name==="/fun")  
          res.render('fun',{data:row});
        else
          res.render('fun1',{data:row});
      }
    });
  }


 /* query to fetch scholorship for selected caste and gender and masters only*/
 else if(classs==-1&&masters!=-1&&bach==-1&&gender!=-1&&caste!=-1 ){
  console.log("gettting in ",gender);
  console.log("gettting in ",caste);
  if(gender==="Male"){
    var gen='M'; 
    console.log(gen);
  }
  else if(gender==="Female"){
    var gen='F';
    console.log(gen);
  }

  if(masters==="Msc" || masters ==="M-tech") {
    var stream='science';
  }
  else if(masters==="M.com" ) {
    var stream='commerce';
  }
  else if(masters==="Mba" ) {
    var stream='arts';
  }

    console.log(stream)
  connection.query(sql_caste_gender_masters,[caste,gen,stream],function(err,row,fields){
    if(err)
      console.error(err);
    else{
      if(req.session.redirect_name==="/fun")  
        res.render('fun',{data:row});
      else
        res.render('fun1',{data:row});
    }
  });
}

else{
  res.redirect(url.format({
    pathname:"/form/log.ejs",
    query: {
       "class":req.body.Class,
       "bachleors":req.body.Bachelors,
       "masters":req.body.Masters
  }

}))//end of redirect
}//end of else 
 
}