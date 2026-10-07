// 1. Get references to the HTML elements
const button = document.getElementById('API_test');
const responseContainer = document.getElementById('apiResponse');

// 2. Add an event listener to trigger on button click
button.addEventListener('click', () => {
    // Optional: Visual feedback changing the button status
    button.textContent = 'Loading...';
    button.disabled = true;

    // 3. Define the API endpoint (Using a free test API)
    const apiUrl = 'https://www.omdbapi.com/?t=a+minecraft+movie&apikey=20a57fb1';

    // 4. Make the API request
    fetch(apiUrl)
        .then(response => {
            // Check if the response is successful (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the data as JSON
        })
        .then(data => {
            console.log(data);
            // 5. Inject the retrieved data into the HTML page
            responseContainer.innerHTML = `
                <h5>${data.title}</h5>
                <p>${data.body}</p>
            `;
        })
        .catch(error => {
            // Handle any network or code errors gracefully
            console.error('Error fetching data:', error);
            responseContainer.innerHTML = `<span class="text-danger">Failed to fetch data.</span>`;
        })
        .finally(() => {
            // Reset the button state back to original
            button.disabled = false;
        });
});
