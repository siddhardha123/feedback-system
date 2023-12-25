const express = require('express');
const app = express();
const studentRouter = require('./routers/student.router')
const facultyRouter = require('./routers/faculty.router')

const port = 3000;

app.use(studentRouter)
app.use(facultyRouter)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
