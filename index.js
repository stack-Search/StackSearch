'use strict';

const Alexa = require('alexa-sdk');
var http = require("http");
const aws = require('aws-sdk');
const deepai_api_key = 'e4402912-b41b-42af-8a76-356f798986c6'; // is also free-tier and as such we do not require this in the future.
const request = require('request');

const APP_ID = "amzn1.ask.skill.773968b1-1359-4506-80ce-4217a46dad68"; // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            // TODO: Update these messages to customize.
            SKILL_NAME: 'Stack Search',
            WELCOME_MESSAGE: "Welcome to %s. You can ask a question like, what\'s blockchain? ... Now, what can I help you with?",
            WELCOME_REPROMPT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: 'Stack Search',
            HELP_MESSAGE: "You can ask questions such as, what\'s bubblesort, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMPT: "You can say things like, what\'s bubblesort, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
            RECIPE_REPEAT_MESSAGE: 'Try saying repeat.',
            NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know ",
        },
    },
};

// HELPERS ------------------------------------------------------------------------------------

// Search refers to the string given
function jsonapi (search, callback){
    var stackexchange = require('stackexchange-node');
    var options = { version: 2.2 };
    var context = new stackexchange(options);
    var re=/<pre><code>([\s\S]*?)<\/code><\/pre>/gm;
    var re2=/<(.*?)>/g;
    var m;
    var complete = {
        concept: [],
        code: [],
        title: '',
        is_code: false
    };
    var filter = {
        pagesize: 1,
        sort: 'relevance',
        order: 'desc',
        q: search,
        filter: '!)R7_YdluAAl180(njTbqNhsH' // WHAT IS THIS MONSTROSITY
    };
    context.search.advanced(filter, function (err, results){
        //console.log(results);
        if (err) throw err;
        var s;
        for(var i=0;i<results.items[0].answers.length;i++){
            if(results.items[0].answers[i].is_accepted){
                s=results.items[0].answers[i].body;
                break;
            }
        }
        complete.title=results.items[0].title;
        m=s.split(re);
        for(var i=0; i<m.length; i++){
            if(i%2==0){
                complete.concept.push(m[i]);
            }else{
                complete.code.push(m[i]);
            }
        }
        complete.is_code = complete.code.length > 0;
        for(var i=0; i<complete.concept.length;i++){
            while(re2.test(complete.concept[i])){
                complete.concept[i]=complete.concept[i].replace(re2," ");
            }
            while(/\n|\r/g.test(complete.concept[i])){
                complete.concept[i]=complete.concept[i].replace(/\n|\r/g," ");
            }
        }
        //console.log(complete);
        callback(complete);
    });
}

//  --------------------------------------------------------------------------------------------
const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    // Search is in quotes for good reason
    'Search': function () {
        const param = this.event.request.intent.slots.stackquery.value;
        let speech = "";
        
        if (param === "which equals operator should be used in JavaScript comparisons") {
            speech = "The identity (===) operator behaves identically to the equality (==) operator except no type conversion is done, and the types must be the same to be considered equal.";
        } else if (param === "what is the difference between git pull and git fetch") {
            speech = "In the simplest terms, git pull does a git fetch followed by a git merge. You can do a git fetch at any time to update your remote-tracking branches under refs/remotes/your remote id/.";
        } 

        //if predefined, we exit early
        if (speech !== "") {
            this.response.speak(speech);
            this.emit(':responseReady');
        }
        // else we bind the context to the function
        jsonapi.bind(this);
        jsonapi(param, function (data) {
            speech = data.concept[0]
            this.response.speak(speech);
            this.emit(':responseReady');
            return;
        });
     //a0dc57e6bab505c2d0a3058105c8e9462c142f3c what even is this
    },
    
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak("Goodbye!");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak("Goodbye!");
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended: ${this.event.request.reason}`);
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
