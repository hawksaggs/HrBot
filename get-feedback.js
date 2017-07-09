var util = require('util');
var _ = require('lodash');
var builder = require('botbuilder');
var Save = require('./saveFeedbackData');

module.exports = function save(session) {

    var card = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'content': {
            'type': 'AdaptiveCard',
            'body': [
                {
                    'type': 'TextBlock',
                    'text': 'What his/her relevant experience in the technology?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'experience',
                    'style': 'text'
                },
                {
                    'type': 'TextBlock',
                    'text': 'Name the current technologies used in projects?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'current_tech',
                    'style': 'text'
                },
                {
                    'type': 'TextBlock',
                    'text': 'What is the duration of the current projects he/she used the technology?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'duration',
                    'style': 'text'
                },
                {
                    'type': 'TextBlock',
                    'text': 'Are he/she familiar with any other new technologies?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'familier',
                    'style': 'text'
                },
                {
                    'type': 'TextBlock',
                    'text': 'Is he/she having ability to learn new technologies?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'new_tech',
                    'style': 'text'
                },
                {
                    'type': 'TextBlock',
                    'text': 'What his/her behavior during the interview process?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'behaviour',
                    'style': 'text'
                },
                {
                    'type': 'TextBlock',
                    'text': 'How was the communication skills?:'
                },
                {
                    'type': 'Input.Text',
                    'id': 'communication',
                    'style': 'text'
                }
            ],
            'actions': [
                {
                    'type': 'Action.Submit',
                    'title': 'Add Feedback',
                    'data': {
                        'type': 'addfeedback'
                    }
                }
            ]
        }
    };


    var msg = new builder.Message(session)
        .addAttachment(card);
    session.send(msg);

};