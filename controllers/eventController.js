const db = require('../config/db');

// 1. Bütün tədbirlərin siyahısını gətirmək
exports.getAllEvents = (req, res) => {
    const sql = "SELECT * FROM events";
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: "Uğurlu",
            data: rows
        });
    });
};

// 2. Yeni tədbir yaratmaq
exports.createEvent = (req, res) => {
    const { title, description, date, location, max_capacity } = req.body;
    
    // Validasiya (Sadə yoxlanış)
    if (!title || !date || !max_capacity) {
        return res.status(400).json({ error: "Title, date və max_capacity doldurulmalıdır!" });
    }

    const sql = `INSERT INTO events (title, description, date, location, max_capacity) 
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [title, description, date, location, max_capacity];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Tədbir uğurla yaradıldı",
            eventId: this.lastID // Yeni yaranan tədbirin ID-si
        });
    });
};

// DELETE EVENT (Admin Only)
exports.deleteEvent = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM events WHERE id = ?`;
    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Event not found." });
        }
        res.status(200).json({ message: "Event successfully deleted!" });
    });
};