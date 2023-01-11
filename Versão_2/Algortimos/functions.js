const { app, BrowserWindow } = require('electron');
let mainWindow;
app.on('ready', () => {

    mainWindow = new BrowserWindow({

        icon:  'Icones/Logotipo 2.png',
        autoHideMenuBar: true,
    });
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/initial_page.html`)
    
});
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

    document.getElementById('par_turb').style.display = "none";
    document.getElementById('divHidroeletrica').style.display = "none";
    
    let turb_rad = document.getElementsByClassName("labelturb");
    for (i = 0; i < turb_rad.length; i++) {
        turb_rad[i].style.display = "none";
    }

}