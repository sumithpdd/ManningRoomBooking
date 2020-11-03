'use strict'

const { Model } = require('objection')

class RoomLayout extends Model {
    // Table name is the only required property.
    static get tableName() {
            return 'roomlayout'
        }
        // Optional JSON schema. This is not the database schema! Nothing is generated
        // based on this. This is only used for validation. Whenever a model instance
        // is created it is checked against this schema. http://json-schema.org/.
        // static get jsonSchema() {
        //     return {
        //         type: 'object',
        //         properties: {
        //             roomid: { type: 'integer' },
        //             layoutid: { type: 'integer' },
        //             capacity: { type: 'integer' },
        //         }
        //     }
        // }


}

module.exports = RoomLayout