var botkit = require('botkit');
var exec = require('child_process').exec;

var SLACK_TOKEN = process.env.SLACK_TOKEN;

var controller = botkit.slackbot({
    debug: false
});

controller.spawn({
    token: SLACK_TOKEN
}).startRTM();

controller.hears(['^bot\\s+uptime'],
        ['message_received', 'ambient'],
        function(bot, message) {
            exec(__dirname + '/uptime.sh', function(err, stdout, stderr){
                if (err) { console.log(err); }
                var fields = JSON.parse(stdout);
                var attachments = [{
                    fields: fields,
                }]
                return bot.reply(message, {
                    attachments: attachments,
                    icon_emoji: ':bar_chart:',
                    username: 'uptime bot',
                })
            });
        })
