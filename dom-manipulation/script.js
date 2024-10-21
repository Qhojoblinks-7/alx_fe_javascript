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

    //clear any previous quotes
    displayQuotes.innerHTML = '';

    //create new paragraph element for the quotes
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = randomQuote.text;

    //create new paragraph element for the category
    const quoteCategoryElement = document.createElement('p');
    quoteCategoryElement.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

    //append element to disaplayQuote function
    displayQuotes.appendChild(quoteTextElement);
    displayQuotes.appendChild(quoteCategoryElement);
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


// function to import file from JSON
function importFromJsonFile(event) {

   //get uploaded file
  const file = event.target.files[0];
  const reader = new FileReader();

  // function to be executed once file is read
  reader.onload = function(event) {

    try{
      const importedQuotes = JSON.parse(event.target.result);
      // verify if imported quotes are arrays

      if(Array.isArray(importedQuotes) && importedQuotes.every(quotes=>quotes.text && quotes.category)){
        
      quotes.push(...importedQuotes);//add quotes to existing array

      localStorage('quotes', JSON.stringify(quotes)); //update storagde
      saveQuotes();
      alert('Quotes imported successfully!');
      }else{
        alert('Invalid format')
      }
      
    }catch{
      alert('Error parsing the file')
    }
    
  };

  if(file){
    fileReader.readAsText(file);
  }
}

document.getElementById('importQuotesFile').addEventListener('click', importFromJsonFile);

//function to export file to a json file
function exportToJSONFile(){
  const dataString = JSON.stringify(quotes, null, 2);
  const dataUri = 'data:application/json;charset=utf-8'+ encodeURIComponent(dataString);

  //default file name
  const exportDefaultFileName = 'quotes.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataString);
  linkElement.setAttribute('download', exportDefaultFileName);
  linkElement.click(); //automatically click the link to trigger download
}


document.getElementById('exportQuote').addEventListener('click', exportToJSONFile);

