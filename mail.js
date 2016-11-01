var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://sqhtiamo%40163.com:passwd@smtp.163.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"sqhtiamo" <sqhtiamo@163.com>', // sender address
    to: 'sqhtiamo@163.com'  , // list of receivers
    subject: '微信状态改变', // Subject line
    text: '微信状态改变', // plaintext body
    html: '微信状态已经发生改变，不再为覆盖现网审核中' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
