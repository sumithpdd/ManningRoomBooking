const bookings = require('./controllers/bookingController');
const rooms = require('./controllers/roomController');
const user = require('./controllers/userController');

module.exports = {
    bookings,
    rooms,
    user
};