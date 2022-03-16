let mysql= require('mysql');
let express= require('express');
let app= express();
let cors= require('cors');

app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());

app.listen(8000);
let conn =mysql.createConnection({
    port:3306,
    user:'root',
    host:'127.0.0.1',
    password:'root',
    database:'todolist'
});
conn.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('connected the database')
    }
});

app.get('/todoList/:state',function(req,res){
    let condition='';
    if(req.params.state==='全部'){
        condition='';
    }else{
        condition= `where state="${req.params.state}"`
    }
    conn.query(`SELECT * FROM joblist ${condition} order by jobId desc`,function(err,result){
        res.send(JSON.stringify(result));
        
    });
    // console.log();
    // res.send(req.params.state);
});
app.post('/createJobList',function(req,res){
    // console.log(req.body);
    conn.query('insert into joblist (jobTitle) values(?)',[req.body.jobTitle],function(err){
        if(err){
            console.log(err);
        }
    })
    res.end();
});

app.get('/getEditJob',function(req,res){
    res.send('ok')
});

app.post('/editJobItem',function(req,res){
    // console.log(req.body);
    conn.query('update joblist set state=?, jobTitle=? where jobId=?',[req.body.state,req.body.jobTitle,req.body.jobId],
    function(err){
        if(err){
            console.log(err);
        }
    })
    res.end();
});
app.post('/deleteJobItem',function(req,res){
    // console.log(req.body);
    conn.query('delete from joblist where jobId=? ',[req.body.jobId],function(err){
        if(err){
            console.log(err);
        }
    })
    res.end();
})