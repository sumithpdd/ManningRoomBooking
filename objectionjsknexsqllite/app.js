// run the following command to install:
// npm install objection knex sqlite3

const { Model } = require('objection');
const Knex = require('knex');
const Person = require("./models/Person");
const Movie = require('./models/movie');
// Initialize knex.
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'example.db'
    }
});

// Give the knex instance to objection.
Model.knex(knex);
async function createSchema() {
    await knex.schema.dropTableIfExists('person');
    await knex.schema.dropTableIfExists('movie');
    await knex.schema.dropTableIfExists('review');
    await knex.schema.dropTableIfExists('movie_person');
    if (await knex.schema.hasTable('person')) {
        return;
    }

    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('movie', function(table) {
        table.increments('id').primary();
        table.string('name');
    });
    await knex.schema.createTable('person', table => {
        table.increments('id').primary();
        table.integer('parentId').references('person.id');
        table.string('firstName');
        table.string('lastName');
    });
    await knex.schema.createTable('movie_person', function(table) {
        table.integer('movieId')
            .references('id')
            .inTable('movie')
            .index();
        table.integer('personId')
            .references('id')
            .inTable('person')
            .index();
    });
    await knex.schema.createTable('review', function(table) {
        table.increments('id').primary();
        table.string('title');
        table.integer('stars');
        table.string('text');
        table.integer('movieId')
            .references('id')
            .inTable('movie')
            .index();
        table.integer('reviewerId')
            .references('id')
            .inTable('person')
            .index();
    });
}

async function main() {
    // Create some people.
    const sylvester = await Person.query().insertGraph({
        firstName: 'Sylvester',
        children: [{
                firstName: 'Sage'
            },
            {
                firstName: 'Sophia'
            }
        ]
    });
    console.log('created:', sylvester);
    
    // Fetch all people named Sylvester and sort them by id.
    // Load `children` relation eagerly.
    const sylvesters = await Person.query()
        .where('firstName', 'Sylvester')
        .withGraphFetched('children')
        .orderBy('id');

    console.log('sylvesters:', sylvesters);
    console.log('------------------');

    const Theterminator = await Movie.query().insertGraph({
        name: 'The terminator',
        actors: [{
            firstName: 'Arnold',
            lastName: 'Schwarzenegger',
        }, {
            firstName: 'Michael',
            lastName: 'Biehn'
        }],

        reviews: [{
            title: 'Great movie',
            stars: 5,
            text: 'Awesome',

            reviewer: {
                firstName: 'Some',
                lastName: 'Random-Dude'
            }
        }]
    });

    console.log('created:', Theterminator);

    // Fetch all people named Sylvester and sort them by id.
    // Load `children` relation eagerly.
    const sylvesters = await Person.query()
        .where('firstName', 'Sylvester')
        .withGraphFetched('children')
        .orderBy('id');

    console.log('sylvesters:', sylvesters);
    

}

createSchema()
    .then(() => main())
    .then(() => knex.destroy())
    .catch(err => {
        console.error(err);
        return knex.destroy();
    });