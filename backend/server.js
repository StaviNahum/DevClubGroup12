const express = require('express');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    
} const app = express();
app.use(express.json());
app.use(cors());

app.get('/example', (req, res) => {
    res.send('hi from the server')
})

const userRoutes = require('./modules/user/user-routes')
app.use('/api/user', userRoutes)

app.listen(8080, () => {
    console.log('app is running on port 8080');
})