'use strict'

const { Model } = require('objection')

class Layout extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'layout'
    }

}

module.exports = Layout