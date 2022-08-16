const express=require("express")
const app= express()
const db=require('./db')
const port=5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// DB connection
 db.connect((err,res)=>{
    if(!err){
    console.log('DB connected')
    }
    else{
        console.log(err)
    }
 })


//  Reterive Data from DB
 app.get('/books',(req,res)=>{
    db.query('Select * from booklists',(err,result)=>{
        if(!err){
           
            res.send(result.rows).status(200)
        }
        else{
            console.log("No data")
            res.send(400)
        }
    })
})


// Add Data to DB
app.post('/book',(req,res)=>{
const book=req.body;
let insertData=`Insert into booklists(bid,bookName,author,year)
 values (${book.bid},'${book.bookName}','${book.author}',${book.year})`
console.log(insertData)
 db.query(insertData,(err,result)=>{
     if(!err)
     {
      console.log("data inserted successfully")
      res.status(200)
    }

    else{
        console.log("data insertion failed",err)
        res.status(400)
    }
 })
})


// Get element with id
app.get('/books/:bid',(req,res)=>{
db.query(`Select * from booklists where bid= ${req.params.bid}`,(err,result)=>{
    if(!err)
     {
      res.send(result.rows)
    }

    else{
        res.send('No Data Found',err)
    }
})
})


//Get element with year
app.get('/books/year/:year',(req,res)=>{
db.query(`Select * from booklists where year= ${req.params.year}`,(err,result)=>{
    if(!err)
     {
      res.send(result.rows)
    }

    else{
        res.send('No Data Found',err)
    }
})
})


// Get element with author
app.get('/books/author/:author',(req,res)=>{
    db.query(`Select * from booklists where author= '${req.params.author}'`,(err,result)=>{
        if(!err)
         {
          res.send(result.rows)
        }
        else{
            res.send('No Data Found',err)
        }
    })
    })


// Listening to server
 app.listen(port,()=>{
     console.log(`Server Running at port ${port}`);
  });