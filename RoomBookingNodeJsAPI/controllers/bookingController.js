const { error } = require("console");
const e = require("express");
const Booking = require("../models/booking");

// function listAllbookings(req, res) {
//     const { knex } = req.app.locals;
//     const { orderBy } = req.query;
//     if (orderBy) {
//         const regex = /(.*)(:)(ASC|DESC)/ig;
//         if (regex.test(orderBy)) {
//             const [column, order] = orderBy.split(':');
//             knex
//                 .select('b.id', 'r.name', 'u.username', 'l.description', 'b.title', 'b.bookingdate', 'b.startTime', 'b.endTime', 'b.participants')
//                 .from('booking AS b')
//                 .innerJoin('room AS r', 'b.room', 'r.id')
//                 .innerJoin('users AS u', 'b.user', 'u.id')
//                 .innerJoin('layout AS l', 'b.layout', 'l.id')
//                 .orderBy(column, order)
//                 .then(data => res.status(200).json(data))
//                 .catch(error => {
//                     console.log('error from the call: ', error);
//                     res.status(500).json(error)
//                 });
//         } else {
//             return res.status(400).json('If using a filter please use [field]:ASC|DESC');
//         }
//     } else {
//         knex
//             .select('b.id', 'r.name', 'u.username', 'l.description', 'b.title', 'b.bookingdate', 'b.startTime', 'b.endTime', 'b.participants')
//             .from('booking AS b')
//             .innerJoin('room AS r', 'b.room', 'r.id')
//             .innerJoin('users AS u', 'b.user', 'u.id')
//             .innerJoin('layout AS l', 'b.layout', 'l.id')
//             .then(data => res.status(200).json(data))
//             .catch(error => res.status(500).json(error));
//     }

// }
function listAllbookings(req, res) {

    Booking.query()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));


}

function listOneBooking(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    knex
        .select('b.id', 'r.name', 'u.username', 'l.description', 'b.title', 'b.bookingdate', 'b.startTime', 'b.endTime', 'b.participants')
        .from('booking AS b')
        .innerJoin('room AS r', 'b.room', 'r.id')
        .innerJoin('users AS u', 'b.user', 'u.id')
        .innerJoin('layout AS l', 'b.layout', 'l.id')
        .where('b.id', '=', id)
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data[0]);
            } else {
                return res.status(404).json(`booking with ID ${id} not found`);
            }
        })
        .catch(error => res.status(500).json(error));
}

function createBooking(req, res) {
    const { knex } = req.app.locals;
    const payload = req.body;
    const mandatoryColumns = ['name', 'email', 'salary'];
    const payloadKeys = Object.keys(payload);
    const mandatoryColumnExists = mandatoryColumns.every(mc => payloadKeys.includes(mc));
    if (mandatoryColumnExists) {
        knex('bookings')
            .insert(payload)
            .then(response => res.status(201).json('booking created'))
            .catch(error => res.status(500).json(error));
    } else {
        return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`);
    }
}

function updateBooking(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    const payload = req.body;
    knex('bookings')
        .where('id', id)
        .update(payload)
        .then(response => {
            if (response) {
                return res.status(204).json();
            }
            return res.status(404).json(`booking with id ${id} not found.`);
        })
        .catch(error => res.status(500).json(error));
}

function deleteBooking(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    knex('bookings')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                return res.status(200).json(`booking with id ${id} deleted.`)
            }
            return res.status(404).json(`booking with id ${id} not found.`);
        })
        .catch(error => res.status(500).json(error));
}

module.exports = {
    listAllbookings,
    listOneBooking,
    createBooking,
    updateBooking,
    deleteBooking
};