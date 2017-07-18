// This loads the environment variables from the .env file
require('dotenv-extended').load();

var util = require('util');
var builder = require('botbuilder');
var restify = require('restify');
var _ = require('lodash');
var request = require('request');
var outlook = require("node-outlook");
var emailValidator = require("email-validator");
var mysql = require('mysql');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: 'de1a4fa9-430f-46ca-b631-6737582a7ae9',
    appPassword: 'fhrcyWBzgPpWbsygyz9N4zn'
});
var con = mysql.createConnection({
        host: '34.211.237.226',
        user: 'bot_teamn',
        password: 'bot@teamn%$#321',
        database: 'hrbots'
    });
server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector);
// var bot = new builder.UniversalBot(connector, function (session) {

//     if (session.message && session.message.value) {
//         // A Card's Submit Action obj was received
//         processSubmitAction(session, session.message.value);
//         return;
//     }

//     // Display

//     var card = {
//         'contentType': 'application/vnd.microsoft.card.adaptive',
//         'content': {
//             '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
//             'type': 'AdaptiveCard',
//             'version': '1.0',
//             'body': [
//                 {
//                     'type': 'Container',
//                     'speak': '<s>Hello!</s><s>I am HR bot</s><s>Are you looking for adding profile info Or give candidate feedback?</s>',
//                     'items': [
//                         {
//                             'type': 'ColumnSet',
//                             'columns': [
//                                 {
//                                     'type': 'Column',
//                                     'size': 'auto',
//                                     'items': [
//                                         {
//                                             'type': 'Image',
//                                             'url': 'https://imerge.in/wp-content/uploads/2016/10/chat_bot_icon.png',
//                                             'size': 'medium',
//                                             'style': 'person'
//                                         }
//                                     ]
//                                 },
//                                 {
//                                     'type': 'Column',
//                                     'size': 'stretch',
//                                     'items': [
//                                         {
//                                             'type': 'TextBlock',
//                                             'text': 'Hello!',
//                                             'weight': 'bolder',
//                                             'isSubtle': true
//                                         },
//                                         {
//                                             'type': 'TextBlock',
//                                             'text': 'I am HR bot !',
//                                             'weight': 'bolder',
//                                             'isSubtle': true
//                                         },
//                                         {
//                                             'type': 'TextBlock',
//                                             'text': 'Are you looking for adding profile info Or give candidate feedback?',
//                                             'wrap': true
//                                         }
//                                     ]
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ],
//             'actions': [
//                 {
//                     'type': 'Action.ShowCard',
//                     'title': 'Add Profile',
//                     'card': {
//                         'type': 'AdaptiveCard',
//                         'body': [
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'Welcome! Please add candidate Profile Information',
//                                 'speak': '<s>Welcome to HR profile addition Bot!</s>',
//                                 'weight': 'bolder',
//                                 'size': 'large'
//                             },
//                             //name
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'What is the name of the Candidate ?:'
//                             },
//                             {
//                                 'type': 'Input.Text',
//                                 'id': 'name',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //contact
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'Please fill the contact details ?:'
//                             },
//                             {
//                                 'type': 'Input.Number',
//                                 'id': 'contact',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //email
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'Please enter the Email ID ?:'
//                             },
//                             {
//                                 'type': 'Input.Text',
//                                 'id': 'email',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //experience
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'What is the total relevant experience ?:'
//                             },
//                             {
//                                 'type': 'Input.Number',
//                                 'id': 'experience',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //company
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'Current Company Name ?:'
//                             },
//                             {
//                                 'type': 'Input.Text',
//                                 'id': 'company',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //profile
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'Current Profile ?:'
//                             },
//                             {
//                                 'type': 'Input.Number',
//                                 'id': 'profile',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //CTC
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'What is the current CTC?:'
//                             },
//                             {
//                                 'type': 'Input.Number',
//                                 'id': 'ctc',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //expected CTC
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'What is the Expected CTC ?:'
//                             },
//                             {
//                                 'type': 'Input.Number',
//                                 'id': 'ectc',
//                                 'style': 'text'
//                             },
//                             //------------///
//                             //notice period
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'What is the Notice Period in current Organization ?:'
//                             },
//                             {
//                                 'type': 'Input.Number',
//                                 'id': 'notice',
//                                 'style': 'text'
//                             },
//                             //------------///
//                         ],
//                         'actions': [
//                             {
//                                 'type': 'Action.Submit',
//                                 'title': 'Add Profile',
//                                 'data': {
//                                     'type': 'addProfile'
//                                 }
//                             }
//                         ]
//                     }
//                 },
//                 {
//                     'type': 'Action.ShowCard',
//                     'title': 'Feedback',
//                     'card': {
//                         'type': 'AdaptiveCard',
//                         'body': [
//                             //email
//                             {
//                                 'type': 'TextBlock',
//                                 'text': 'Enter email of the Candidate ?:'
//                             },
//                             {
//                                 'type': 'Input.Text',
//                                 'id': 'email',
//                                 'style': 'text'
//                             }
//                         ],
//                         'actions': [
//                             {
//                                 'type': 'Action.Submit',
//                                 'title': 'Submit',
//                                 'data': {
//                                     'type': 'submitFeedback'
//                                 }
//                             }
//                         ]
//                     }

//                 }
//             ]
//         }
//     };

//     var msg = new builder.Message(session)
//         .addAttachment(card);
//     session.send(msg);
// });

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                var reply = new builder.Message()
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
    var defaultErrorMessage = 'Please complete all the search parameters';

    switch (value.type) {
        // add profile here
        case 'addProfile':
            if (validateProfile(value)) {
                session.beginDialog('add-profile', value);
            } else {
                session.send(value.name + "'s Profile is already Exist");
            }
            break;

        case 'addfeedback':
            if (addUserFeedBack(value)) {
                session.send('Feedback Added Successfully. Thank You!!');
                // session.beginDialog('Feedback Added Successfully. Thank You!!');
            } else {
                session.send('Feedback Added Successfully. Thank You!!');
                // session.beginDialog('Feedback Added Successfully. Thank You!!');
            }
            break;

        case 'submitFeedback':
            validateEmail(value, function (err, result) {
                if (result) {
                    session.beginDialog('get-feedback', value);
                } else {
                    session.send(value.email + "'s Profile Does Not Exist");
                }
                break;
            });

        default:
        // A form data was received, invalid or incomplete since the previous validation did not pass
        session.send(defaultErrorMessage);
    }
}

bot.dialog('/', [
    function(session){
        session.say('I can help u in HR BOT');
        builder.Prompts.choice(session,
            'Are you looking for adding profile info Or give candidate feedback?',
            ['Add Profile', 'Candidate Feedback'],
            {listStyle: builder.ListStyle.button});
    },
    function(session, result){
        if(result.response.entity.toLowerCase() == 'add profile'){
            session.beginDialog('addProfile');
        } else if(result.response.entity.toLowerCase() == 'candidate feedback'){
            session.beginDialog('candidateFeedback');
        } else {
            session.replaceDialog('/', {isReprompt: true});
        }
    }
]);

bot.dialog('addProfile', [
    function(session) {
        session.conversationData.add = {};
        builder.Prompts.text(session, 'What is the email of the Candidate ?:');
    },
        function(session, results) {
            if(results.response){
                var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                var otpEmail = regexEmail.test(results.response);
                if(otpEmail === true) {
                    session.conversationData.email = results.response;
                    builder.Prompts.text(session, 'What is the name  of the Candidate ?:');
                } else {
                    session.beginDialog('addProfile');
                }
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                session.conversationData.name = results.response;
                builder.Prompts.text(session, 'Please fill the contact details ?:');
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.phone = results.response;
                    builder.Prompts.text(session, 'What is the total relevant experience ?:');
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.experience = results.response;
                    builder.Prompts.text(session, 'Current Profile ?:');
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.profile = results.response;
                    builder.Prompts.text(session, 'What is the current CTC(in lakh) ?:');
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.ctc = results.response;
                    builder.Prompts.text(session, 'What is the Expected CTC(in lakh) ?:');
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.ectc = results.response;
                    builder.Prompts.text(session, 'What is Notice Period(in days) ?:');
            } else {
                session.beginDialog('addProfile');
            }
        },
        function(session, results) {
            if(results.response){
                session.conversationData.notice = results.response;
                var info = {
                        name: session.conversationData.name,
                        email: session.conversationData.email,
                        contact: session.conversationData.phone,
                        experience: session.conversationData.experience,
                        company: 'testtestetst',
                        profile: session.conversationData.profile,
                        ctc: session.conversationData.ctc,
                        ectc: session.conversationData.ectc,
                        notice: session.conversationData.notice,
                };
                con.connect(function (err) {
                    //if (err) return callback(err);
        console.log('+++++&&&&&&&++++');
                        console.log(err);
                    con.query('INSERT INTO candidates SET ?', info, function (err, result) {
                        console.log('+++++++++');
                        console.log(err);
                        session.say(session.conversationData.name + 'Profile Information saved successfully');
                        session.beginDialog('/');
                    });
                });
            } else {
                session.beginDialog('/');
            }
        }
]);

bot.dialog('candidateFeedback', [
    function(session) {
        session.conversationData.add = {};
        builder.Prompts.text(session, 'What is the email of the Candidate for which You want to give Feedback ?:');
    },
        function(session, results) {
            if(results.response) {
                var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                var otpEmail = regexEmail.test(results.response);
                if(otpEmail === true) {
                    con.query("SELECT id, email FROM candidates where email like '%" + results.response + "%'", function (err, result, fields) {
                    // if (err) return callback(err);
                        if (result.length > 0) {
                            session.conversationData.email = results.response;
                            session.conversationData.candidate_id = result[0].id;
                            builder.Prompts.text(session, 'What his/her relevant experience in the technology? :');
                        } else {
                            session.beginDialog('candidateFeedback');
                        }
                    });
                } else {
                    session.beginDialog('candidateFeedback');
                }
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                session.conversationData.experience = results.response;
                builder.Prompts.text(session, 'Name the current technologies used in projects ?:');
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.current_tech = results.response;
                    builder.Prompts.text(session, 'What is the duration of the current projects ?:');
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.duration = results.response;
                    builder.Prompts.text(session, 'Are he/she familiar with any other new technologies ?:');
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.familier = results.response;
                    builder.Prompts.text(session, 'Is he/she having ability to learn new technologies ?:');
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.new_tech = results.response;
                    builder.Prompts.text(session, 'What his/her behavior during the interview process ?:');
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                    session.conversationData.behaviour = results.response;
                    builder.Prompts.text(session, 'How was the communication skills ?:');
            } else {
                session.beginDialog('candidateFeedback');
            }
        },
        function(session, results) {
            if(results.response){
                session.conversationData.communication = results.response;
                var feedInfo = {
                        candidate_id : session.conversationData.candidate_id,
                        experience: session.conversationData.experience,
                        current_tech: session.conversationData.current_tech,
                        duration: session.conversationData.duration,
                        familier: session.conversationData.familier,
                        new_tech: session.conversationData.new_tech,
                        behaviour: session.conversationData.behaviour,
                        communication: session.conversationData.communication,
                };
                    
                con.connect(function (err) {
                    
                    con.query('INSERT INTO feedbacks SET ?', feedInfo, function (err, result) {

                        session.say('Candidate Feedback Information saved successfully');
                    });
                });
            } else {
                session.beginDialog('/');
            }
        }
]);