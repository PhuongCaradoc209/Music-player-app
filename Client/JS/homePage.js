function scroll_left(){
    var left = document.querySelector(".library_box-header-cover-scroll");
    left.scrollBy({ 
            left: -150,
            behavior: 'smooth' });
}

function scroll_right(){
    var right = document.querySelector(".library_box-header-cover-scroll");
    right.scrollBy({ 
            left: 150,
            behavior: 'smooth' });
}