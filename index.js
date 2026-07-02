const express = require('express');
const cors = require('cors'); // 1. CORS-u import et
const db = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes'); // Marşrutu yenidən fayldan çağırırıq

const app = express();

app.use(cors());
app.use(express.json());

// API Marşrutları
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes); // İstifadəçi və qeydiyyat marşrutları

app.get('/', (req, res) => {
    res.send('Event Registration API 8080 portunda rəvan işləyir!');
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Serverimiz ${PORT} portunda uğurla işə düşdü...`);
});