
document.title = "E_Shop";
const firstHeading = document.getElementById("home-button");
if (firstHeading) {
    firstHeading.style.color = "white";
    firstHeading.style.backgroundColor = "black";
    firstHeading.style.textAlign = "center";
    console.log(firstHeading); 
} else {
    console.error("Element with ID 'h1' not found.");
}

