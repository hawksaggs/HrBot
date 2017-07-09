// This loads the environment variables from the .env file
require('dotenv-extended').load();

var util = require('util');
var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {

    if (session.message && session.message.value) {
        // A Card's Submit Action obj was received
        processSubmitAction(session, session.message.value);
        return;
    }

    // Display

    var card = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'content': {
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'type': 'AdaptiveCard',
            'version': '1.0',
            'body': [
                {
                    'type': 'Container',
                    'speak': '<s>Hello!</s><s>I am HR bot</s><s>Are you looking for adding profile info Or give candidate feedback?</s>',
                    'items': [
                        {
                            'type': 'ColumnSet',
                            'columns': [
                                {
                                    'type': 'Column',
                                    'size': 'auto',
                                    'items': [
                                        {
                                            'type': 'Image',
                                            'url': 'https://imerge.in/wp-content/uploads/2016/10/chat_bot_icon.png',
                                            'size': 'medium',
                                            'style': 'person'
                                        }
                                    ]
                                },
                                {
                                    'type': 'Column',
                                    'size': 'stretch',
                                    'items': [
                                        {
                                            'type': 'TextBlock',
                                            'text': 'Hello!',
                                            'weight': 'bolder',
                                            'isSubtle': true
                                        },
                                        {
                                            'type': 'TextBlock',
                                            'text': 'I am HR bot !',
                                            'weight': 'bolder',
                                            'isSubtle': true
                                        },
                                        {
                                            'type': 'TextBlock',
                                            'text': 'Are you looking for adding profile info Or give candidate feedback?',
                                            'wrap': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            'actions': [
                {
                    'type': 'Action.ShowCard',
                    'title': 'Add Profile',
                    'card': {
                        'type': 'AdaptiveCard',
                        'body': [
                            {
                                'type': 'TextBlock',
                                'text': 'Welcome! Please add candidate Profile Information',
                                'speak': '<s>Welcome to HR profile addition Bot!</s>',
                                'weight': 'bolder',
                                'size': 'large'
                            },
                            //name
                            {
                                'type': 'TextBlock',
                                'text': 'What is the name of the Candidate ?:'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'name',
                                'style': 'text'
                            },
                            //------------///
                            //contact
                            {
                                'type': 'TextBlock',
                                'text': 'Please fill the contact details ?:'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'contact',
                                'style': 'text'
                            },
                            //------------///
                            //email
                            {
                                'type': 'TextBlock',
                                'text': 'Please enter the Email ID ?:'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'email',
                                'style': 'text'
                            },
                            //------------///
                            //experience
                            {
                                'type': 'TextBlock',
                                'text': 'What is the total relevant experience ?:'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'experience',
                                'style': 'text'
                            },
                            //------------///
                            //company
                            {
                                'type': 'TextBlock',
                                'text': 'Current Company Name ?:'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'company',
                                'style': 'text'
                            },
                            //------------///
                            //profile
                            {
                                'type': 'TextBlock',
                                'text': 'Current Profile ?:'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'profile',
                                'style': 'text'
                            },
                            //------------///
                            //CTC
                            {
                                'type': 'TextBlock',
                                'text': 'What is the current CTC?:'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'ctc',
                                'style': 'text'
                            },
                            //------------///
                            //expected CTC
                            {
                                'type': 'TextBlock',
                                'text': 'What is the Expected CTC ?:'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'ectc',
                                'style': 'text'
                            },
                            //------------///
                            //notice period
                            {
                                'type': 'TextBlock',
                                'text': 'What is the Notice Period in current Organization ?:'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'notice',
                                'style': 'text'
                            },
                            //------------///
                        ],
                        'actions': [
                            {
                                'type': 'Action.Submit',
                                'title': 'Add Profile',
                                'data': {
                                    'type': 'addProfile'
                                }
                            }
                        ]
                    }
                },
                {
                    'type': 'Action.ShowCard',
                    'title': 'Feedback',
                    'card': {
                        'type': 'AdaptiveCard',
                        'body': [
                            //email
                            {
                                'type': 'TextBlock',
                                'text': 'Enter email of the Employee ?:'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'email',
                                'style': 'text'
                            }
                        ],
                        'actions': [
                            {
                                'type': 'Action.Submit',
                                'title': 'Submit',
                                'data': {
                                    'type': 'submitFeedback'
                                }
                            }
                        ]
                    }

                }
            ]
        }
    };

    var msg = new builder.Message(session)
        .addAttachment(card);
    session.send(msg);
});

bot.on('conversationUpdate', function (message) {
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .speak('Welcome to HR Bot')
                        .address(message.address)
                        .text('Welcome to HR Bot.');
                    bot.send(reply);
                }
            });
        }
    });

bot.dialog('add-profile', require('./add-profile'));
bot.dialog('get-feedback', require('./get-feedback'));

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});

function processSubmitAction(session, value) {
    // var defaultErrorMessage = 'Please complete all the search parameters';

    switch (value.type) {
        case 'addProfile':
            if (validateProfile(value)) {
                session.beginDialog('add-profile', value);
            } else {
                session.send(value.name + "'s Profile is already Exist");
            }
            break;

        case 'submitFeedback':
            validateEmail(value, function (err, result) {
                if (result) {
                    session.beginDialog('get-feedback', value);
                    // break;
                } else {
                    session.send(value.email + "'s Profile Does Not Exist");
                }
                //break;
            });

        case 'addfeedback':
            console.log('innnnnnn');
            // if (addUserFeedBack(value)) {
            //     session.beginDialog('add-profile', value);
            // } else {
            //     session.send(value.name + "'s Profile is already Exist");
            // }
            break;


        default:
        // A form data was received, invalid or incomplete since the previous validation did not pass
        //session.send(defaultErrorMessage);
    }
}

function validateProfile(profileInfo) {
    if (!profileInfo) {
        return false;
    }

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hrbot"
    });
    var nameExist = false;
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT COUNT(*) FROM candidates where 'email' like '%" + profileInfo.name + "%'", function (err, result, fields) {
            if (err) throw err;

            if (result) {
                nameExist = true;
            }
        });
    });
    return !nameExist;
}

function addUserFeedBack(feedBackInfo) {

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hrbot"
    });
    console.log('******************');
    // var info = {
    //     name: saveInfo.name,
    //     email: saveInfo.email,
    //     contact: saveInfo.contact,
    //     experience: saveInfo.experience,
    //     company: saveInfo.company,
    //     profile: saveInfo.profile,
    //     ctc: saveInfo.ctc,
    //     ectc: saveInfo.ectc,
    //     notice: saveInfo.notice,
    // };
    // var query = con.query('INSERT INTO candidates SET ?', info, function (err, result) {
    //     if (err) throw err;
    // });
}

function validateEmail(userEmail, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hrbot"
    });
    con.connect(function (err) {
        if (err) return callback(err);
        con.query("SELECT email FROM candidates where email like '%" + userEmail.email + "%'", function (err, result, fields) {
            if (err) return callback(err);

            if (result.length > 0) {
                return callback(null, true);
            } else {
                return callback(null, false);
            }
        });
    });
}