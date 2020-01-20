const express = require('express')
const fs = require('fs');
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.post('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/logresult', (req, res) => {
    fs.appendFileSync(`./result${req.body.testcase}.csv`,"Number;DeltaTime\n"+Object.entries(req.body.resultobj).sort((a,b)=> Number(a[0]) - Number(b[0])).map(row => row.join(";")).join("\n"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))