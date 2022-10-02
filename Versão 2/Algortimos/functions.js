function openTab(evt, tabName){

    var i, tab_pane, tab_link;

    tab_pane = document.getElementsByClassName("tab_pane");
    for (i = 0; i < tab_pane.length; i++) {
        tab_pane[i].style.display = "none";
    }

    tab_link = document.getElementsByClassName("nav_link");
    for (i = 0; i < tab_link.length; i++) {
        tab_link[i].className = tab_link[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}