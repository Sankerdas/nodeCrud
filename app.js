var expresss = require('express');
var app = expresss();
var mongoose = require('mongoose');
var port = 3000;

// Middleware - get body data and convert to json give to backend to store
//Middleware helper - body-parser - parse body data to jsons
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log('im listening to '+port);
});

// db connection
mongoose.Promise = global.Promise;
var con = mongoose.connect('mongodb://localhost:27017/expMongs', {useNewUrlParser: true}).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

// Schema    
    nameSchema = new mongoose.Schema({
        firstName: String,
        lastName: String
    });

// Model    
    var User = mongoose.model('User', nameSchema);



//Routing    
app.get('/',(req, res) => {
    res.sendFile(__dirname+'/index.html'); // load index file
});


app.post("/addname", (req, res) => {
    var myData = new User(req.body)
    myData.save().then(item =>{
        res.send('Success, saved to db'+item);
    }).catch(err => {
        res.status(400).send('Faild, not inserted to mongo db'+err);
    });
    
   });

   app.get('/list',(req,res)=> {
    
    var result = User.find().exec();
    res.send(result);

   })

//    app.get("/list", async (request, response) => {
//     try {
//         var result = await test.find().exec();
//         response.send(result);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });






////// Fix mongo error here
// mongod --dbpath="C:\data\db" --storageEngine=mmapv1