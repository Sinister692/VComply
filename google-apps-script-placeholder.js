/**
 * README: Instructions for Google Sheets Integration
 *
 * This script is designed to be deployed as a Google Apps Script web app.
 * It will receive data from the booking form on your website and append it to a Google Sheet.
 *
 * --- SETUP INSTRUCTIONS ---
 *
 * 1.  **Create a new Google Sheet:**
 *     - Go to sheets.google.com and create a new blank sheet.
 *     - Name it "WanderWise Client Inquiries".
 *     - Create the following headers in the first row, in this exact order:
 *       Timestamp, Itinerary, Name, Email, Phone, Travelers, Preferences
 *
 * 2.  **Create a new Google Apps Script:**
 *     - In your new Google Sheet, go to "Extensions" > "Apps Script".
 *     - A new script editor will open. Delete any existing code in the `Code.gs` file.
 *     - Copy the entire content of the `doPost(e)` function below and paste it into the `Code.gs` file.
 *
 * 3.  **Set the Sheet Name:**
 *     - Inside the script, find the line `const sheet = ss.getSheetByName('Sheet1');` and change `'Sheet1'` to the actual name of the sheet you are writing to (it's likely the default, but you can change it). If you named your sheet something other than "WanderWise Client Inquiries" you will need to update that as well.
 *
 * 4.  **Deploy the Script as a Web App:**
 *     - At the top right of the script editor, click the "Deploy" button.
 *     - Select "New deployment".
 *     - For "Select type", click the gear icon and choose "Web app".
 *     - In the "Deployment configuration" settings:
 *         - **Description:** "WanderWise Booking Form Handler"
 *         - **Execute as:** "Me (your@email.com)"
 *         - **Who has access:** "Anyone" (This is important to allow the form to send data)
 *     - Click "Deploy".
 *
 * 5.  **Authorize the Script:**
 *     - Google will ask you to authorize the script's access to your Google account.
 *     - Follow the prompts. You may see a screen saying "Google hasn't verified this app". This is normal. Click "Advanced", then "Go to [Your Script Name] (unsafe)".
 *     - Grant the necessary permissions.
 *
 * 6.  **Get the Web App URL:**
 *     - After deployment, a "Deployment details" box will appear with a "Web app URL".
 *     - Copy this URL. This is the endpoint your form will send data to.
 *
 * 7.  **Update Your Website Code:**
 *     - Open the `js/main.js` file in your website's code.
 *     - Find the line: `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
 *     - Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with the Web App URL you just copied.
 *
 * 8.  **Done!**
 *     - Your form should now be connected to your Google Sheet. When a user submits the form, a new row will automatically appear in the sheet.
 */

function doPost(e) {
  // Get the active spreadsheet and the sheet named 'Sheet1'
  // Make sure your sheet is named 'Sheet1' or change it here.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');

  // Get the form data from the request
  const formData = e.parameter;

  // Append a new row with the form data
  // The order of formData properties should match the column order in your sheet.
  sheet.appendRow([
    new Date(), // Timestamp
    formData.itinerary,
    formData.name,
    formData.email,
    formData.phone,
    formData.travelers,
    formData.preferences
  ]);

  // Return a success response
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
