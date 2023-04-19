const express=require('express');
const mysql=require('mysql2');
const port=process.env.PORT||3001;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const db=sql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'rootp',
        database:'employee'

    },
    console.log("Connected to the employee database");
)