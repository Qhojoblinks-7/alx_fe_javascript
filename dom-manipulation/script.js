const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Get busy living or get busy dying.", category: "Motivation" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Act as if what you do makes a difference. It does.", category: "Motivation" }
];

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const displayQuotes = document.getElementById('quoteDisplay');

  // Clear any previous quotes
  displayQuotes.innerHTML = '';

  // Create new paragraph element for the quote text
  const quoteTextElement = document.createElement('p');
  quoteTextElement.textContent = randomQuote.text;

  // Create new paragraph element for the category
  const quoteCategoryElement = document.createElement('p');
  quoteCategoryElement.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

  // Append elements to display
  displayQuotes.appendChild(quoteTextElement);
  displayQuotes.appendChild(quoteCategoryElement);
}

// Add event listener to show random quotes
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add quotes from form
function createAddQuoteForm() {
  const inputQuote = document.getElementById('newQuoteText').value.trim();
  const inputCategory = document.getElementById('newQuoteCategory').value.trim();

  if (inputQuote && inputCategory) {
    // Add new quote to the array
    quotes.push({ text: inputQuote, category: inputCategory });

    // Save updated quotes array to local storage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Notify the user
    alert("New quote added!");

    // Reset form inputs
    reset();

    // Update categories in dropdown
    populateCategories();

    // Show a random quote
    showRandomQuote();
  } else {
    alert("Please fill in both the quote and category fields.");
  }
}

// Function to reset form inputs
function reset() {
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Add quote when form is submitted
document.getElementById('addQuoteForm').addEventListener('submit', (event) => {
  event.preventDefault();
  createAddQuoteForm();
});

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes) && importedQuotes.every(quote => quote.text && quote.category)) {
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
        populateCategories();
      } else {
        alert('Invalid format. Please upload a valid JSON file.');
      }
    } catch (error) {
      alert('Error parsing the file.');
    }
  };

  if (file) {
    reader.readAsText(file);
  }
}

// Function to export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.download = 'quotes.json';
  linkElement.click();

  URL.revokeObjectURL(url);
}

// Add event listeners for import and export buttons
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Populate the category dropdown with unique categories
// Function to populate the dropdown with unique categories
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');

  // Clear any previous options (optional, in case of re-populating)
  categoryFilter.innerHTML = ''; 

  // Get unique categories from quotes array
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  // Create an "all" option to show all categories
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Categories';
  categoryFilter.appendChild(allOption);

  // Create option elements for each unique category and append them to the dropdown
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category; // Set the value of the option
    option.textContent = category; // Set the display text of the option
    categoryFilter.appendChild(option);
  });
}

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const displayQuotes = document.getElementById('quoteDisplay');

  // Clear previous quotes
  displayQuotes.innerHTML = '';

  // Filter quotes by category or show all
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  filteredQuotes.forEach(quote => {
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${quote.text}" - ${quote.category}`;
    displayQuotes.appendChild(quoteTextElement);
  });
}

// Add event listener to filter quotes when category changes
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Initial population of categories and display of a random quote on load
window.onload = () => {
  populateCategories();
  showRandomQuote();
};