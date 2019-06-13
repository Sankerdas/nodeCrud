var expresss = require('express');
var app = expresss();
var port = 3000;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);

mongoose.connect('mongodb+srv://das:AXZlRvv0HyaoCp7K@cluster0-4kufj.mongodb.net/test?retryWrites=true');

//mongodb+srv://das:AXZlRvv0HyaoCp7K@cluster0-4kufj.mongodb.net/test?retryWrites=true
//mongodb://localhost:27017/test


app.use('/',(req, res) => {
    //res.send('hello india');
    res.sendFile(__dirname+'/index.html'); // load index file
} );

app.listen(port, () => {
    console.log('im listening to '+port);
});