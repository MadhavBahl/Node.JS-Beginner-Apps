const Peer = require('simple-peer'),
      emoticons = require('emoticons'),
      Aria2 = window.Aria2; //require('aria2');

var peer = new Peer({
	initiator: location.hash === '#init',
	trickle: false
}); // Creating Peer
var aria2 = new Aria2({
	host: "127.0.0.1", //process.env.OPENSHIFT_NODEJS_IP,
	port: 6800, //process.env.OPENSHIFT_NODEJS_PORT,
	secure: true,
	secret: '',
	path: '/jsonrpc'
}); // Creating SFTP

var isConn = false, icoChange = false, typing_s = false, typing_p = false, ftp = false, sender = false, sftp = false; // Flag variables
var files = null; // List of Files to be sent
var message = document.getElementById('message'); // Creating node connection

// Connection Starts
peer.on('signal', function(data) {
	document.getElementById('seed').value = JSON.stringify(data);
});

peer.on('connect', function() {
	if (isConn)
		return false;
	document.getElementById('lastseen').innerHTML = 'Online';
	isConn = true;
});

peer.on('close', function() {
	if (!isConn)
		return false;
	document.getElementById('lastseen').innerHTML = 'Offline';
	isConn = false;
});

peer.on('error', function(err) {
	alert(err.toString());
});

document.getElementById('connect').addEventListener('click', function() {
	var peer_id = document.getElementById('peer').value;
	if (isConn || peer_id == '')
		return false;
	var other = JSON.parse(peer_id);
	peer.signal(other);
});

document.getElementById('disconnect').addEventListener('click', function() {
	if (!isConn)
		return false;
	peer.destroy();
	document.getElementById('lastseen').innerHTML = 'Offline';
	isConn = false;
});
// Connection Ends

// Own Function Library
// Escape HTML-special characters
function htmlspecialchar(string) {
    return string.toString();
}

// Checks if there is any non-space character
function hastext(text) {
    if (text.trim().length == 0)
        return false;
    return true;
}

// Replaces the string with smiley
function addSmiley(message) {
	const definition = {"smile":{"title":"Smile","codes":[":)",":=)",":-)"]},"sad-smile":{"title":"Sad Smile","codes":[":(",":=(",":-("]},"big-smile":{"title":"Big Smile","codes":[":D",":=D",":-D",":d",":=d",":-d"]},"cool":{"title":"Cool","codes":["8)","8=)","8-)","B)","B=)","B-)","(cool)"]},"wink":{"title":"Wink","codes":[":o",":=o",":-o",":O",":=O",":-O"]},"crying":{"title":"Crying","codes":[";(",";-(",";=("]},"sweating":{"title":"Sweating","codes":["(sweat)","(:|"]},"speechless":{"title":"Speechless","codes":[":|",":=|",":-|"]},"kiss":{"title":"Kiss","codes":[":*",":=*",":-*"]},"tongue-out":{"title":"Tongue Out","codes":[":P",":=P",":-P",":p",":=p",":-p"]},"blush":{"title":"Blush","codes":["(blush)",":$",":-$",":=$",":\">"]},"wondering":{"title":"Wondering","codes":[":^)"]},"sleepy":{"title":"Sleepy","codes":["|-)","I-)","I=)","(snooze)"]},"dull":{"title":"Dull","codes":["|(","|-(","|=("]},"in-love":{"title":"In love","codes":["(inlove)"]},"evil-grin":{"title":"Evil grin","codes":["]:)",">:)","(grin)"]},"talking":{"title":"Talking","codes":["(talk)"]},"yawn":{"title":"Yawn","codes":["(yawn)","|-()"]},"puke":{"title":"Puke","codes":["(puke)",":&",":-&",":=&"]},"doh!":{"title":"Doh!","codes":["(doh)"]},"angry":{"title":"Angry","codes":[":@",":-@",":=@","x(","x-(","x=(","X(","X-(","X=("]},"it-wasnt-me":{"title":"It wasn't me","codes":["(wasntme)"]},"party":{"title":"Party!!!","codes":["(party)"]},"worried":{"title":"Worried","codes":[":S",":-S",":=S",":s",":-s",":=s"]},"mmm":{"title":"Mmm...","codes":["(mm)"]},"nerd":{"title":"Nerd","codes":["8-|","B-|","8|","B|","8=|","B=|","(nerd)"]},"lips-sealed":{"title":"Lips Sealed","codes":[":x",":-x",":X",":-X",":#",":-#",":=x",":=X",":=#"]},"hi":{"title":"Hi","codes":["(hi)"]},"call":{"title":"Call","codes":["(call)"]},"devil":{"title":"Devil","codes":["(devil)"]},"angel":{"title":"Angel","codes":["(angel)"]},"envy":{"title":"Envy","codes":["(envy)"]},"wait":{"title":"Wait","codes":["(wait)"]},"bear":{"title":"Bear","codes":["(bear)","(hug)"]},"make-up":{"title":"Make-up","codes":["(makeup)","(kate)"]},"covered-laugh":{"title":"Covered Laugh","codes":["(giggle)","(chuckle)"]},"clapping-hands":{"title":"Clapping Hands","codes":["(clap)"]},"thinking":{"title":"Thinking","codes":["(think)",":?",":-?",":=?"]},"bow":{"title":"Bow","codes":["(bow)"]},"rofl":{"title":"Rolling on the floor laughing","codes":["(rofl)"]},"whew":{"title":"Whew","codes":["(whew)"]},"happy":{"title":"Happy","codes":["(happy)"]},"smirking":{"title":"Smirking","codes":["(smirk)"]},"nodding":{"title":"Nodding","codes":["(nod)"]},"shaking":{"title":"Shaking","codes":["(shake)"]},"punch":{"title":"Punch","codes":["(punch)"]},"emo":{"title":"Emo","codes":["(emo)"]},"yes":{"title":"Yes","codes":["(y)","(Y)","(ok)"]},"no":{"title":"No","codes":["(n)","(N)"]},"handshake":{"title":"Shaking Hands","codes":["(handshake)"]},"skype":{"title":"Skype","codes":["(skype)","(ss)"]},"heart":{"title":"Heart","codes":["(h)","<3","(H)","(l)","(L)"]},"broken-heart":{"title":"Broken heart","codes":["(u)","(U)"]},"mail":{"title":"Mail","codes":["(e)","(m)"]},"flower":{"title":"Flower","codes":["(f)","(F)"]},"rain":{"title":"Rain","codes":["(rain)","(london)","(st)"]},"sun":{"title":"Sun","codes":["(sun)"]},"time":{"title":"Time","codes":["(o)","(O)","(time)"]},"music":{"title":"Music","codes":["(music)"]},"movie":{"title":"Movie","codes":["(~)","(film)","(movie)"]},"phone":{"title":"Phone","codes":["(mp)","(ph)"]},"coffee":{"title":"Coffee","codes":["(coffee)"]},"pizza":{"title":"Pizza","codes":["(pizza)","(pi)"]},"cash":{"title":"Cash","codes":["(cash)","(mo)","($)"]},"muscle":{"title":"Muscle","codes":["(muscle)","(flex)"]},"cake":{"title":"Cake","codes":["(^)","(cake)"]},"beer":{"title":"Beer","codes":["(beer)"]},"drink":{"title":"Drink","codes":["(d)","(D)"]},"dance":{"title":"Dance","codes":["(dance)","\o/","\:D/","\:d/"]},"ninja":{"title":"Ninja","codes":["(ninja)"]},"star":{"title":"Star","codes":["(*)"]},"mooning":{"title":"Mooning","codes":["(mooning)"]},"finger":{"title":"Finger","codes":["(finger)"]},"bandit":{"title":"Bandit","codes":["(bandit)"]},"drunk":{"title":"Drunk","codes":["(drunk)"]},"smoking":{"title":"Smoking","codes":["(smoking)","(smoke)","(ci)"]},"toivo":{"title":"Toivo","codes":["(toivo)"]},"rock":{"title":"Rock","codes":["(rock)"]},"headbang":{"title":"Headbang","codes":["(headbang)","(banghead)"]},"bug":{"title":"Bug","codes":["(bug)"]},"fubar":{"title":"Fubar","codes":["(fubar)"]},"poolparty":{"title":"Poolparty","codes":["(poolparty)"]},"swearing":{"title":"Swearing","codes":["(swear)"]},"tmi":{"title":"TMI","codes":["(tmi)"]},"heidy":{"title":"Heidy","codes":["(heidy)"]},"myspace":{"title":"MySpace","codes":["(MySpace)"]},"malthe":{"title":"Malthe","codes":["(malthe)"]},"tauri":{"title":"Tauri","codes":["(tauri)"]},"priidu":{"title":"Priidu","codes":["(priidu)"]}};
	emoticons.define(definition);
	return emoticons.replace(message);
}

// Changes Icon of File-Upload to Send
function changeico(text)
{
	if (hastext(text)) {
		if(icoChange)
			return;
		document.getElementById('send').style.display = "block";
		document.getElementById('attach').style.display = "none";
		icoChange = true;
	}
	else {
		document.getElementById('send').style.display = "none";
		document.getElementById('attach').style.display = "block";
		icoChange = false;
	}
}

// Add the message (user or peer) to the chatbox
function addToList(user, message_text) {
	var message = addSmiley(message_text);
    var time = document.getElementById('date_time').innerHTML;
    var chat = document.getElementById('messages');
    var elem = document.createElement('li');
    elem.className = 'media';
    elem.innerHTML = '<div class="media-body"><div class="media"><a class="pull-left" href="#" title="' +
					user + '"><img class="media-object img-circle i-thumbnail" src="assets/img/' +
					user + '.png" /></a><div class="media-body" >' +
					message + '<br /><small class="text-muted timestamp">' +
					time + '</small></div></div></div>';
    chat.appendChild(elem);
	var box = document.getElementById('chat_box');
	box.scrollTop = box.scrollHeight;
}

// Send the data from user to peer
function send() {
	if (!isConn)
		return false;
	var message_value = htmlspecialchar(message.value);
	if (message_value == '' || !hastext(message_value))
	    return;
	addToList('you', message_value);
	peer.send('{"type": "message", "value" : "' + message_value + '"}');
	message.value = '';
	changeico('');
}

// Updates Status
function updateStatus(status, value){
	document.getElementById('status').innerHTML = status;
	var progressBar = document.getElementById('progress');
	progressBar.style.width = value + '%';
	progressBar.setAttribute('aria-valuenow', value);
}

// Perform SFTP
function startFTP() {
	aria2.onDownloadStart = function (gid) {
//		console.log('downloadStart: ', gid);
		updateStatus('Download started for ' + gid, 20);
	}
	aria2.send('getVersion', function (err, res) {
		console.log('version: ', err || res)
		//updateStatus('Using version: ' + err || res, 25);

		// open WebSocket
		aria2.open(function () {
			sftp = true;
			// WebSocket is open so WebSocket transport will be used
			aria2.getGlobalOption(function (err, res) {
				console.log('global options: ', err || res)

				aria2.send('addUri', files, {'dir': '/Download'}, function (err, gid) {
				  console.log(err || 'gid: ' + gid)

				  // close socket
				  aria2.close(function () {
					sftp = false;
				  })
				})
			})
		})
	})
}

// Initiate SFTP for file sharing between peer
function initiateFTP(flag) {
	if(!ftp){
		document.getElementById('input').style.display = 'none';
		ftp = true;
		document.getElementById('ftp').style.display = 'block';
	}
	if(flag == null){
		document.getElementById('status').innerHTML = 'Waiting for response...';
		peer.send('{"type" : "FTP", "value" : "Request"}');
	}
	else if(flag == true){
		document.getElementById('status').innerHTML = (sender ? 'Sending' : 'Recieving') + ' file...';
		startFTP();
	}
	else if(flag == false){
		document.getElementById('status').innerHTML = 'Peer declined your request!';
		files = null, ftp = false;
	}
}

// Watches SFTP for file sharing between peer
function watchFTP(signal) {
	if(signal == 'Request'){
		if(ftp){
			peer.send('{"type" : "FTP", "value" : "Decline"}');
			return false;
		}
		var res = confirm('Peer wants to share some file...');
		if(res){
			peer.send('{"type" : "FTP", "value" : "Accept"}');
			initiateFTP(true);
			startFTP();
		}
		else
			peer.send('{"type" : "FTP", "value" : "Decline"}');
	}
	else if(signal == 'Accept')
		initiateFTP(true);
	else if(signal == 'Decline')
		initiateFTP(false);
}

// Reset to Typing mode
function closeFTP() {
	files = null, ftp = false;
	document.getElementById('ftp').style.display = 'none';
	document.getElementById('input').style.display = 'table';
}

// Responds if the user or the peer is typing
function typing(bool) {
	if (!isConn)
		return false;
	if (bool == true && !typing_p) {
		peer.send('{"type" : "typing", "value" : true}');
		typing_p = true;
	}
	else if (bool == false) {
		peer.send('{"type" : "typing", "value" : false}');
		typing_p = false;
	}
	return true;
}
function typing_m(bool) {
	if (bool == true && !typing_s) {
		document.getElementById('lastseen').innerHTML = 'Typing...';
		typing_s = true;
	}
	else if (bool == false) {
		document.getElementById('lastseen').innerHTML = 'Online';
		typing_s = false;
	}
	return true;
}

// Determines if the user or the peer is typing
var lastTypedTime = new Date(0);
const typingDelayMillis = 3000;
function refreshTypingStatus() {
    if (!hastext(message.value) || new Date().getTime() - lastTypedTime.getTime() > typingDelayMillis) {
		typing(false);
    } else {
		typing(true);
    }
}
function updateLastTypedTime() {
    lastTypedTime = new Date();
}
setInterval(refreshTypingStatus, 100);

// Event Handlers
message.addEventListener('keypress', function(e) {
	updateLastTypedTime();
	if (e.keyCode != 13)
		return false;
	e.preventDefault();
	send();
}, false);

message.addEventListener('keyup', function() {
	refreshTypingStatus();
	var message_text = htmlspecialchar(message.value);
	changeico(message_text);
}, false);

document.getElementById('send').addEventListener('click', function() {
	send();
});

document.getElementById('attach').addEventListener('click', function() {
	document.getElementById('file').click();
});

document.getElementById('file').addEventListener('change', function(e){
	if(!isConn){
		this.value = '';
		e.preventDefault();
		return false;
	}
	if(this.files == null){
		e.preventDefault();
		return false;
	}
	files = this.files;
	sender = true;
	initiateFTP();
	this.value = '';
});

document.getElementById('close').addEventListener('click', function(){
	//SFTP Closes
	if(sftp)
		aria2.close().then(function(){ sftp = false; });
	closeFTP();
});

// Incoming Data Handler
peer.on('data', function(data) {
	var json = JSON.parse(data.toString());
	if (json.type == 'message') {
		var message = htmlspecialchar(json.value);
		addToList('peer', message);
	}
	else if (json.type == 'typing')
		typing_m(json.value);
	else if(json.type == 'FTP')
		watchFTP(json.value);
});
