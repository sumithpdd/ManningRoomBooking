 const { Model } = require('objection');
 const Person = require("./person");
 const Review = require('./review');
 // Person model.
 class Movie extends Model {
     static get tableName() {
         return 'movie';
     }

     static get relationMappings() {
         return {
             actors: {
                 relation: Model.ManyToManyRelation,
                 modelClass: Person,
                 join: {
                     from: 'movie.id',
                     through: {
                         from: 'movie_Person.movieId',
                         to: 'movie_Person.personId'
                     },
                     to: 'person.id'
                 }
             },
             reviews: {
                 relation: Model.HasManyRelation,
                 modelClass: Review,
                 join: {
                     from: 'movie.id',
                     to: 'review.movieId'
                 }
             }

         };
     }
 }

 module.exports = Movie;