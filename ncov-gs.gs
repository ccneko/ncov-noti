var id = "1z1_W00OHKie8oPuCz7qIb10FeBFlZOTgY8_JtLMNQcM";

function refresh() {
  var ss = SpreadsheetApp.openById(id);
  var updatesheet = ss.getSheetByName('updating');  // where the IMPORTXML function locates
  var r = updatesheet.getRange("C3").getValue();
  updatesheet.getRange("D3").setValue(r);
}

function promptUpdate() {
  var ss = SpreadsheetApp.openById(id);
  var logsheet = ss.getSheetByName('log'); // where to store the data
  var updatesheet = ss.getSheetByName('updating');  // where the IMPORTXML function locates
  var lastrow = logsheet.getLastRow();
  Logger.log(lastrow);
  var past = logsheet.getRange(lastrow, 3, 1, 4).clearFormat().getValues()[0];
  //var update = updatesheet.getRange("A2:E2").clearFormat().getValues()[0];
  var update = ss.getSheetByName('dummy').getRange("A2:E2").getValues()[0];

  var now = Utilities.formatDate(new Date(), "GMT+8", "MM-dd-yyyy HH:mm:ss");
  Logger.log(now)
    if ((update[1] != past[0]) || (update[2] != past[1]) || (update[3] != past[2]) || (update[4] != past[3])) {
      var emailAddress = "your@email.com";
      var subject = Date() + " 2019-nCoV latest case numbers in China";
      var message = "Last update: "+ update[0] + "; Confirmed: " + update[1] + "; Suspected: " + update[2] + "; Recovered: " + update[3] + "; Death: " + update[4];
      var message = message + "\\nhttps://docs.google.com/spreadsheets/d/"+id
      var message = message + "\\nhttps://3g.dxy.cn/newh5/view/pneumonia"
      GmailApp.sendEmail(emailAddress, subject, message);
      logsheet.getRange(lastrow+1, 1, 1, 6).setValues([[now].concat(update)]);
  }
  logsheet.getRange("H2").setValue(lastrow);
  logsheet.getRange("H4").setValue(now);
}
