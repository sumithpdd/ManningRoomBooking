const Room = require("../models/room");

// function listAllRooms(req, res) {
//     const { knex } = req.app.locals;
//     knex
//         .select('id', 'name', 'location')
//         .from('room')
//         .then(data => res.status(200).json(data))
//         .catch(error => res.status(500).json(error));
// }
function listAllRooms(req, res) {
    Room.query()
        .withGraphFetched("[capacities]")
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));
}

function listRoomCapacity(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;

    knex
        .select('l.id', 'l.name as layout', 'l.description', 'rl.capacity')
        .from('roomlayout rl')
        .innerJoin('my_db.layout l', 'rl.layoutid', 'l.id')
        .where('rl.roomid', id)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));
}

function listOneRoom(req, res) {
    const { id } = req.params;
    Room.query()
        .withGraphFetched("[capacities]")
        .where({ id: `${id}` })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data[0]);
            } else {
                return res.status(404).json(`room with ID ${id} not found`);
            }
        })
        .catch(error => res.status(500).json(error));
}

function createRoom(req, res) {
    const { knex } = req.app.locals;
    const payload = req.body;
    knex('rooms')
        .insert(payload)
        .then(response => res.status(201).json('room created'))
        .catch(error => res.status(500).json(error));
}

function updateRoom(req, res) {
    const { id } = req.params;
    const payload = req.body;
    Room.query()
        .upsertGraphAndFetch(payload)
        .where('id', id)

    .then(response => {
            if (response) {
                return res.status(204).json();
            }
            return res.status(404).json(`room with id ${id} not found.`);
        })
        .catch(error => res.status(500).json(error));
}

function deleteRoom(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    knex('rooms')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                return res.status(200).json(`room with id ${id} deleted.`)
            }
            return res.status(404).json(`room with id ${id} not found.`);
        })
        .catch(error => res.status(500).json(error));
}

function getRoomBookings(req, res) {
    const { knex } = req.app.locals;
    let { id } = req.params;
    id = +id;
    knex
        .select('b.id', 'r.name', 'u.username', 'l.description', 'b.title', 'b.bookingdate', 'b.startTime', 'b.endTime', 'b.participants'
            .from('my_db.booking AS b')
            .innerJoin('room AS r', function() {
                this.on('b.room', '=', 'r.id')
            })
            .andOn('users AS u', function() {
                this.on('b.user', '=', 'u.id')
            })
            .andOn('layout AS l', function() {
                this.on('b.layout', '=', 'l.id')
            })
            .then(data => {
                if (data.length > 0) {
                    return res.status(200).json(data)
                }
                return res.status(404).json(`room with id ${id} cannot be found.`)
            }))
        .catch(error => res.status(500).json(error));
}

module.exports = {
    listAllRooms,
    listOneRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomBookings
};