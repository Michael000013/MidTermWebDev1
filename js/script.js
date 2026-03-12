// NOTE: You may use the sample user in the data/user.json file to test your code before your hit the API. 
// Write your code below.

// Add a JS Event Handler to the Next Profile button
document.addEventListener('DOMContentLoaded', function() {
  const nextBtn = document.getElementById('next-btn');
  
  // Add click event listener
  nextBtn.addEventListener('click', function() {
    fetchUserData();
  });
  
  // Load initial user data on page load
  fetchUserData();
});

// Retrieve User data via HTTP Request
function fetchUserData() {
  // Using Random User API
  const apiUrl = 'https://randomuser.me/api/';
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // API should return JSON - extract the user from results array
      const user = data.results[0];
      displayUserProfile(user);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      // Fallback to local JSON file for testing
      fetch('./data/user.json')
        .then(response => response.json())
        .then(data => {
          const user = data.results[0];
          displayUserProfile(user);
        });
    });
}

// Display user profile information
function displayUserProfile(user) {
  // Extract required information: First and Last name, Email, City, State, Country, Profile Picture, Gender, Cellphone
  const firstName = user.name.first;
  const lastName = user.name.last;
  const email = user.email;
  const city = user.location.city;
  const state = user.location.state;
  const country = user.location.country;
  const picture = user.picture.large;
  const gender = user.gender;
  const cellphone = user.cell;
  const age = user.dob.age;
  
  // Update profile elements
  document.getElementById('name').textContent = `${firstName} ${lastName}`;
  document.getElementById('email').textContent = email;
  document.getElementById('address').textContent = `${city}, ${state}, ${country}`;
  document.getElementById('age').textContent = age;
  document.querySelector('.image img').src = picture;
  
  // Create an element on the fly using HTML that displays label "Mobile" followed by cell phone number
  let mobileElement = document.getElementById('mobile');
  
  if (!mobileElement) {
    // Create new element if it doesn't exist
    mobileElement = document.createElement('p');
    mobileElement.id = 'mobile';
    const detailsDiv = document.querySelector('.details');
    detailsDiv.appendChild(mobileElement);
  }
  
  mobileElement.innerHTML = `Mobile: <span id="cellphone">${cellphone}</span>`;
  
  // Use the users gender to color the background
  // Only change the color of the background behind the profile
  // Male = Steelblue, Female = rebeccapurple
  const profileDiv = document.querySelector('.profile');
  if (gender === 'male') {
    profileDiv.style.backgroundColor = 'steelblue';
    profileDiv.style.color = 'white';
  } else if (gender === 'female') {
    profileDiv.style.backgroundColor = 'rebeccapurple';
    profileDiv.style.color = 'black';
  }}