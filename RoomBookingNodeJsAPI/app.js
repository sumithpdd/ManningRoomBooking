const express = require('express');
const app = express();
const router = express.Router();
const settings = require('./settings');
const routes = require('./routes');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
const { Model } = require('objection');

const cors = require('cors');
app.use(cors());

const jsonParser = bodyParser.json();



const knex = require('knex')({
    client: 'mysql',
    connection: settings.database,
    debug: true
});
app.locals.knex = knex;
// Give the knex instance to objection.
Model.knex(knex);

router.get('/bookings', routes.bookings.listAllbookings);
// router.get('/bookings/:id', middlewares.authenticate, middlewares.getIDAsInteger, routes.bookings.listOneBooking);
router.get('/bookings/:id', middlewares.getIDAsInteger, routes.bookings.listOneBooking);
router.post('/bookings', jsonParser, routes.bookings.createBooking);
router.patch('/bookings/:id', jsonParser, middlewares.getIDAsInteger, routes.bookings.updateBooking);
router.delete('/bookings/:id', middlewares.getIDAsInteger, routes.bookings.deleteBooking);
// http://localhost:3000/api/rooms
router.get('/rooms', routes.rooms.listAllRooms);
// http://localhost:3000/api/rooms/1
router.get('/rooms/:id', middlewares.getIDAsInteger, routes.rooms.listOneRoom);
router.get('/rooms/:id/bookings', middlewares.getIDAsInteger, routes.rooms.getRoomBookings);
router.post('/rooms', jsonParser, routes.rooms.createRoom);
router.patch('/rooms/:id', jsonParser, middlewares.getIDAsInteger, routes.rooms.updateRoom);
router.delete('/rooms/:id', middlewares.getIDAsInteger, routes.rooms.deleteRoom);

router.get('/users', routes.user.getAllUsers);


app.use('/api', router);

app.listen(settings.APIServerPort, () => console.info(`Server is listening on ${settings.APIServerPort}. open http://localhost:${settings.APIServerPort}/api/bookings`));