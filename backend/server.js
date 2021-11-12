const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./modules/user/user-routes')
app.use('/api/user', userRoutes)

app.get('/example', (req, res) => {
    res.send('hi from the server')
})




app.listen(8080, () => {
    console.log('app is running on port 8080');
})