const db = require('../config/db');

// 1. Yeni İstifadəçi Yaratmaq
exports.createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name və email mütləq doldurulmalıdır!" });
    }

    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    
    db.run(sql, [name, email], function (err) {
        if (err) {
            // Əgər email artıq mövcuddursa (UNIQUE xətası)
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ error: "Bu email ünvanı artıq qeydiyyatdan keçib!" });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "İstifadəçi uğurla yaradıldı", userId: this.lastID });
    });
};

// 2. İstifadəçini Tədbirə Qeydiyyat Etmək (Many-to-Many əlaqəsi)
exports.registerToEvent = (req, res) => {
    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
        return res.status(400).json({ error: "user_id və event_id göndərilməlidir!" });
    }

    // Biznes Məntiqi: Öncə tədbirin limitini (max_capacity) və cari qeydiyyat sayını yoxlayaq
    const checkCapacitySql = `
        SELECT 
            e.max_capacity, 
            COUNT(r.id) as current_registrations 
        FROM events e
        LEFT JOIN registrations r ON e.id = r.event_id
        WHERE e.id = ?
        GROUP BY e.id
    `;

    db.get(checkCapacitySql, [event_id], (err, event) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!event) return res.status(404).json({ error: "Tədbir tapılmadı!" });

        if (event.current_registrations >= event.max_capacity) {
            return res.status(400).json({ error: "Bu tədbirdə yer qalmayıb! Limit dolub." });
        }

        // Hər şey qaydasındadırsa, qeydiyyatı bazaya yazaq
        const insertSql = `INSERT INTO registrations (user_id, event_id) VALUES (?, ?)`;
        db.run(insertSql, [user_id, event_id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Tədbirə uğurla qeydiyyatdan keçdiniz", registrationId: this.lastID });
        });
    });
};

// 3. İstifadəçinin müəyyən bir tədbirdən qeydiyyatını silmək (Cancel Registration)
exports.cancelRegistration = (req, res) => {
    const { user_id, event_id } = req.body;

    const sql = `DELETE FROM registrations WHERE user_id = ? AND event_id = ?`;

    db.run(sql, [user_id, event_id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ error: "Belə bir qeydiyyat tapılmadı!" });
        }
        res.json({ message: "Tədbir qeydiyyatı uğurla ləğv edildi." });
    });
};

// 4. Bütün istifadəçilərin siyahısını gətirmək (GET /api/users)
exports.getAllUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
};

// 5. Müəyyən bir tədbirə qeydiyyatdan keçən istifadəçiləri JOIN ilə gətirmək (GET /api/users/event/:eventId)
exports.getUsersByEvent = (req, res) => {
    const { eventId } = req.params;

    const sql = `
        SELECT u.id, u.name, u.email, r.registration_date 
        FROM users u
        INNER JOIN registrations r ON u.id = r.user_id
        WHERE r.event_id = ?
    `;

    db.all(sql, [eventId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ event_id: eventId, registered_users: rows });
    });
};
// SIGN UP (Qeydiyyat)
exports.signUp = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    // Əgər parol xüsusi admin paroludursa, rolunu admin et, yoxsa normal user
    const role = (password === 'admin123') ? 'admin' : 'user';

    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, email, password, role], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ error: "This email is already registered!" });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Registration successful!", userId: this.lastID });
    });
};

// LOGIN (Giriş)
exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found!" });

        if (user.password !== password) {
            return res.status(401).json({ error: "Password is incorrect!" });
        }

        // Giriş uğurlu olduqda rolu da göndəririk
        res.status(200).json({ 
            message: "Login successful!", 
            userId: user.id,
            name: user.name,
            role: user.role 
        });
    });
};