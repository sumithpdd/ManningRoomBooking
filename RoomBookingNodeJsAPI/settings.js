const APIServerPort = 3000;

const database = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'my_db',
    debug: true
};

module.exports = {
    database,
    APIServerPort
};