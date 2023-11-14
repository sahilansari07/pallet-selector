// selectors
var colorbox = Array.from(document.getElementsByClassName("colorbox"));
var slider = Array.from(document.getElementsByClassName("slider"));
var lockButton = Array.from(document.getElementsByClassName("lock"));
const refreshButton = document.getElementById("refresh");
var loadButton = document.getElementById("app-loadbtn");

// event listners 
refreshButton.addEventListener("click", refreshColor);

// to call starup function on the start of page going live
window.onload = startUp();

// function to check if localStorage is empty/or not and vary display of load button  
function startUp() {
    let keys = Object.keys(localStorage);
    if (keys.length === 0 && !loadButton.classList.contains("hidden")) {
        loadButton.classList.add("hidden"); 
    }
    if (keys.length !== 0 && loadButton.classList.contains("hidden")) {
        loadButton.classList.remove("hidden")
    }
    loadSavedCombo();
    loadList();
}

// for locking a color in box
lockButton.forEach(x => {
    x.addEventListener("click", (e) => {
        let locked = e.target.children[1]
        let unlocked = e.target.children[0]

        unlocked.classList.toggle("hidden");
        locked.classList.toggle("hidden");

        console.log(e.target.children);
    })
});

//to adjust based on slider movement (makes color lighter / darker)
slider.forEach(x => {
    x.addEventListener("input", adjustShade);
})

function adjustShade(e) {

    let newcolorarr = [];

    let targetvalue = e.target.value;
    let direction;
    if (targetvalue > 50) {
        direction = "positive";
    }
    else { direction = "negative" }

    let redfact = factors[e.target.dataset.index].red[direction]
    let greenfact = factors[e.target.dataset.index].green[direction]
    let bluefact = factors[e.target.dataset.index].blue[direction]

    let redorigin = originalcolor[e.target.dataset.index].red
    let greenorigin = originalcolor[e.target.dataset.index].green
    let blueorigin = originalcolor[e.target.dataset.index].blue


    if (e.target.value > 50) {
        let multiplier = (e.target.value - 50)
        let newred = Math.floor((multiplier * redfact) + redorigin);
        let newgreen = Math.floor((multiplier * greenfact) + greenorigin);
        let newblue = Math.floor((multiplier * bluefact) + blueorigin);

        newcolorarr.push(newred, newgreen, newblue);

        e.target.parentNode.parentNode.style.backgroundColor = `rgb(${newred},${newgreen},${newblue})`;
        e.target.nextSibling.nextSibling.style.color = "black";
    }
    else {
        let multiplier = (50 - e.target.value) * (-1);
        let newred = Math.floor((multiplier * redfact) + redorigin);
        let newgreen = Math.floor((multiplier * greenfact) + greenorigin);
        let newblue = Math.floor((multiplier * bluefact) + blueorigin);

        newcolorarr.push(newred, newgreen, newblue);

        e.target.parentNode.parentNode.style.backgroundColor = `rgb(${newred},${newgreen},${newblue})`;
        e.target.nextSibling.nextSibling.style.color = "whitesmoke";
    }

    let y = hexGenerator(hexarr, newcolorarr);
    e.target.nextSibling.nextSibling.innerText = `#${y[0]}${y[1]}${y[2]}`.toUpperCase();

}

//to calculate hex based values for rgb values from generatecolors function
let hexarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

// to hold original slider position values
let factors = [
    { red: null, green: null, blue: null },
    { red: null, green: null, blue: null },
    { red: null, green: null, blue: null },
    { red: null, green: null, blue: null }
];

// to hold olriginal slider color values
let originalcolor = [
    { red: null, green: null, blue: null },
    { red: null, green: null, blue: null },
    { red: null, green: null, blue: null },
    { red: null, green: null, blue: null }
];

// to generate % movement of slider based on rgb values
function generateFactors(colors) {
    let factors = [];
    colors.forEach(x => {
        factors.push({ positive: (255 - x) / 50, negative: x / 50 });
    })
    return factors;
}

// to generate colors in all 4 boxes
function generateColor() {
    let redcol = Math.floor(Math.random() * 256);
    let greencol = Math.floor(Math.random() * 256);
    let bluecol = Math.floor(Math.random() * 256);
    return [redcol, greencol, bluecol];
}

// get new random color in a box when refresh button is pressed & lock functionality
function refreshColor() {
    let locked;
    let itr = 0; //iterative variable
    colorbox.forEach(box => {
        const lockButton = box.getElementsByClassName("lock");
        if (lockButton[0].children[0].classList.contains("hidden")) {
            locked = false;
        }
        else { locked = true; }

        if (!locked) {
            let colors = generateColor(); // variable to store rgb vales generated for each box
            let storedfactors = generateFactors(colors); // to calculate offset distance of the slider from the center

            originalcolor[itr].red = colors[0];
            originalcolor[itr].green = colors[1];
            originalcolor[itr].blue = colors[2];

            factors[itr].red = storedfactors[0];
            factors[itr].green = storedfactors[1];
            factors[itr].blue = storedfactors[2];

            box.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
            let hex = hexGenerator(hexarr, colors);
            hexcolor = `#${hex[0]}${hex[1]}${hex[2]}`

            var colordisplay = box.getElementsByTagName("p");
            colordisplay[0].innerText = hexcolor.toUpperCase();
            itr++;
            box.getElementsByClassName("slider")[0].value = 50;
            //startUp();
        }
    })
}

// to get hex number for each color
function hexGenerator(hexarr, colors) {

    var newarr = [];

    for (let i = 0; i < colors.length; i++) {
        arr = hexConverter(colors[i]);
        var var1 = hexarr[arr[0]].toString();
        var var2 = hexarr[arr[1]].toString();
        newarr.push([var1 + var2]);
    }
    return newarr;
}

// to get all the rgb values from colors array converted into hex format
function hexConverter(x) {
    let original = x / 16;
    let first = Math.floor(original);
    let second = ((original - first) * 16);
    return [first, second];
}

// initial color fill in display boxes
refreshColor();



