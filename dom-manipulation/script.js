const quotes = [
    { text: "Believe you can and you're halfway there.", category: "motivation" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" }
  ];

  function showRandomQuote(){
    const randomIndex = Math.floor(Math.random()*quotes.length); //get random index
    const randomQuote = quotes[randomIndex];

    const displayQuotes = document.getElementById('quoteDisplay');
    displayQuotes.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;
  }

  const newQuoteButton = document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  

  function addQuote(){
    const inputQuote = document.getElementById('newQuoteText').value.trim();
  const inputCategory = document.getElementById('newQuoteCategory').value.trim();

    const newQuote = inputQuote;
    const category = inputCategory;

    if (newQuote && category){

        quotes.push({text:newQuote, category: category});
        localStorage.setItem('quotes', JSON.stringify(quotes));
        JSON.parse(localStorage.getItem('quotes'))
        alert("New quote added");
        reset();
    }else{
        alert("Please fill in both the quote and category fields.");
    }
  }

  // Function to reset the input fields
function reset() {
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}


