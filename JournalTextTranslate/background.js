chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'Translate Selected-Text on NewTab',
        id: 'contransmenu',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "contransmenu") {
		var TransText = info.selectionText;
		var TextNoIndention = TransText
			.replace(/-\r/g, "")
			.replace(/-\n/g, "")
			.replace(/\r-/g, "")
			.replace(/\n-/g, "")
			.replace(/\r/g, "")
			.replace(/\n/g, " ");
		var TextIndentAfterDot = TextNoIndention.replace(/\. /g, ".\r\n");
		var TransTextEncoded = encodeURIComponent(TextIndentAfterDot);
		chrome.tabs.create({
			url: "https://translate.google.co.jp/#en/ja/" + TransTextEncoded
		});
    }
});
