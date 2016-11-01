var webPage = require('webpage');
var fs = require('fs')
var page = webPage.create();

var process = require("child_process")
var spawn = process.spawn
var execFile = process.execFile

// configuration
var user = 'username';
var passwd = 'passwd';

function sendMail() {
	var child = spawn('node', ['mail.js']);

	child.stdout.on("data", function (data) {
	  console.log("spawnSTDOUT:", JSON.stringify(data))
	});

	child.stderr.on("data", function (data) {
	  console.log("spawnSTDERR:", JSON.stringify(data))
	});

	child.on("exit", function (code) {
	  console.log("spawnEXIT:", code)
	})
}

page.onConsoleMessage = function(msg) {
	console.log(msg);
}

page.onResourceRequested = function(requestData, networkRequest) {
	if ((/cgi-bin\/applist/gi).test(requestData['url'])) {
		setTimeout(function() {
			var txt = page.evaluate(function() {
				var em = $("tr[data-id='wxf4b748308354bd01'] .status em");
				console.log(em.text());
				return em.text();

			});

			if (txt !== '覆盖现网审核中') {
				sendMail();
			}

			setTimeout(function(){
				phantom.exit();
			},10000);
		}, 3000);


	}

};


page.open('https://open.weixin.qq.com/', function(s) {


	function main(cal) {
		page.evaluate(function() {
			// 获取页面头部登陆按钮
			var login = $('#loginBarBt');

				// 点击
			login.trigger('click');

			setTimeout(function() {
				// 获取弹出框中的账号和密码元素
				var account = $('.login_panel input[name=account]');
				var pwd = $('.login_panel input[name=passwd]');

				// 输入账号和密码
				account.val(user);
				pwd.val(passwd);

				// 获取登陆框中的登陆按钮
				var toLogin = $('.login_panel .btn_login')

				toLogin.trigger('click');

				cal();
			}, 1000);
		});
	}


	main(function() {
		phantom.exit();
	});
});
