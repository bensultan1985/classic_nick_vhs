const express = require('express');
const app = express();
const path = require('path')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

//get request for website
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

//static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/mysql/tapes', (req, res) => {
    res.json(tapeInfo);
})