const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cors = require('cors')
const studentRouter = require('./routers/student.router')
const facultyRouter = require('./routers/faculty.router')
const app = express();
const port = 3000;
dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json());
app.use(studentRouter)
app.use(facultyRouter)




const mongoURI = 'mongodb+srv://sidvarma:1234@cluster0.ladss.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
