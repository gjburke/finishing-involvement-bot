
var queryHistory = [];
var firstInput = true;

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) + '  |  ' + (now.toLocaleTimeString('en-US'));
    document.getElementById('currentDateTime').textContent = formattedDateTime;
}

// Update date and time on page load and every second
document.addEventListener('DOMContentLoaded', function(event) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Function to handle form submission
function submitForm() {
    var input = document.getElementById('queryInput').value.trim();
    var output = document.getElementById('queryOutput');
    //var displayQuery = document.getElementById('inputDisplay');
    var typedText = document.getElementById('typedText');
    var exampleQueries = document.querySelector('.description .example-queries');

    if (input === '') {
        return;
    }

    //displayQuery.textContent = "Interests: " + input;

    // Dummy code for sending query in, getting matching clubs back

    // Send to backend
    var headers = {
        'Access-Control-Allow-Origin': 'https://finishing-involvement-bot.onrender.com/',
    }

    var jsonData = JSON.stringify(input);
    // Send data to backend
    const formData = new FormData();
    formData.append("query", jsonData);

    const backendURL = 'https://finishing-involvement-bot.onrender.com/submit';

    fetch(backendURL, {
        method: 'POST',
        headers: headers,
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data)
        var matchingClubs = data;

        output.innerHTML = ""; // Clear previous results

        matchingClubs.forEach(club => {
        var queryDiv = document.createElement('div');
        queryDiv.className = 'query-box';

        var queryText = document.createElement('a');
        queryText.textContent = club[0];
        queryText.setAttribute('href', club[1])
        queryText.setAttribute('target', '_blank')
        queryText.className = 'query-text';
        queryDiv.appendChild(queryText);

        output.appendChild(queryDiv);
        });

        // Add the query to history if it's not already there
        if (!queryHistory.includes(input)) {
            queryHistory.push(input);
            updateHistory();
        }
    })
    .catch(error => console.error("Error:", error));

    // Hide "Enter your interests below" after the first input
    if (firstInput) {
        firstInput = false;
        //displayQuery.classList.add('hide');
        typedText.classList.remove('hide');
        exampleQueries.classList.remove('hide');
    }
}

// Event listener for submit button click
document.getElementById('submitBtn').addEventListener('click', submitForm);

// Event listener for pressing Enter key in the input field
document.getElementById('queryInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitForm();
    }
});

// Function to update the history container with query history
function updateHistory() {
    var historyContainer = document.getElementById('history');
    historyContainer.innerHTML = "<strong>History</strong>";

    queryHistory.forEach(query => {
    var historyItem = document.createElement('div');
    historyItem.className = 'history';
    historyItem.textContent = query;
    historyItem.addEventListener('click', function() {
        document.getElementById('queryInput').value = query;
        submitForm();
    });
    historyContainer.appendChild(historyItem);
    });
}

// Function to handle clicking on example queries
function useExampleQuery(query) {
    document.getElementById('queryInput').value = query;
    submitForm();
}

// Function to toggle visibility of history container
function toggleHistory() {
    var historyContainer = document.getElementById('historyContainer');
    if (historyContainer.style.display === 'none') {
    historyContainer.style.display = 'block';
    } else {
    historyContainer.style.display = 'none';
    }
}

// Event listener to close history contaisner when clicking outside of it
document.body.addEventListener('click', function(event) {
    var historyContainer = document.getElementById('historyContainer');
    if (!historyContainer.contains(event.target) && event.target.id !== 'historyToggleBtn') {
    historyContainer.style.display = 'none';
    }
});