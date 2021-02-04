// Fade out effect for flash message
function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05){
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}
// The function behind the appearing messages
function addFlashFromFrontEnd(message){
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

// The cool image previews
function createCard(postData) {
    return `<div id="post-${postData.id}" class="card"> 
    <img class="card-image" src="${postData.thumbnail}" alt="Missing Image">
    <div class="card-body">
        <p class="card-title">${postData.title}</p>
        <a href="/post/${postData.id}">Post Details</a>
    </div>
</div>`;
}

// Search button event
function executeSearch() {
    let mainContent = document.getElementById('main-content');
    let searchTerm = document.getElementById('search-text').value;
    // If there are no text in the search bar on event
    if (!searchTerm) {
        location.replace("/");
        addFlashFromFrontEnd('Empty search term, here are the 8 most recent posts');
        return;
    }
    // URL built for searching terms
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            // Parse the json for .then()
            return data.json();
        
        })
        
        .then((data_json) => {
            let newMainContentHTML = '';
            // For each array element of results
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML;
            if (data_json.message) {
                addFlashFromFrontEnd(data_json.message);
            }
        
        })
        .catch((err) => console.log(err));
}

// Set up messages appearing on the screen
let flashElement = document.getElementById('flash-message');
if(flashElement){
    setFlashMessageFadeOut(flashElement);
}

// On click event function which triggers executeSearch on click of nav-bar button
let searchButton = document.getElementById('search-button');
if(searchButton){
    searchButton.onclick = executeSearch;
}