var id = "1Z1vM6TrL_faQszelblELX8RE_wUMUoHB497WKV9eJKs";

function storeValue() {
  var ss = SpreadsheetApp.openById(id);
  var logsheet = ss.getSheetByName('log'); // where to store the data
  var updatesheet = ss.getSheetByName('updating');  // where the IMPORTXML function locates
  var values = updatesheet.getRange("A2:E2").getValues()[0];  
  var height = logsheet.getLastRow();   
  logsheet.insertRowAfter(height);
  logsheet.getRange(height+1, 1, 1, 6).setValues([[new Date()].concat(values)]);
}

function refresh() {
  var ss = SpreadsheetApp.openById(id);
  var updatesheet = ss.getSheetByName('updating');  // where the IMPORTXML function locates
  var r = updatesheet.getRange("C3").getValue();
  updatesheet.getRange("D3").setValue(r);
}

function emailNotify() {
  var ss = SpreadsheetApp.openById(id);
  var logsheet = ss.getSheetByName('log'); // where to store the data
  var updatesheet = ss.getSheetByName('updating');  // where the IMPORTXML function locates
  var lastheight = logsheet.getRange("H2").getValue();
  var height = logsheet.getLastRow();
  var past = logsheet.getRange(lastheight, 3, 1, 4).clearFormat().getValues()[0];
  var update = logsheet.getRange(height, 3, 1, 4).clearFormat().getValues()[0];
  //var update = ss.getSheetByName('dummy').getRange("B2:E2").getValues()[0];

    if ((update[0] != past[0]) || (update[1] != past[1]) || (update[2] != past[2]) || (update[3] != past[3])) {
      var emailAddress = "your@email.com";
      var message = "Last update: "+ update[0] + "; Confirmed: " + update[1] + "; Suspected: " + update[2] + "; Death: " + update[3];
      var message = message + "<br/>https://docs.google.com/spreadsheets/d/1Z1vM6TrL_faQszelblELX8RE_wUMUoHB497WKV9eJKs"
      var message = message + "<br/>https://3g.dxy.cn/newh5/view/pneumonia"
      var subject = Date() + " 2019-nCoV latest case numbers in China";
      MailApp.sendEmail(emailAddress, subject, message);
  }
  lastheight = height;
  logsheet.getRange("H2").setValue(lastheight);
}
