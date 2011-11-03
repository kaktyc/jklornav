// ==UserScript==
// @name          LOR jk-navigation
// @description   Implements jk-navigation for LOR
// @version 0.1
// @match http://*.linux.org.ru/*
// @match https://*.linux.org.ru/*
// @exclude *linux.org.ru/forum/*/
// @exclude *linux.org.ru/news/*/
// @exclude *linux.org.ru/gallery/*/
// @exclude *linux.org.ru/people/*/
// @exclude *linux.org.ru/polls/*/
// @exclude *linux.org.ru/wiki/*/*
// @include *linux.org.ru/forum/*/*
// @include *linux.org.ru/news/*/*
// @include *linux.org.ru/gallery/*/*
// @include *linux.org.ru/polls/*/*
// ==/UserScript==
//
// License: GPL
// Author:  kaktyc ( http://www.linux.org.ru/people/kaktyc/profile )

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
// load jQuery and execute the main function
addJQuery(main);
// the guts of this userscript

function main() {
	function getNextMsgPos() {
		var pos = 0;
		if (index < (msgs.length - 1)) {
			index++;
		}
		pos = $(msgs[index]).offset().top;
		return pos - 10;
	}

	function getPrevMsgPos() {
		var pos = 0;
		if (index > 0) {
			index--;
		}
// Uncomment if you don't want to jump to OP's message
//		else if (index === 0) {
//			index++;
//		}
		pos = $(msgs[index]).offset().top;
		return pos - 10;
	}

	function ScrollToMsg(getPos, e) {
		var pos = 0;
		pos = getPos();
		window.scroll(0, pos);
		highLight(msgs[index]);
	}

	function ScrollToNextNewMsg(e) {
		ScrollToMsg(getNextMsgPos, e);
	}

	function ScrollToPrevNewMsg(e) {
		ScrollToMsg(getPrevMsgPos, e);
	}

	function keyDownHandler(e) {
		var targ = e.target;
		var editTags = {
			'TEXTAREA': '',
			'INPUT': '',
			'TEXT': '',
			'PASSWORD': ''
		};
		if (targ && !(targ.tagName in editTags)) {
			if (e.keyIdentifier == "U+004A" || e.which == e.DOM_VK_J) {
				ScrollToNextNewMsg(e);
			}
			else if (e.keyIdentifier == "U+004B" || e.which == e.DOM_VK_K) {
				ScrollToPrevNewMsg(e);
			}
		}
	}
	var msgs = document.getElementsByClassName('msg');
	var index = 0;
	document.addEventListener('keydown', keyDownHandler, false);
};

