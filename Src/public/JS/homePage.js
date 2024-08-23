document.addEventListener('DOMContentLoaded', function () {

    setUp();

    document.getElementById("main_heading-cover-button_1").addEventListener('click', function () {
        document.getElementById("mid_box_main").classList.add('hide');
        document.getElementById("mid_box_searching").classList.add('show');
    });

    document.getElementById("main_heading-cover-button_2").addEventListener('click', function () {
        document.getElementById("mid_box_main").classList.remove('hide');
        document.getElementById("mid_box_searching").classList.remove('show');
    });

    setInterval(function(){
        var right = document.querySelector(".mid_box_main_p1_scroll");
        if (right.scrollLeft + right.clientWidth >= right.scrollWidth) {
            right.scrollTo({ left: 0, behavior: 'smooth' });
        }else{
            right.scrollBy({
                left: 820,
                behavior: 'smooth'
            });
        }
    }, 5000)
});

function setUp() {
    var username = document.getElementById("username").textContent;
    var mid_box_main_p2_title = document.getElementById("mid_box_main_p2_title");
    mid_box_main_p2_title.innerHTML = "For " + username;
}

function scroll_left() {
    var left = document.querySelector(".library_box-header-cover-scroll");
    left.scrollBy({
        left: -150,
        behavior: 'smooth'
    });
}

function scroll_right() {
    var right = document.querySelector(".library_box-header-cover-scroll");
    right.scrollBy({
        left: 150,
        behavior: 'smooth'
    });
}

function scroll_left_main_p1() {
    var left = document.querySelector(".mid_box_main_p1_scroll");
    left.scrollBy({
        left: -820,
        behavior: 'smooth'
    });
}

function scroll_right_main_p1() {
    var right = document.querySelector(".mid_box_main_p1_scroll");
    right.scrollBy({
        left: 820,
        behavior: 'smooth'
    });
}