'use strict'

const { Model } = require('objection')

class User extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'users'
    }
    static modifiers = {
        defaultSelects(query) {
            query.select('id', 'name', 'username');
        },

    };
    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 1, maxLength: 255 }
            }
        }
    }
}

module.exports = User