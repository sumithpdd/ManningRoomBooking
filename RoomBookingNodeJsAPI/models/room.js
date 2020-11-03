'use strict'

const { Model } = require('objection');
const Layout = require('./layout');
const RoomLayout = require('./roomlayout');

class Room extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'room'
    }

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    // static get jsonSchema() {
    //         return {
    //             type: 'object',
    //             properties: {
    //                 id: { type: 'integer' },
    //                 name: { type: 'string', minLength: 1, maxLength: 255 },
    //                 location: { type: 'string', minLength: 1, maxLength: 255 }
    //             }
    //         }
    //     }
    // This object defines the relations to other models.
    static get relationMappings() {
        // One way to prevent circular references
        // is to require the model classes here.
        const roomlayout = require('./roomlayout')

        return {
            capacities: {
                relation: Model.ManyToManyRelation,
                modelClass: Layout,
                roomlayout,
                join: {
                    from: 'room.id',
                    through: {
                        from: 'roomlayout.roomid',
                        to: 'roomlayout.layoutid',
                        extra: ['capacity']
                    },
                    to: 'layout.id'
                }
            }
        }
    }
}

module.exports = Room