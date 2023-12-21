const express = require('express');
const app = express();
const exampleRouter = require('./routers/example.router')


const port = 3000;


app.use(exampleRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
