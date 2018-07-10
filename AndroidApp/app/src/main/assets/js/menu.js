// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function Xfunction(x) {
    x.classList.toggle("change");

    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    Xfunction(document.getElementById("menuDiv"));
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        Xfunction(document.getElementById("menuDiv"));

        modal.style.display = "none";
    }

} 