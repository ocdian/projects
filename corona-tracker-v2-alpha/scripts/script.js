//start execution when the page content is loaded
document.addEventListener("DOMContentLoaded", function () {
    /*
    ***
    Sidebar toggle and close
    */
    var sidebarToggleButton = document.getElementById("toggle-sidebar-btn");
    var sidebarElement = document.getElementById("sidebar");
    var pageContent = document.getElementById("content");
    var sidebarCloseBtn = document.getElementById("close-sidebar-btn");
    var navbar = document.getElementById("nav-bar");

    sidebarToggleButton.onclick = function () {
        sidebarElement.classList.toggle("sidebar-inactive");
        pageContent.classList.toggle("overlay-shift-inactive");
        navbar.classList.toggle("navbar-shift-overlay-inactive");
    };
    sidebarCloseBtn.onclick = function () {
        sidebarElement.classList.toggle("sidebar-inactive");
        pageContent.classList.toggle("overlay-shift-inactive");
        navbar.classList.toggle("navbar-shift-overlay-inactive");
    };

    /*
    ***
    */

});
