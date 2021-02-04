// Global variable because loadPictures and fadeOut will use this 
// to keep a count of pictures
var total;    

function loadPictures() {  
    // Make new XMLHttpRequest Object
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var elements = JSON.parse(this.responseText);

            // Number of photos
            total = elements.length;

            // Prompt user total count of photos shown
            document.getElementById("rows").innerHTML = `<h1>There are ${total} photo(s) being shown</h1>`; 

            // For each picture, display them properly
            // The title has their own div element
            elements.forEach((obj) => {
                document.getElementById("pictures").innerHTML += 
                `<div id=${obj.id} class="pictures" onclick="fadeOut(${obj.id})">
                 <img src=${obj.url} width="600" height="400"/>
                    <div class="desc">
                        ${obj.title}
                    </div>
                 </div>`;
            });
        }
    }; 
    
    // Receive photos from website
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/albums/2/photos", true);
    xhttp.send();
} // end loadPictures()

function fadeOut(id) {
    var element = document.getElementById(id);
    var opacity = 1;
    var timer = setInterval(function () {
    if (opacity <= 0.1) {
        clearInterval(timer);
        // Image disappears at the end
        element.remove(); 
        // Decrement image count
        total--; 
        // Display new image count
        document.getElementById("rows").innerHTML = `<h1>There are ${total} photo(s) being shown<h1>`; 
    }   
    element.style.opacity = opacity;
    opacity -= 0.2;
    }, 50);
}

