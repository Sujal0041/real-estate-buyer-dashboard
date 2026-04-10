const db = require('../db');

const getProperties = (req, res) => {
    db.all(
        `SELECT id, title, location, price FROM properties ORDER BY id ASC`,
        [],
        (err, rows) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to fetch properties' });
            }

            return res.status(200).json(rows);
        }
    );
};

module.exports = {
    getProperties,
};
