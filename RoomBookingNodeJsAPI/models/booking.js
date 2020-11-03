'use strict'

const { Model } = require('objection')

class Booking extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'booking'
    }

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    // static get jsonSchema() {
    //     return {
    //         type: 'object',
    //         required: ['name'],

    //         properties: {
    //             id: { type: 'integer' },
    //             title: { type: 'string', minLength: 1, maxLength: 255 },
    //             bookingdate: { type: 'date', minLength: 1, maxLength: 255 },
    //             starttime: { type: 'date', minLength: 1, maxLength: 255 },
    //             endtime: { type: 'date', minLength: 1, maxLength: 255 },
    //             participants: { type: ['integer'] },
    //         }
    //     }
    // }

    // This object defines the relations to other models.
    static get relationMappings() {
        // One way to prevent circular references
        // is to require the model classes here.
        const room = require('./room')
        const user = require('./user')

        return {
            room: {
                relation: Model.BelongsToOneRelation,

                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one.
                modelClass: room,

                join: {
                    from: 'booking.room',
                    to: 'room.id'
                }
            },

            user: {
                relation: Model.BelongsToOneRelation,

                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one.
                modelClass: room,

                join: {
                    from: 'booking.user',
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = Booking