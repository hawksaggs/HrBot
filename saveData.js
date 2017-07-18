var Promise = require('bluebird');

module.exports = {
    save: function (saveInfo) {
        return new Promise(function (resolve) {
            var data = saveInfo;

            var mysql = require('mysql');
            var con = mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            });
            con.connect(function (err) {

                var info = {
                    name: saveInfo.name,
                    email: saveInfo.email,
                    contact: saveInfo.phone,
                    experience: saveInfo.experience,
                    company: 'testtestetst',
                    profile: saveInfo.profile,
                    ctc: saveInfo.ctc,
                    ectc: saveInfo.ectc,
                    notice: saveInfo.notice,
                };
                var query = con.query('INSERT INTO candidates SET ?', info, function (err, result) {
                    //console.log(query + '******************');
                });
            });
            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(data); }, 1000);
        });
    }
};