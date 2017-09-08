const { MongoDB } = require('mongodb');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/onegorilla');

// Mongoose Schema DB
const Record = mongoose.model('Record', {
    name: {
        type: String,
        minlength: 5
    }, 
    email: {
       type: String,
       minlength: 5 
    },
    valueN: {
        type: Number,
        minlength: 1
    },
    valueM: {
        type: String,
        minlength: 1
    },
    result: {
        type: Boolean,
        default: "false"
    }
});

module.exports = function(app, db) {
    // Error handling
    const sendError = (err, res) => {
        response.message = typeof err == 'object' ? err.message : err;
        res.status(501).json(response);
    };

    // Response handling
    let response = {
        status: 200,
        data: [],
        message: null
    };

    // Get Records
    app.get('/api/records', (req, res) => {
        Record.find({}).then(record => {
            if(!record){
                response.message = "Records no found.";
                res.status(200).send(response);
            }
            response.data = [];
            response.status = 200;
            response.data = record;
            response.message = "success";  
            res.status(200).send(response);
        }).catch(error => {
            response.data = [];
            response.status = 501;
            res.status(501).send(sendError(error, res));
        });
    });

    // Create Record
    app.post('/api/records', (req, res) => {
        let body = req.body;
        let verifyResult = body.valueM.split(",");
        if(verifyResult.length == 1) {
            if(parseInt(body.valueN) == parseInt(body.valueM)) {
                body.result = "true";
            }
        } else {
            for(let i = 0; i < verifyResult.length; i++) {
                let sum = parseInt(verifyResult[i]) + parseInt(verifyResult[i+1]);
                if(sum == parseInt(body.valueN) || verifyResult[i] == body.valueN) {
                    body.result = "true";
                }
            }
        }

        const newRecord = new Record(body);
        Record.find({ 'email': req.body.email }, function(err, record){
            if(err) {
                response.data = [];
                response.status = 501;
                res.status(501).send(sendError(error, res));
            }

            if(record.length!=0) {
                response.data = [];
                response.status = 501;
                res.status(501).send(sendError('email already exists', res));
            } else {
                newRecord.save().then(() => {
                    response.data = body;
                    response.status = 200;
                    response.message = "success";
                    res.send(response);
                    console.log(marico, response);
                }).catch(err => {
                    response.data = [];
                    response.status = 501;
                    res.send(sendError(err, res));
                });
            }
        });
    });
}