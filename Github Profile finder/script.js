// Select the search input from the HTML
let userInput = document.querySelector(".container .search-box input");

// Select the info box from the HTML
let infoBox  = document.querySelector(".container .info-box")

// Listen for a key being released inside the search input
userInput.addEventListener("keyup", (e) => {

    // Check that the input is not empty AND Enter was pressed
    if (userInput.value != '' && e.key == "Enter") {

        // Search GitHub using the username entered
        getData(userInput.value);
    }
});

let getData = (username)=> {
    //Github API
// GitHub API
let url = `https://api.github.com/users/${username}`;

fetch(url)
    .then((res) => res.json())
    .then((data) => {

        // Check if a valid GitHub user was returned
        if (data.login) {

            // Get the account creation date
            const dateData = data.created_at.slice(0, 10);

            // Display fallback text if information is missing
            const location = data.location === "" || data.location === null
                ? "No location"
                : data.location;

                // Use "No X" if the user has no X/Twitter username
            const twitter = data.twitter_username === "" || data.twitter_username === null
                ? "No X"
                : data.twitter_username;

                    // Use "No Website" if the user has no website
            const website = data.blog === "" || data.blog === null
                ? "No Website"
                : data.blog;
                        // Use "No Company" if the user has no company
            const company = data.company === "" || data.company === null
                ? "No Company"
                : data.company;
                // Use a default message if the user has no bio
            const bio = data.bio === "" || data.bio === null
                ? "This profile has no bio"
                : data.bio;

                // Add the GitHub user's information to the info box
                infoBox.innerHTML = ` <div class="user-details">
                <div class="img-box">
                    <img src="${data.avatar_url}" alt="">
                </div>
                <div class="details">
                    <h3 class="name">${data.name}</h3>
                    <h3 class="username">${data.login}</h3>
                    <span class="join-date">${dateData}</span>
                </div>
                <p class="bio">${data.bio}</p>
                <div class="user-profile">
                    <div class="repos">
                        <h2>${data.public_repos}</h2>
                        <span>Repos</span>
                    </div>
                    <div class="followers">
                        <h2>${data.followers}</h2>
                        <span>Followers</span>
                    </div>
                    <div class="following">
                        <h2>${data.following}</h2>
                        <span>Following</span>
                    </div>
                </div>
                <div class="user-other-details">
                    <p><i class="fa-solid fa-building"></i>${company}</p>
                    <p><i class="fa-solid fa-location-pin"></i>${location}</p>
                    <p><i class="fa-solid fa-link"></i>${website}</p>
                    <p><i class="fa-brands fa-x-twitter"></i>${twitter}</p>
                </div>
            </div>
            `;
        }
    })
}

getData("github"); // Load the "github" profile when the page first opens


