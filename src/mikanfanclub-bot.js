var CHANNEL_ACCESS_TOKEN = "{アクセストークン}";

function doPost(e) {
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  var messageText = JSON.parse(e.postData.contents).events[0].message.text;
  if (messageText === "議事録作成") {
  var url = makeMinutes();
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': messageText + '=>'　+ url ,
      }],
    })
  });
  return JSON.stringify({});
  } else if (messageText === "trello") {
  var url = "{trello-url}";
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': messageText + 'の進捗を定期的に確認して議論を活発化させましょう。=>'　+ url ,
      }],
    })
  });
  return JSON.stringify({});
  } else{};
}

function makeMinutes () {
  var tempFile = DriveApp.getFileById('{DriveId}');
  var dt = new Date();
  var year = dt.getFullYear();
  var month = (('0' + (dt.getMonth() + 1)).slice(-2));
  var day = (('0' + dt.getDate()).slice(-2));
  var newfile = tempFile.makeCopy(year + month + day);
  var newfile_id = newfile.getId();
  var dateText = year + '/' + month + '/' + day;
  var body = DocumentApp.openById(newfile_id).getBody();
  body.replaceText('date', dateText);
  return newfile.getUrl().replace(/drivesdk/g,"sharing");
}

function trelloalert() {
    var url = "{trello-url}";
    var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': "trelloの進捗を定期的に確認して議論を活発化させましょう。=>" + url ,
      }],
    })
  });
}