/**
 * TODO add @param @returns
 * Runs when a calendar even is selected or opened
 */
function onCalendarEventOpen(e){

  //Gets the current event that is open
  var event = CalendarApp.getCalendarById(e.calendar.calendarId).getEventById(e.calendar.id);

  var title = event.getTitle();
  var descrip = event.getDescription();
  var location = event.getLocation();
  var start = event.getStartTime();
  var end = event.getEndTime();

  
  var gmailLink = "<a href=\"https://www.google.com/calendar/render?action=TEMPLATE"
    + "&text=" + encodeURIComponent(title) 
    + "&dates=" + encodeURIComponent(toGmailFormat(start)) + "/" + encodeURIComponent(toGmailFormat(end))
    + "&details=" + encodeURIComponent(descrip)
    + "&location=" + encodeURIComponent(location)
    + "\"> Add to Gmail </a>";

  
  var outlookLink = "<a href=\"https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent"
    + "&subject=" + encodeURIComponent(title)
    + "&body=" + encodeURIComponent(descrip)
    + "&location=" + encodeURIComponent(location)
    + "&startdt=" + encodeURIComponent(toOutlookFormat(start))
    + "&enddt=" + encodeURIComponent(toOutlookFormat(end))
    + "\"> Add to Outlook </a>";

  
  //Text widget
  var textWidget = CardService.newDecoratedText()
    .setWrapText(true)
    .setText("Drag links to an email draft to copy.\n\n" + gmailLink + "\n" + outlookLink);
  
  //Adds widgets to section and builds card
  var cardSection = CardService.newCardSection()
    .addWidget(textWidget);

  
  var card = CardService.newCardBuilder()
    .setName("Card name")
    .setHeader(CardService.newCardHeader().setTitle("Add to Calendar Links"))
    .addSection(cardSection)
    .build();

  return card
}


/**
 * Chatgpt generated w/ edits
 */
function toGmailFormat(dateLocal) {  
  //convert to UTC
  date = new Date( dateLocal.getTime() + dateLocal.getTimezoneOffset() * 60000);
  
  //pads to force 2 characters 
  var year = date.getUTCFullYear();
  var month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed
  var day = date.getUTCDate().toString().padStart(2, '0');
  var hours = date.getUTCHours().toString().padStart(2, '0');
  var minutes = date.getUTCMinutes().toString().padStart(2, '0');
  var seconds = date.getUTCSeconds().toString().padStart(2, '0');

  
  // Combine components into a string
  return year + month + day + 'T' + hours + minutes + seconds + 'Z';
}

function toOutlookFormat(dateLocal) {
  //convert to UTC
  date = new Date( dateLocal.getTime() + dateLocal.getTimezoneOffset() * 60000);
  return date.toISOString();
}
