function storeValue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('updating');  // where the IMPORTXML function locates
  var values = sheet.getRange("A2:E2").getValues()[0];  
  var sheet2 = ss.getSheetByName('log'); // where to store the data
  var height = sheet2.getLastRow();   
  sheet2.insertRowAfter(height);
  sheet2.getRange(height+1, 1, 1, 6).setValues([[new Date()].concat(values)]);
}

function emailNotify() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var importsheet = ss.getSheetByName('updating');
  var update = importsheet.getRange("B2:E2").clearFormat().getValues()[0];
  var logsheet = ss.getSheetByName('log');
  var height = logsheet.getLastRow();
  var past = logsheet.getRange(height, 3, 1, 4).clearFormat().getValues()[0];
  
  if ((update[0] != past[0]) && (update[1] != past[1]) && (update[2] != past[2]) && (update[3] != past[3])) {
    var emailAddress = "your@email.com";
    var message = "Last update: "+ update[0] + "; Confirmed: " + update[1] + "; Suspected: " + update[2] + "; Death: " + update[3];
    var subject = Date() + " 2019-nCoV latest case numbers in China";
    MailApp.sendEmail(emailAddress, subject, message);
  }
}
