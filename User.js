const db = require('pouchdb')('users')
console.log('Starting pouchDB using ' + db.adapter + ' adapter')
module.exports = db