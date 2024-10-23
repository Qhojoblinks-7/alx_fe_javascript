// // Initialize quotes array from localStorage or default values
// let quotes = JSON.parse(localStorage.getItem('quotes')) || [
//   { text: "Believe you can and you're halfway there.", category: "Motivation" },
//   { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" },
//   { text: "Life is what happens when you're busy making other plans.", category: "Life" },
//   { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
//   { text: "Get busy living or get busy dying.", category: "Motivation" },
//   { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
//   { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
//   { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
//   { text: "Act as if what you do makes a difference. It does.", category: "Motivation" }
// ];

// // Show random quotes
// function showRandomQuote() {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const randomQuote = quotes[randomIndex];

//   const displayQuotes = document.getElementById('quoteDisplay');

//   // Clear previous quotes
//   displayQuotes.innerHTML = '';

//   // Create new paragraph element for the quote
//   const quoteTextElement = document.createElement('p');
//   quoteTextElement.textContent = randomQuote.text;

//   // Create new paragraph element for the category
//   const quoteCategoryElement = document.createElement('p');
//   quoteCategoryElement.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

//   // Append elements to displayQuotes
//   displayQuotes.appendChild(quoteTextElement);
//   displayQuotes.appendChild(quoteCategoryElement);
// }

// // Add event listener to show random quotes
// document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// // Create a function to add quotes using forms
// function createAddQuoteForm() {
//   const inputQuote = document.getElementById('newQuoteText').value.trim();
//   const inputCategory = document.getElementById('newQuoteCategory').value.trim();

//   if (inputQuote && inputCategory) {
//     // Add new quote to the array
//     quotes.push({ text: inputQuote, category: inputCategory });

//     // Update quotes in localStorage
//     localStorage.setItem('quotes', JSON.stringify(quotes));

//     // Notify user
//     alert("New quote added");

//     // Reset the form for new input
//     reset();

//     // Show the newly added quote
//     showRandomQuote();

//     // Update categories in dropdown
//     populateCategories();
//   } else {
//     alert("Please fill in both the quote and category fields.");
//   }
// }

// function addQuote(event) {
//   event.preventDefault();
//   createAddQuoteForm();
// }

// // Function to reset the input fields
// function reset() {
//   document.getElementById('newQuoteText').value = '';
//   document.getElementById('newQuoteCategory').value = '';
// }

// // Function to import quotes from a JSON file
// function importFromJsonFile(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function(event) {
//     try {
//       const importedQuotes = JSON.parse(event.target.result);
//       // Verify if imported quotes are arrays
//       if (Array.isArray(importedQuotes) && importedQuotes.every(quote => quote.text && quote.category)) {
//         quotes.push(...importedQuotes); // Add quotes to existing array
//         localStorage.setItem('quotes', JSON.stringify(quotes)); // Update storage
//         alert('Quotes imported successfully!');
//         populateCategories(); // Update categories in dropdown
//       } else {
//         alert('Invalid format');
//       }
//     } catch {
//       alert('Error parsing the file');
//     }
//   };

//   if (file) {
//     reader.readAsText(file);
//   }
// }

// document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// // Function to export quotes to a JSON file using Blob
// function exportToJsonFile() {
//   const dataStr = JSON.stringify(quotes, null, 2);
//   const blob = new Blob([dataStr], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);

//   const linkElement = document.createElement('a');
//   linkElement.href = url;
//   linkElement.download = 'quotes.json';
//   linkElement.click();

//   URL.revokeObjectURL(url);
// }

// // Add event listener to the export button
// document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// // Function to populate the dropdown with unique categories
// function populateCategories() {
//   const categoryFilter = document.getElementById('categoryFilter');

//   // Clear previous options (optional, in case of re-populating)
//   categoryFilter.innerHTML = '';

//   // Get unique categories from quotes array
//   const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

//   // Create an "all" option to show all categories
//   const allOption = document.createElement('option');
//   allOption.value = 'all';
//   allOption.textContent = 'All Categories';
//   categoryFilter.appendChild(allOption);

//   // Create option elements for each unique category and append them to the dropdown
//   uniqueCategories.forEach(category => {
//     const option = document.createElement('option');
//     option.value = category; // Set the value of the option
//     option.textContent = category; // Set the display text of the option
//     categoryFilter.appendChild(option);
//   });
// }

// // A function to filter categories of quotes
// function filterQuotes() {
//   const selectedCategory = document.getElementById('categoryFilter').value;

//   // Clear previous results
//   document.getElementById('quoteDisplay').innerHTML = '';

//   // Filter quotes by selected category
//   const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

//   filteredQuotes.forEach(quote => {
//     // Create new paragraph element for the quote
//     const quoteTextElement = document.createElement('p');
//     quoteTextElement.textContent = quote.text;

//     // Create new paragraph element for the category
//     const quoteCategoryElement = document.createElement('p');
//     quoteCategoryElement.innerHTML = `<em>Category: ${quote.category}</em>`;

//     // Append elements to displayQuotes
//     document.getElementById('quoteDisplay').appendChild(quoteTextElement);
//     document.getElementById('quoteDisplay').appendChild(quoteCategoryElement);
// }

// // Populate categories when the page loads
// document.addEventListener('DOMContentLoaded', populateCategories);
// }

// // function to stimulate fetching quotes from a server
// function fetchQuotesFromServer(){
//   return new Promise((resolve)=>{
//     setTimeout(()=>{
//       const serverQuotes = [
//         { text: "Success usually comes to those who are too busy to be looking for it.", category: "Motivation" },
//     { text: "The best time to plant a tree was twenty years ago. The second best time is now.", category: "Inspiration" },
//     { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" }
//     ];

//     resolve(serverQuotes);
//     },2000);
//   })
// }

// // Function to periodically check for new quotes from the server
// function startQuotesSync(){
//   setInterval(async()=>{
//     try{
//       const newQuotes = await fetchQuotesFromServer();
//       updateLocalQuotes(serverQuotes);
//     }catch{
//       alert("fetching quotes from server error");
//     }
//   }, 10000)
// }

// startQuotesSync();

// // Function to update local quotes with fetched quotes from the server
// function updateLocalQuotes(newQuotes){

//   // merge new quotes into existing one
//   newQuotes.forEach(newQuote=>{
//     const existingQuotesIndex =  quotes.findIndex(quote => quote.text === newQuote.text && quote.category === newQuote.category);

//     if(existingQuotesIndex === -1){
//       // If it doesn't exist, add it to the local array
//       quotes.push(newQuote)
//     }else{
//       // If it does exist, you may decide to update it or keep the local one
//             // For now, we are prioritizing the server's data
//       quotes[existingQuotesIndex] = newQuote;//update with server data
//     }
//   })

//   //set data to JSON file
//   localStorage.setItem('quotes', JSON.stringify(quotes));

//   showRandomQuote();
// }

const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Get busy living or get busy dying.", category: "Motivation" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
  { text: "Act as if what you do makes a difference. It does.", category: "Motivation" }
];

// Function to show random quotes
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const displayQuotes = document.getElementById('quoteDisplay');
  displayQuotes.innerHTML = '';

  const quoteTextElement = document.createElement('p');
  quoteTextElement.textContent = randomQuote.text;

  const quoteCategoryElement = document.createElement('p');
  quoteCategoryElement.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

  displayQuotes.appendChild(quoteTextElement);
  displayQuotes.appendChild(quoteCategoryElement);
}

// Add event listener to show random quotes
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to create and add new quotes
function createAddQuoteForm() {
  const inputQuote = document.getElementById('newQuoteText').value.trim();
  const inputCategory = document.getElementById('newQuoteCategory').value.trim();

  if (inputQuote && inputCategory) {
      quotes.push({ text: inputQuote, category: inputCategory });
      localStorage.setItem('quotes', JSON.stringify(quotes));
      alert("New quote added");
      reset();
      showRandomQuote();
  } else {
      alert("Please fill in both the quote and category fields.");
  }
}

function addQuote(event) {
  event.preventDefault();
  createAddQuoteForm();
}

// Function to reset the input fields
function reset() {
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Function to show notifications with optional actions
function showNotification(message, onConfirm, onCancel) {
  const notificationElement = document.getElementById('notification');
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';

  // Create confirm and cancel buttons
  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Keep Server Version';
  confirmButton.onclick = () => {
      if (onConfirm) onConfirm();
      notificationElement.style.display = 'none';
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Keep Local Version';
  cancelButton.onclick = () => {
      if (onCancel) onCancel();
      notificationElement.style.display = 'none';
  };

  notificationElement.appendChild(confirmButton);
  notificationElement.appendChild(cancelButton);

  // Automatically hide the notification after 5 seconds
  setTimeout(() => {
      notificationElement.style.display = 'none';
  }, 5000);
}

// Function to resolve conflicts and merge quotes
function resolveConflictsAndMergeQuotes(serverQuotes) {
  const existingQuotesMap = new Map(quotes.map(quote => [quote.text, quote]));

  serverQuotes.forEach(serverQuote => {
      if (existingQuotesMap.has(serverQuote.title)) { // Using serverQuote.title for comparison
          showNotification(
              `Conflict detected for quote: "${serverQuote.title}".`,
              () => {
                  existingQuotesMap.set(serverQuote.title, { text: serverQuote.title, category: serverQuote.body }); // Update with server data
                  showNotification(`Kept server version for: "${serverQuote.title}".`);
              },
              () => {
                  showNotification(`Kept local version for: "${serverQuote.title}".`);
              }
          );
      } else {
          existingQuotesMap.set(serverQuote.title, { text: serverQuote.title, category: serverQuote.body }); // Add new quote from server
      }
  });

  quotes = Array.from(existingQuotesMap.values());
  localStorage.setItem('quotes', JSON.stringify(quotes));
  showNotification('Quotes synchronized with server!');
}

// Simulated server interaction
async function fetchQuotesFromServer() {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      
      // Simulating server quotes using post titles and bodies
      const serverQuotes = data.map(post => ({
          title: post.title,
          body: post.body // Using body as category
      }));

      // Resolve conflicts with local data
      resolveConflictsAndMergeQuotes(serverQuotes);
  } catch (error) {
      console.error("Error fetching data from server:", error);
  }
}

// Periodically fetch data from the server
setInterval(fetchQuotesFromServer, 10000);

// Populate categories dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

// Call populateCategories on page load
populateCategories();