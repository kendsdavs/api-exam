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
        }
    }
};

dalNoSQL.createView(ddoc2, function(err, data) {
    if (err)
        return console.log(err)
    if (data) {
        console.log(data)
    }
})
