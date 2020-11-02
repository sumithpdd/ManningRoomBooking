const { Model } = require('objection');

class Review extends Model {
    static get tableName() {
        return 'review';
    }

    static get relationMappings() {
        const Person = require("./person");
        const Movie = require("./movie");
        return {
            reviewer: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: 'review.reviewerId',
                    to: 'person.id'
                }
            },
            movie: {
                relation: Model.HasManyRelation,
                modelClass: Movie,
                join: {
                    from: 'review.movieId',
                    to: 'movie.id'
                }
            }
        };
    }
}

module.exports = Review;