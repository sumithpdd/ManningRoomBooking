const { Model } = require('objection');
const Movie = require("./movie");
const Review = require('./review');
// Person model.
class Person extends Model {
    static get tableName() {
        return 'person';
    }

    static get relationMappings() {
        return {
            children: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: 'person.id',
                    to: 'person.parentId'
                }
            },
            parent: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: 'person.id',
                    to: 'person.parentId'
                }
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: 'person.id',
                    to: 'review.reviewerId'
                }
            },
            movies: {
                relation: Model.ManyToManyRelation,
                modelClass: Movie,
                join: {
                    from: 'person.id',
                    through: {
                        from: 'movie_person.personId',
                        to: 'movie_person.movieId'
                    },
                    to: 'movie.id'
                }
            }
        };
    }
}

module.exports = Person;