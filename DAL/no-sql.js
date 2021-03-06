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
    listMultiday: listMultiday,
    findInStock: findInStock,
    getAllBackpack: getAllBackpack
    //queryBackpackByType:queryBackpackByType
}
////////////////////////
//////Helper Functions//
////////////////////////

function queryDB(sortBy, startKey, limit, callback) {

    if (limit == 'undefined' || limit == null)
        limit = 5

    db.query(sortBy, {
        startkey: startKey,
        limit: limit,
        include_docs: true
    }).then(function(result) {
        if (startKey !== '' && result.rows.length > 0) {
            result.rows.shift();
        }
        return callback(null, result.rows);
    }).catch(function(err) {
        return callback(err);
    });

    // db.query(sortBy, {
    //     include_docs: true,
    //     startkey: startKey,
    //     limit: limit
    // }, function(err, results) {
    //     if (err)
    //         return callback(err)
    //     if (results)
    //         return callback(null, results.rows)
    // })
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
function getAllBackpack(data, callback) {
    if (data.hasOwnProperty('type') !== true)
        db.allDocs({include_docs: true, startkey: 'daypack'}).then(function(response) {
            if (response.rows.length > 0) {
                response.rows.shift();
            }
            return callback(null, response.rows);
        }).catch(function(err) {
            return callback(err);
        });
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
function findInStock(sortBy, startKey, limit, callback) {
    queryDB(sortBy, startKey, limit, callback)
}

// function queryBackpackByType(type, callback) {
//         db.query(type, {
//             include_docs: true
//         }, function (err, data) {
//             if (err) return callback(err)
//             callback(null, data)
//         })
//     }
// function findInStock(couchView, type, callback) {
//    db.query(couchView, {
//        include_docs: true,
//        key: type
//    }, function(err, res) {
//        if (err) {
//            return callback(err)
//        }
//        if (res) {
//            callback(null, res)
//            //callback(null, queryRows.rows.map(row => row.doc.team))
//            //callback(null, queryRows)
//        })
// }

module.exports = dal;
