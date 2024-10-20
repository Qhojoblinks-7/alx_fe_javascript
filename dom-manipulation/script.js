const quotes = [
    { text: "Believe you can and you're halfway there.", category: "motivation" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" }
  ];

  //show random quotes
  function showRandomQuote(){
    //get random index
    const randomIndex = Math.floor(Math.random()*quotes.length); 
    const randomQuote = quotes[randomIndex];

    const displayQuotes = document.getElementById('quoteDisplay');
    displayQuotes.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;
  }

  //add event listener to show random quotes
  const newQuoteButton = document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  //creating a function to add quotes in forms
  function createAddQuoteForm(){
    const inputQuote = document.getElementById('newQuoteText').value.trim();
    const inputCategory = document.getElementById('newQuoteCategory').value.trim();

    const newQuote = inputQuote;
    const category = inputCategory;

    if (newQuote && category){

      //add new quotes to the array
        quotes.push({text:newQuote, category: category});

        //adding new quotes to the local storage
        localStorage.setItem('quotes', JSON.stringify(quotes));

        //changing input into json data
        JSON.parse(localStorage.getItem('quotes'))

        //notify user
        alert("New quote added");

        //resetting the form for new input
        reset();

        //calling showRadomQuote
        showRandomQuote();
    }else{
        alert("Please fill in both the quote and category fields.");
    }
  }

  function addQuote(event){
    event.preventDefault();
    createAddQuoteForm();
  }

  // Function to reset the input fields
function reset() {
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}


