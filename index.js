var express= require('express');
var app = express();
var mysql = require('mysql2');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());



app.set('view engine','ejs');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Rajkiran@125',
    database : 'employee'
});


conn.connect(function(err){
    if(err) throw err;
    console.log('Connected Successfully')
});


app.get('/add',function(req,res){
    res.render('add');
});


app.post('/insert',function(req,res){

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var salary = req.body.salary;

    var sql = "insert into emp(firstname,lastname,email,salary) values('"+firstname+"','"+lastname+"','"+email+"','"+salary+"' )";

    conn.query(sql,function(err,results){
        if(err) throw err;

        res.redirect('/')
    })

});


app.get('/',function(req,res){

    var sql = "select * from emp";

    conn.query(sql,function(err,results){
        if(err) throw err;
        res.render('details',{emp:results});

    })
});


app.get('/delete/:id',function(req,res){
    var id = req.params.id;
    
    var sql = "delete from emp where id='"+id+"'";
    
    conn.query(sql,function(err,results){
        if(err) throw err;
        
        res.redirect('/')
    })
});


app.get('/update/:id',function(req,res){

    var id = req.params.id;

    var sql = "select * from emp where id ='"+id+"'";

    conn.query(sql,function(err,results){
        if(err) throw err;

        res.render('update',{emp:results})
    })
});


app.post('/update/:id',function(req,res){

    var id = req.params.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var salary = req.body.salary;

    var sql = " update emp set firstname='"+firstname+"', lastname='"+lastname+"', email='"+email+"', salary='"+salary+"' where id = '"+id+"' ";
    
    conn.query(sql,function(err,results){
        if(err) throw err;

        res.redirect('/')
    })

});



var server=app.listen(4200,function(){
    console.log("App running on 4200")
});