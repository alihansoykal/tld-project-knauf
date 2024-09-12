const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

// Fetch data from the USERS_ENDPOINT above
fetch(USERS_ENDPOINT)
  .then(response => response.json()) // Convert the response to JSON
  .then(users => {
    const usersByTLD = {};  // Create an empty object to store users 

    // Iterate over each user 
    users.forEach(user => {
      const website = user.website;  // Get the user's website 
      const tldWithoutDot = website.split('.').pop();  // Split the website by '.' 
      const tld = `.${tldWithoutDot}`;  // Add the '.' in front of the TLD 

      // If the TLD doesn't already exist, then create an empty array for it
      if (!usersByTLD[tld]) {
        usersByTLD[tld] = [];
      }

      // Add the current user to the array for their respective TLD
      usersByTLD[tld].push(user);
    });

    // Call the renderColumn function to display each user
    Object.keys(usersByTLD).forEach(tld => {
      renderColumn(tld, usersByTLD[tld]);
    });
  })
  .catch(error => {
    // If there is an error, log it to the console
    console.error('Error fetching data:', error);
  });


  function renderColumn(title, users) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
   
    const h3 = document.createElement('h3');
    h3.textContent = title;
    columnDiv.appendChild(h3);
   
    users.forEach((user) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
   
        const nameP = document.createElement('p');
        nameP.textContent = `Name: ${user.name}`;
        cardDiv.appendChild(nameP);
   
        const usernameP = document.createElement('p');
        usernameP.textContent = `Username: ${user.username}`;
        cardDiv.appendChild(usernameP);
   
        const websiteP = document.createElement('p');
        websiteP.textContent = `Website: ${user.website}`;
        cardDiv.appendChild(websiteP);
    
        columnDiv.appendChild(cardDiv);
    });
    
    const wrapperDiv = document.getElementById('wrapper');
    wrapperDiv.appendChild(columnDiv);
   }
