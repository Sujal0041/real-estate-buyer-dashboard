const db = require('../db');

const getFavourites = (req, res) => {
    db.all(
        `
    SELECT p.id, p.title, p.location, p.price
    FROM favourites f
    INNER JOIN properties p ON f.property_id = p.id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
    `,
        [req.user.id],
        (err, rows) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to fetch favourites' });
            }

            return res.status(200).json(rows);
        }
    );
};

const addFavourite = (req, res) => {
    const { propertyId } = req.params;

    db.get(
        `SELECT id FROM properties WHERE id = ?`,
        [propertyId],
        (err, property) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to add favourite' });
            }

            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }

            db.run(
                `INSERT INTO favourites (user_id, property_id) VALUES (?, ?)`,
                [req.user.id, propertyId],
                function (insertErr) {
                    if (insertErr) {
                        if (insertErr.message.includes('UNIQUE')) {
                            return res.status(409).json({
                                message: 'Property already in favourites',
                            });
                        }

                        return res
                            .status(500)
                            .json({ message: 'Failed to add favourite' });
                    }

                    return res
                        .status(201)
                        .json({ message: 'Added to favourites' });
                }
            );
        }
    );
};

const removeFavourite = (req, res) => {
    const { propertyId } = req.params;

    db.run(
        `DELETE FROM favourites WHERE user_id = ? AND property_id = ?`,
        [req.user.id, propertyId],
        function (err) {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to remove favourite' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Favourite not found' });
            }

            return res.status(200).json({ message: 'Removed from favourites' });
        }
    );
};

module.exports = {
    getFavourites,
    addFavourite,
    removeFavourite,
};
