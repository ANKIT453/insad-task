// importing the modules
require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const port = process.env.PORT || 3000
const app = express()

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("public"))

const client = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "mydb"
})

client.connect(err => {
    if(err) throw err

    // let sql = "CREATE TABLE students (student_id VARCHAR(255), firstName VARCHAR(255),lastName VARCHAR(255), current_job VARCHAR(255), location VARCHAR(255))";
    //   client.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    //   });

    app.post("/api/add", (req, res) => {
        console.log(req.body)

        const {student_id, firstName, lastName, current_job, location} =  req.body

        let sql = `INSERT INTO students (student_id, firstName, lastName, current_job, location) VALUES ('${student_id}', '${firstName}', '${lastName}', '${current_job}', '${location}')`

        client.query(sql, (e, result) => {
            if(e) {
                res.status(500).json({
                    message: "Something went wrong !"
                })
                return
            }

            console.log(result)

            res.status(200).json({
                message: "Data Inserted"
            })
        })  
    })

    app.get("/api/all", (req, res) => {
        // const { student_id } = req.body

        // let sql = `SELECT * FROM customers WHERE address = ${student_id}`
        let sql = `SELECT * FROM students`
        client.query(sql, (e, result) => {
            if(e) {
                res.status(500).json({
                    message: "Something went wrong !"
                })
                return
            }

            res.status(200).json(result)
        })
        
    })

    app.get("/api/:id", (req ,res) => {
        const { id } = req.params
        
        let sql = `SELECT * FROM students WHERE student_id='${id}'`

        client.query(sql, (e, result) => {
            if(e) {
                res.status(500).json({
                    message: "Something went wrong !"
                })
                return
            }

            console.log(result)
            
            res.status(200).json(result)
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})