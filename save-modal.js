//save
let savebtn = document.getElementById("app-savebtn");
let modalsavebox = document.getElementById("save-box");
let overlay = document.getElementById("overlay");
let modalsavebtn = document.getElementById("save-btn");
let input = modalsavebox.getElementsByTagName("input");
let cancelbtn = document.getElementById("cancel-btn");

//load
let modalloadbtn = document.getElementById("load-btn");
let modalloadbox = document.getElementById("load-box");
let loadbtn = document.getElementById("app-loadbtn");
let loadcancelbtn = document.getElementById("load-cancel-btn");
let colorlist = document.getElementById("colorlist");
let copybtn = document.getElementById("copy-btn");
let deletebtn = document.getElementById("delete-btn");


//Event Listeners
//overlay.addEventListener("click", closeModal);
//modalsavebox.parentElement.addEventListener("click", closeModal);
savebtn.addEventListener("click", saveFunction);
modalsavebtn.addEventListener("click", saveColorCombo);
cancelbtn.addEventListener("click", closeModal);
loadbtn.addEventListener("click", loadFunction);
loadcancelbtn.addEventListener("click", closeLoadModal);
colorlist.addEventListener("click", loadList);



function loadFunction(e) {
    modalloadbox.parentElement.classList.toggle("noclick");
    modalloadbox.classList.toggle("hidden");
    overlay.classList.toggle("transparent");
}

function loadSavedCombo(e) {
    colorlist.innerHTML = "";
    let cmbObject = {};
    let listitemreturn = [];

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        cmbObject[key] = item;
        listitemreturn.push(liBuilder(cmbObject[key], i));
    }
    //console.log(listitemreturn);
    listitemreturn.forEach(li => {
        colorlist.innerHTML += li;
    })
}

function liBuilder(color, i) {

    let listitem = `<li class= "listelement${i} hoveryn" id=li${i}> 
    <p> ${color.name.toUpperCase()} </p>
    <span class="circle1" id="circle1" style="background-color:${color.color1}" style="color:hsl(0,0,12%)"></span> 
    <span class="circle2" id="circle2" style="background-color:${color.color2}" ></span>
    <span class="circle3" id="circle3" style="background-color:${color.color3}" ></span>
    <span class="circle4" id="circle4" style="background-color:${color.color4}" ></span>
    </li>`;
    i++;
    return listitem;
}

function loadList(e) {
    listnumber = Array.from(document.getElementsByTagName("li"));

    
    listnumber.forEach(lid => {
        if (e !== undefined) {
            // console.log(copybtn.children);
            let copy = copybtn.children[0];
            let refresh = copybtn.children[1]
            console.log(e.target);
            if (e.target == lid) {
                listnumber.forEach(lid => {
                    if (lid.classList.contains("selected")) {
                        lid.classList.remove("selected");
                    }
                })
                e.target.classList.toggle("selected");
                e.target.classList.toggle("hoveryn");
                copy.classList.toggle("hidden");
                refresh.classList.toggle("hidden");
                copybtn.addEventListener("click", loadCopyColors);
                deletebtn.addEventListener("click", deleteEntry);
            }
        }
    })
}

function deleteEntry(e) {

    let deletevalue = "";
    listnumber = Array.from(document.getElementsByTagName("li"));
    let keys = Object.keys(localStorage);
    let selected;

}
// if (e.target == lid) {
//     e.target.classList.toggle("selected");
//     e.target.classList.toggle("hoveryn");
//     deletevalue = lid.children[0].innerHTML;
//     let x = deletevalue;
//     keys.forEach(key => {
//         console.log(key + "=" + x);
//         console.log(lid.classList.contains("selected"));

//         if (lid.classList.contains("selected") && key == x) {
//             console.log("im here");
//             localStorage.removeItem(deletevalue);
//             loadSavedCombo();

//         forEach
//                 }
//             })
//         }
//     })
// }


function loadCopyColors(e) {

    listnumber = Array.from(document.getElementsByTagName("li"));

    listnumber.forEach(lid => {
        let copy = copybtn.children[0];
        let refresh = copybtn.children[1]
        if (lid.classList.contains("selected")) {
            colorbox[0].style.backgroundColor = lid.children[1].style.backgroundColor;
            colorbox[1].style.backgroundColor = lid.children[2].style.backgroundColor;
            colorbox[2].style.backgroundColor = lid.children[3].style.backgroundColor;
            colorbox[3].style.backgroundColor = lid.children[4].style.backgroundColor;
            lid.classList.toggle("selected");
            lid.classList.toggle("hoveryn");
            copy.classList.toggle("hidden");
            refresh.classList.toggle("hidden");
        }
        refreshColor();
    })
}

// click escape to close popup and enter to save the color name
document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
        closeLoadModal();
    }
    else if (e.key == "Enter") {
        saveColorCombo();
    }
});

// to bring the modal front of screen when save button is clicked
function saveFunction(e) {
    modalsavebox.parentElement.classList.toggle("noclick");
    modalsavebox.classList.toggle("hidden");
    overlay.classList.toggle("transparent");
}

//to save a user defined color name is local storage
function saveColorCombo(e) {
    let name = input[0].value.trim();
    if (name !== null && name !== "") {
        let currentColors = getCurrentColors();
        let colorObject = {
            "name": name,
            "color1": currentColors[0],
            "color2": currentColors[1],
            "color3": currentColors[2],
            "color4": currentColors[3],
        };
        localStorage.setItem(name, JSON.stringify(colorObject));
        input[0].value = ""
        closeModal();
        startUp();
    }
}

//to get current colors using the hex number displayed on the 4 display boxes
function getCurrentColors() {
    let colors = [];
    colorbox.forEach(x => {
        let pelement = x.getElementsByTagName("p");
        colors.push(pelement[0].innerText);
    })
    return colors;
}

//to close the modal pop up box for save button
function closeModal(e) {
    if (!modalsavebox.classList.contains("hidden")) {
        modalsavebox.classList.add("hidden");
    }
    if (overlay.classList.contains("transparent")) {
        overlay.classList.remove("transparent");
    }
    if (modalsavebox.parentElement.classList.contains("noclick")) {
        modalsavebox.parentElement.classList.remove("noclick");
    }
}

//to close the modal pop up box for load button
function closeLoadModal(e) {
    if (!modalloadbox.classList.contains("hidden")) {
        modalloadbox.classList.add("hidden");
    }
    if (overlay.classList.contains("transparent")) {
        overlay.classList.remove("transparent");
    }
    if (modalloadbox.parentElement.classList.contains("noclick")) {
        modalloadbox.parentElement.classList.remove("noclick");
    }
}



//     let keys = Object.keys(localStorage);
//     let values = Object.values(localStorage);
//     let entrys = Object.entries(localStorage);
// if (localStorage.length > 0) {
//     var localStorageArray = new Array();
//     for (i = 0; i < localStorage.length; i++) {
//         localStorageArray[i] = localStorage.key(i) + localStorage.getItem(localStorage.key(i));
//     }
//     var sortedArray = localStorageArray.sort();
//     console.log (localStorageArray);
// }
//  if (localStorage.length > 0) {
//      var savedObject = {};
//     for (let i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
//         savedObject[key] = item;
//         console.log(savedObject);
//     }
//  }
//Object.assign(comboObject, { name: key, colors: item }); X
// comboObject.name = key; X
// comboObject.colors = item; X
// const x = "name";
// const y = "colors";
//  cmbObject[x] = key;
//  cmbObject[y] = item;


// console.log(cmbObject);
// let short=cmbObject[`${keys[0]}`];

//console.log(cmbObject[`${keys[0]}`].name); //WORKS


// listitems[0].innerText = (cmbObject.cmb1.color1 + cmbObject.cmb1.color2 +
//     cmbObject.cmb1.color3 + cmbObject.cmb1.color4);
// listitems[1].innerText = (cmbObject.cmb2.color1 + cmbObject.cmb2.color2 +
//     cmbObject.cmb2.color3 + cmbObject.cmb2.color4);
// listitems[2].innerText = (cmbObject.cmb3.color1 + cmbObject.cmb3.color2 +
//     cmbObject.cmb3.color3 + cmbObject.cmb3.color4);