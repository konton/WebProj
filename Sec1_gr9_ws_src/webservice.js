const express = require("express");
const app = express();
const bp = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const router = express.Router();

dotenv.config();
router.use(bp.json());
app.use("/", router);
var cors = require('cors');
app.use(cors());
router.use(bp.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));


let dbConn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Connected DB:" + process.env.MYSQL_DATABASE);
})
//Admin table
router.post('/inus', function (req, res) {
    let student = req.body;
    let id = req.body.ID
    console.log();
    if (!student) {
        return res.status(400).send({
            error: true, message: 'Please provide Customer information'
        });
    }
    dbConn.query("INSERT INTO Infor SET ?", student, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false, data: results, message: 'New Customer has been created successfully.'
        });
    });
});

router.put('/upd', function (req, res) {
    let student_id = req.body.ID;
    let student = req.body;
    console.log(student_id)
    console.log(student)
    if (!student_id || !student) {
        return res.status(400).send({ error: student, message: 'Please provide Customer information' });
    }
    dbConn.query("UPDATE Infor SET ? WHERE ID = ?", [student, student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Customer has been updated successfully.' })
    });
});



router.delete('/dele', function (req, res) {
    let student_id = req.body.ID;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide student_id' });
    }
    dbConn.query('DELETE FROM Infor WHERE ID = ?', [student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Customer has been deleted successfully.' });
    });
});
router.get('/get/:id', function (req, res) {
    let student_id = req.params.id;
    console.log(student_id);
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide customer id.' });
    }
    dbConn.query('SELECT * FROM Infor where ID=?', student_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Customer retrieved' });
    });
});

router.get('/info/:id', function (req, res) {
    let us = req.params.id
    dbConn.query('SELECT * FROM Infor', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Customer list.' });
    });
});

//Promotion table management
router.post('/inpro', function (req, res) {
    let student = req.body;
    let id = req.body.Pro_ID
    //console.log(student);
    if (!student) {
        return res.status(400).send({
            error: true, message: 'Please provide Promotion information'
        });
    }
    dbConn.query("INSERT INTO Promo SET ?", student, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false, data: results, message: 'New Promotion has been created successfully.'
        });
    });
});

router.get('/getpro/:id', function (req, res) {
    let student_id = req.params.id;
    console.log(student_id);
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide Promotion id.' });
    }
    dbConn.query('SELECT * FROM Promo WHERE Pro_ID = ?', student_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Promotion retrieved' });
    });
});

router.get('/infoPro', function (req, res) {
    dbConn.query('SELECT * FROM Promo', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Promotion list.' });
    });
});

router.delete('/delePro', function (req, res) {
    let student_id = req.body.ID;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide Promo_id' });
    }
    dbConn.query('DELETE FROM Promo WHERE Pro_ID = ?', [student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Promotion has been deleted successfully.' });
    });
});

router.put('/upPro', function (req, res) {
    let student_id = req.body.Pro_ID;
    let student = req.body;
    console.log(student_id)
    console.log(student)
    if (!student_id || !student) {
        return res.status(400).send({ error: student, message: 'Please provide Promotion information' });
    }
    dbConn.query("UPDATE Promo SET ? WHERE Pro_ID = ?", [student, student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Promotion has been updated successfully.' })
    });
});



//Manage Shabu
router.post('/insh', function (req, res) {
    let student = req.body;
    let id = req.body.Pro_ID
    //console.log(student);
    if (!student) {
        return res.status(400).send({
            error: true, message: 'Please provide ShabuSet information'
        });
    }
    dbConn.query("INSERT INTO ShabuSet SET ?", student, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false, data: results, message: 'New ShabuSet has been created successfully.'
        });
    });
});

router.get('/infosh', function (req, res) {
    dbConn.query('SELECT * FROM ShabuSet', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'ShabuSet list.' });
    });
});

router.get('/getp/:id', function (req, res) {
    let student_id = req.params.id;
    console.log(student_id);
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide Promotion id.' });
    }
    dbConn.query('SELECT * FROM ShabuSet WHERE Shabu_ID = ?', student_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Promotion retrieved' });
    });
});

router.delete('/delesh', function (req, res) {
    let student_id = req.body.ID;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide ShabuSet_id' });
    }
    dbConn.query('DELETE FROM ShabuSet WHERE Shabu_ID = ?', [student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'ShabuSet has been deleted successfully.' });
    });
});

router.put('/upsh', function (req, res) {
    let student_id = req.body.Shabu_ID;
    let student = req.body;
    console.log(student_id)
    console.log(student)
    if (!student_id || !student) {
        return res.status(400).send({ error: student, message: 'Please provide ShabuSet information' });
    }
    dbConn.query("UPDATE ShabuSet SET ? WHERE Shabu_ID = ?", [student, student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'ShabuSet has been updated successfully.' })
    });
});

//Manage Ingrediant
router.post('/inin', function (req, res) {
    let student = req.body;
    let id = req.body.Pro_ID
    //console.log(student);
    if (!student) {
        return res.status(400).send({
            error: true, message: 'Please provide Ingredient information'
        });
    }
    dbConn.query("INSERT INTO Ingredient SET ?", student, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false, data: results, message: 'New Ingredient has been created successfully.'
        });
    });
});

router.get('/infoin', function (req, res) {
    dbConn.query('SELECT * FROM Ingredient', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Ingredient list.' });
    });
});

router.get('/geti/:id', function (req, res) {
    let student_id = req.params.id;
    console.log(student_id);
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide Ingredient id.' });
    }
    dbConn.query('SELECT * FROM Ingredient WHERE Ingre_ID = ?', student_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Ingredient retrieved' });
    });
});

router.delete('/delei', function (req, res) {
    let student_id = req.body.ID;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide student_id' });
    }
    dbConn.query('DELETE FROM Ingredient WHERE Ingre_ID = ?', [student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Ingredient has been deleted successfully.' });
    });
});

router.put('/upi', function (req, res) {
    let student_id = req.body.Ingre_ID;
    let student = req.body;
    console.log(student_id)
    console.log(student)
    if (!student_id || !student) {
        return res.status(400).send({ error: student, message: 'Please provide Ingredient information' });
    }
    dbConn.query("UPDATE Ingredient SET ? WHERE Ingre_ID = ?", [student, student_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Ingredient has been updated successfully.' })
    });
});

//Search promotion
router.get('/promotion/:id', cors(), function (req, res) {
    let promotion_name = req.params.id;
    // console.log(promotion_name);
    let name = promotion_name.match(/.*[a-zA-z]/);
    //min normal let min = promotion_name.match(/[0-9].*/);
    let keep = promotion_name.match(/(,\s*)(\d+)*/);
    let keep1 = promotion_name.match(/(-\s*)(\d+)*/);
    let check = promotion_name.match(/(!\s*)(\d+)*/);
    
    let min = keep[2];
    let max = keep1[2];
    //console.log(max);
    // let min = keep[]
    // let min = promotion_name.match(/(\d+)(,\s*)/);
    // let max = promotion_name.match(/(,\s*)(\d+)*/);
    var p;
    //console.log(keep);

    
     if(min != null && max==undefined){ //User only put min value not sorting;
        console.log("Min");
        if(check==null){
            p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+"having Pro_Price>="+min;
        }else{
            p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+"having Pro_Price>="+min+" ORDER BY Pro_Price desc";
        }
        
    }else if(min==undefined && max!=undefined ){//User only put max value
        console.log("Max");
        if(check == null){
          p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+"having Pro_Price<="+max;  
        }else{
            p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+"having Pro_Price<="+max+" ORDER BY Pro_Price desc";
        }
        
    }else if(min != undefined && max!=undefined ){
        console.log("Min & Max");
        if(check ==null){
            p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+"having Pro_Price>="+min+" and Pro_Price<="+max;
        }else{
            p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+"having Pro_Price>="+min+" and Pro_Price<="+max+" ORDER BY Pro_Price desc";
        }
        
    }else {
        console.log("NULL");
        if(check == null){
            p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"
        }
             p = "SELECT * FROM Promo Where Pro_Name LIKE '%"+name+"%'"+" ORDER BY Pro_Price desc"
    }

   // console.log(promotion_name);
    if (!promotion_name) {
        return res.status(400).send({ error: true, message: 'Please provide promotion' })
    }
    dbConn.query(p , function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Promotion retrieved' });
    });
    //dbConn.query('SELECT * FROM ShabuSet where Shabu_Name = ?', promotion_name, function (error, results) {
    //    if (error) throw error;
    //    return res.send({ error: false, data: results[0], message: 'Shabu retrieved' });
    //});
});

//Search Shabuset
router.get('/shabuset/:id', cors(), function (req, res) {
    let shabu_name = req.params.id;
    console.log(shabu_name);
    let names = shabu_name.match(/.*[a-zA-z]/);
    //min normal let min = promotion_name.match(/[0-9].*/);
    //(!\s*)(\d+)*
    let keeps = shabu_name.match(/(,\s*)(\d+)*/);
    let keeps1 = shabu_name.match(/(-\s*)(\d+)*/);
    let checks = shabu_name.match(/(!\s*)(\d+)*/);
    let mins = keeps[2];
    let maxs = keeps1[2];
    console.log("HERE");
    var s;
    //console.log(keep);
    if(mins != null && maxs==undefined){ //User only put min value;
        console.log("Min");
        if(checks == null){
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+"having Shabu_Price>="+mins;
        }else{
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+"having Shabu_Price>="+mins+" ORDER BY Shabu_Price desc";
        }
        
    }else if(mins==undefined && maxs!=undefined){//User only put max value
        console.log("Max");
        if(checks ==null){
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+"having Shabu_Price<="+maxs;
        }else{
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+"having Shabu_Price<="+maxs+" ORDER BY Shabu_Price desc";
        }
       
    }else if(mins != undefined && maxs!=undefined){
        console.log("Min & Max");
        if(checks==null){
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+"having Shabu_Price>="+mins+" and Shabu_Price<="+maxs;
        }else{
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+"having Shabu_Price>="+mins+" and Shabu_Price<="+maxs+" ORDER BY Shabu_Price desc";
        }
        
    }else{
        console.log("NULL");
        if(checks==null){
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'";
        }else{
            s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+names+"%'"+" ORDER BY Shabu_Price desc";
        }

        
        
    }
   // var s = "SELECT * FROM ShabuSet Where Shabu_Name LIKE '%"+shabu_name+"%'"
    
    if (!shabu_name) {
        return res.status(400).send({ error: true, message: 'Please provide shabuset' })
    }
    dbConn.query(s, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Shabuset retrieved' });
    });
});

// Search Ingredient
router.get('/ingredient/:id', cors(), function (req, res) {
    let ingredient_name = req.params.id;
    // console.log(ingredient_name);
    let name = ingredient_name.match(/.*[a-zA-z]/);
    //min normal let min = promotion_name.match(/[0-9].*/);
    let keepi = ingredient_name.match(/(,\s*)(\d+)*/);
    let keepi1 = ingredient_name.match(/(-\s*)(\d+)*/);
    let checki = ingredient_name.match(/(!\s*)(\d+)*/);
    let min = keepi[2];
    let max = keepi1[2];
    console.log(name);
    var i;
    //console.log(keep);
    if(min != null && max==undefined){ //User only put min value;
        console.log("Min");
        if(checki==null){
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+"having Ingre_Price>="+min;
        }else{
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+"having Ingre_Price>="+min+" ORDER BY Ingre_Price desc";
        }
        
    }else if(min==undefined && max!=undefined){//User only put max value
        console.log("Max");
        if(checki==null){
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+"having Ingre_Price<="+max;
        }else{
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+"having Ingre_Price<="+max+" ORDER BY Ingre_Price desc";
        }
        
    }else if(min != undefined && max!=undefined){
        console.log("Min & Max");
        if(checki==null){
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+"having Ingre_Price>="+min+" and Ingre_Price<="+max;
        }else{
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+"having Ingre_Price>="+min+" and Ingre_Price<="+max+" ORDER BY Ingre_Price desc";
        }
        
    }else{
        console.log("NULL");
        if(checki==null){
            console.log("LOOP")
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'";
        }else{
            console.log("ELSE");
            i = "SELECT * FROM Ingredient Where Ingre_Name LIKE '%"+name+"%'"+" ORDER BY Ingre_Price desc";
        }
        
        
    }
    // console.log(ingredient_name);
    if (!ingredient_name) {
        return res.status(400).send({ error: true, message: 'Please provide ingredient' })
    }
    dbConn.query(i, ingredient_name, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Ingredient retrieved' });
    });
});


app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/Home.html'));
});

app.get("/Home.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/Home.html'));
});
app.get("/login.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/login.html'));
});
app.get("/Admin.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/Admin.html'));
});
app.get("/AdminCu.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/AdminCu.html'));
});
app.get("/AdminPro.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/AdminPro.html'));
});
app.get("/Searching.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/Searching.html'));
});
app.get("/AdminSh.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/AdminSh.html'));
});
app.get("/AdminIn.html", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/AdminIn.html'));
});

/* Server listening */
app.listen(3030, function () {
    console.log("Server listening at Port 3030");
    console.log(__dirname);
});
