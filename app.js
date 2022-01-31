const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //for serving html files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res)=>{
    const params = {};
    res.status(200).render('about.pug', params);
});

app.get('/services', (req, res)=>{
    const params = {};
    res.status(200).render('services.pug', params);
});

app.get('/class', (req, res)=>{
    const params = {};
    res.status(200).render('class.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not be saved to the database")
    })
});

// MONGOOSE SPECIFIC STUFF
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contact');
}

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });

var contact = mongoose.model('contact', contactSchema);  

// START THE SERVER
app.listen(port, ()=>{
    console.log(`the application started at port ${port}`);
});