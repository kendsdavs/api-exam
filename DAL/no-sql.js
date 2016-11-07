const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');

var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'});
const urlFormat = require('url').format;
const db = new PouchDB(urlFormat(config.get("couch")));

const dal = {
    createBackpack: createBackpack,
    getBackpack: getBackpack,
    createView: createView,
    listDaypacks: listDaypacks,
    listMultiday: listMultiday
}
////////////////////////
//////Helper Functions//
////////////////////////

function queryDB(sortBy, startKey, limit, callback) {

    if (limit == 'undefined' || limit == null)
        limit = 5

    db.query(sortBy, {
        include_docs: true,
        startkey: startKey,
        limit: limit
    }, function(err, results) {
        if (err)
            return callback(err)
        if (results)
            return callback(null, results)
    })
}

////////////////////////
////Exported Functions//
////////////////////////
function createBackpack(data, callback) {
    if (data.hasOwnProperty('name') !== true) {
        return callback(new Error('Missing name property from data'))
    }
    if (data.hasOwnProperty('type') !== true) {
        return callback(new Error('Missing type property from data'))
    }

    data._id = data.type + '_' + data.name.replace(/ /g, "_")

    db.put(data, function(err, response) {
        if (err) {
            return callback(err)
        }
        return callback(null, response)
    })
}

function getBackpack(data, callback) {
    db.get(data, function(err, response) {
        if (err) {
            console.log(err.message)
            return callback(err.message)
        }
        if (response) {
            console.log(response)
            return callback(null, response)
        }
    })
}
function createView(designDoc, callback) {
    if (typeof designDoc == "undefined" || designDoc === null) {
        return callback(new Error('400Missing design document.'));
    } else {
        db.put(designDoc, function(err, response) {
            if (err)
                return callback(err);
            if (response)
                return callback(null, response);
            }
        );
    }
}

function listDaypacks(sortBy, startKey, limit, callback) {
    queryDB(sortBy, startKey, limit, callback)
}

function listMultiday(sortBy, startKey, limit, callback) {
    queryDB(sortBy, startKey, limit, callback)
}


module.exports = dal;
