const User = require("../models/user");

function getAllUsers(req, res) {
    User.query().modify('defaultSelects')
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));
}


function getUser(req, res) {
    const { id } = req.params;
    User.query()
        .where({ id: `${id}` })
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json(data[0]);
            } else {
                return res.status(404).json(`User with ID ${id} not found`);
            }
        })
        .catch(error => res.status(500).json(error));
}

function newUser(req, res) {
    const { knex } = req.app.locals;
    const payload = req.body;
    knex('Users')
        .insert(payload)
        .then(response => res.status(201).json('User created'))
        .catch(error => res.status(500).json(error));
}

function updateUser(req, res) {
    const { id } = req.params;
    const payload = req.body;
    User.query()
        .upsertGraphAndFetch(payload)
        .where('id', id)

    .then(response => {
            if (response) {
                return res.status(204).json();
            }
            return res.status(404).json(`User with id ${id} not found.`);
        })
        .catch(error => res.status(500).json(error));
}

function deleteUser(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    knex('Users')
        .where('id', id)
        .del()
        .then(response => {
            if (response) {
                return res.status(200).json(`User with id ${id} deleted.`)
            }
            return res.status(404).json(`User with id ${id} not found.`);
        })
        .catch(error => res.status(500).json(error));
}


module.exports = {
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser,
};