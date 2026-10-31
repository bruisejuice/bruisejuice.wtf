/** based on "Sparkle Trail and Dust Cursor" by sarahwfox on CodePen **/
/** this is a modified version that removes 1/2 of the trail & disables the effect on mobile **/
/** credits: https://codepen.io/sarahwfox/pen/pNrYGb **/

function isMobile() {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if(!isMobile()){
var colour = "white"; // Use "random" for random colours
var sparkles = 100;   // Number of sparkles

var x = 0, y = 0;
var ox = 0, oy = 0;
var swide = 800, shigh = 800;
var sleft = 0, sdown = 0;

var star = [];
var starv = [];
var starx = [];
var stary = [];
var tiny = [];
var tinyv = [];
var tinyx = [];
var tinyy = [];

var initialized = false;

// Track the mouse position
document.onmousemove = mouse;
window.onscroll = set_scroll;
window.onresize = set_width;

function mouse(e) {
    e = e || window.event;

    if (typeof e.pageX === "number") {
        x = e.pageX;
        y = e.pageY;
    } else {
        set_scroll();
        x = e.clientX + sleft;
        y = e.clientY + sdown;
    }
}

function sparkle() {
    var c;

    // Create new sparkles only when the mouse moves
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;

        for (c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                starx[c] = x;
                stary[c] = y + 1;

                star[c].style.left = starx[c] + "px";
                star[c].style.top = stary[c] + "px";
                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";

                var starColour =
                    colour === "random" ? newColour() : colour;

                star[c].childNodes[0].style.backgroundColor = starColour;
                star[c].childNodes[1].style.backgroundColor = starColour;

                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
    }

    for (c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }

    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i] === 25) {
        star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    }

    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;

        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
        }
    } else {
        tinyv[i] = 50;
        tinyy[i] = stary[i];
        tinyx[i] = starx[i];

        tiny[i].style.top = tinyy[i] + "px";
        tiny[i].style.left = tinyx[i] + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor =
            star[i].childNodes[0].style.backgroundColor;
        tiny[i].style.visibility = "visible";

        star[i].style.visibility = "hidden";
    }
}

function update_tiny(i) {
    if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }

    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;

        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else {
        tiny[i].style.visibility = "hidden";
    }
}

function set_scroll() {
    sdown = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;

    sleft = window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft || 0;
}

function set_width() {
    swide = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth || 800;

    shigh = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 600;
}

function createDiv(height, width) {
    var div = document.createElement("div");

    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    div.style.pointerEvents = "none";

    return div;
}

function newColour() {
    var c = [
        255,
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];

    // Shuffle the colour channels
    for (var i = c.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = c[i];
        c[i] = c[j];
        c[j] = temp;
    }

    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
}

function initSparkles() {
    if (initialized) return;
    initialized = true;

    set_width();
    set_scroll();

    for (var i = 0; i < sparkles; i++) {
        // Main falling star
        var s = createDiv(5, 5);
        s.style.visibility = "hidden";
        s.style.zIndex = "999";
        s.style.clip = "rect(0px, 5px, 5px, 0px)";

        var horizontal = createDiv(1, 5);
        var vertical = createDiv(5, 1);

        horizontal.style.position = "absolute";
        horizontal.style.top = "2px";
        horizontal.style.left = "0px";

        vertical.style.position = "absolute";
        vertical.style.top = "0px";
        vertical.style.left = "2px";

        s.appendChild(horizontal);
        s.appendChild(vertical);
        document.body.appendChild(s);

        star[i] = s;
        starv[i] = 0;

        // Tiny fading particle
        var t = createDiv(3, 3);
        t.style.visibility = "hidden";
        t.style.zIndex = "999";
        t.style.pointerEvents = "none";

        document.body.appendChild(t);

        tiny[i] = t;
        tinyv[i] = 0;
    }

    sparkle();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSparkles);
} else {
    initSparkles();
}
}
