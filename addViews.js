const dalNoSQL = require('./DAL/no-sql.js')

var ddoc = {
    _id: '_design/daypack',
    views: {
        daypack: {
            map: function(doc) {
                if (doc.type === 'daypack') {
                    emit(doc.name + doc._id);
                }
            }.toString()
        },
        instock: {
            map: function(doc) {
                if (doc.in_stock === true && doc.type === "daypack") {
                    emit(doc.name);
                }
            }.toString()
        }
    }
};

var ddoc2 = {
    _id: '_design/multiday',
    views: {
        multiday: {
            map: function(doc) {
                if (doc.type === 'multiday') {
                    emit(doc.name + doc._id);
                }
            }.toString()
        },
        instock: {
            map: function(doc) {
                if (doc.in_stock === true && doc.type === "multiday") {
                    emit(doc.name);
                }
            }.toString()
        }
    }
};

var ddoc3 = {
    _id: '_design/instock',
    views: {
        instock: {
            map: function(doc) {
                if (doc.in_stock === true) {
                    emit(doc.name);
                }
            }.toString()
        }
    }
};

dalNoSQL.createView(ddoc3, function(err, data) {
    if (err)
        return console.log(err)
    if (data) {
        console.log(data)
    }
})

// dalNoSQL.createView(ddoc2, function(err, data) {
//     if (err)
//         return console.log(err)
//     if (data) {
//         console.log(data)
//     }
// })
// dalNoSQL.createView(ddoc, function(err, data) {
//     if (err)
//         return console.log(err)
//     if (data) {
//         console.log(data)
//     }
// })
