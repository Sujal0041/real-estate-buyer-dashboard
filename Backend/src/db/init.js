const db = require('./index');

const initDb = () => {
    db.serialize(() => {
        db.run('PRAGMA foreign_keys = ON');

        db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'buyer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        db.run(`
      CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        price REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        db.run(`
      CREATE TABLE IF NOT EXISTS favourites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        property_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, property_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);

        db.run(`
      INSERT OR IGNORE INTO properties (id, title, location, price)
      VALUES
        (1, 'Modern Style House', 'Budhanilkantha', 10000000),
        (2, 'Office Space', 'New Baneshwor', 9800000),
        (3, 'Cafe', 'Bhaktapur', 5400000),
        (4, 'High End Resort', 'Dhulikhel', 12500000)
    `);
    });
};

module.exports = initDb;
