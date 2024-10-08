var title = document.getElementById("title-web");

var currentCard = null;
var song = document.getElementById("song");

var progress = document.getElementById("progress");
var ctrlIcon = document.getElementById("control-icon");

var record = document.getElementById("record");
var songImg = document.getElementById("song-image");

var left_timetrack = document.getElementById("left_timetrack");
var right_timetrack = document.getElementById("right_timetrack");

var heart_icon = document.getElementById("heart_icon");

// var volume = document.getElementById("volume-scale");

document.addEventListener('DOMContentLoaded', function () {
    let playing_mode_repeat_icon = document.getElementById("audio-control-repeat-icon");
    let playing_mode_repeat = "disable";
    let playing_mode_shuffle_icon = document.getElementById("audio-control-shuffle-icon");
    let playing_mode_shuffle = "disable";

    set_up();
    // volumeVisible();
    auto_play();

    // HEART ICON
    heart_icon.addEventListener('click', function () {
        if (heart_icon.src.endsWith("Icon/heart.png")) {
            heart_icon.src = "../Icon/heart_clicked.png";
        } else {
            heart_icon.src = "../Icon/heart.png";
        }
    });

    // REPEAT MODE
    playing_mode_repeat_icon.addEventListener('click', function () {
        console.log(playing_mode_repeat);
        switch (playing_mode_repeat) {
            case "disable":
                playing_mode_repeat_icon.src = "../Icon/repeat_all.png";
                playing_mode_repeat = "repeat_all";
                playing_mode_repeat_icon.title = "Repeat all";
                break;
            case "repeat_all":
                playing_mode_repeat_icon.src = "../Icon/repeat_one.png";
                playing_mode_repeat = "repeat_one";
                playing_mode_repeat_icon.title = "Repeat one";
                break;
            case "repeat_one":
                playing_mode_repeat_icon.src = "../Icon/repeat_disable.png";
                playing_mode_repeat = "disable";
                playing_mode_repeat_icon.title = "Disable";
                auto_play();
                break;
            default:
                break;
        }
    });

    // SHUFFLE MODE
    playing_mode_shuffle_icon.addEventListener('click', function () {
        switch (playing_mode_shuffle) {
            case "disable":
                playing_mode_shuffle_icon.src = "../Icon/shuffle.png";
                playing_mode_shuffle = "shuffle";
                playing_mode_shuffle_icon.title = "Shuffle";
                shuffle_mode();
                break;
            case "shuffle":
                playing_mode_shuffle_icon.src = "../Icon/shuffle_disable.png";
                playing_mode_shuffle = "disable";
                playing_mode_shuffle_icon.title = "Disable";
                auto_play();
                break;
            default:
                break;
        }
    });
});

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;

    // song.volume = 1.0;
    // volume.max = 100;

    // volume.value = song.volume * 100;

    // let parentDiv = document.getElementById('audio-control-volume');
    // let volume_icon = parentDiv.querySelector('i');
    // volume_icon.classList.remove("fa-volume-low");
    // volume_icon.classList.remove("fa-volume-off");
    // volume_icon.classList.add("fa-volume-high");
}

// volume.addEventListener('input', function () {
//     let parentDiv = document.getElementById('audio-control-volume');
//     let volume_icon = parentDiv.querySelector('i');
//     if (volume.value >= 20 && volume.value < 60) {
//         volume_icon.classList.remove("fa-volume-high");
//         volume_icon.classList.remove("fa-volume-off");
//         volume_icon.classList.add("fa-volume-low");
//     } else if (volume.value >= 0 && volume.value < 20) {
//         volume_icon.classList.remove("fa-volume-low");
//         volume_icon.classList.remove("fa-volume-high");
//         volume_icon.classList.add("fa-volume-off");
//     } else if (volume.value >= 60 && volume.value <= 100) {
//         volume_icon.classList.remove("fa-volume-low");
//         volume_icon.classList.remove("fa-volume-off");
//         volume_icon.classList.add("fa-volume-high");
//     }

//     song.volume = ((volume.value) / 100);
// });

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

if (song.pause()) {
    record.classList.remove("play");
    songImg.classList.remove("play");

    record.classList.add("paused");
    songImg.classList.add("paused");
}

progress.onchange = function () {
    if (currentCard) {
        song.play();
        song.currentTime = progress.value;
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");

        record.classList.add("play");
        songImg.classList.add("play");

        record.classList.remove("paused");
        songImg.classList.remove("paused");

        document.getElementById("control-icon").title = "Pause";
    }
}

//SET TIME FOR PROGRESS
song.addEventListener('loadedmetadata', function () {
    let minutes = Math.floor(song.duration / 60);
    let seconds = Math.floor(song.duration % 60);
    right_timetrack.innerHTML = minutes.toString() + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds.toString());
});

setInterval(function () {
    let minutes, seconds;
    minutes = Math.floor(song.currentTime / 60);
    seconds = Math.floor(song.currentTime % 60);
    left_timetrack.innerHTML = minutes.toString() + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds.toString());
}, 500);


//SELECT SONG CARD
document.getElementById('playlist_box-songs').addEventListener('click', function (event) {
    // Kiểm tra nếu phần tử được nhấp là một song_card
    let clickedCard = event.target.closest('.song_card');
    if (clickedCard.id === "song_card") {
        updateSong(clickedCard);
    }
});

//SET TIME FOR SONG CARDS
document.querySelectorAll('.song_card').forEach((song_card) => {
    let song_audio = song_card.querySelector('audio');

    if (song_audio) {
        // Đảm bảo rằng thuộc tính duration có sẵn
        song_audio.addEventListener('loadedmetadata', () => {
            let song_card_time = song_card.querySelector('#song_card-time');
            if (song_card_time) {
                let minutes = Math.floor(song_audio.duration / 60);
                let seconds = Math.floor(song_audio.duration % 60);
                song_card_time.innerHTML = minutes.toString() + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds.toString());
            }
        });
    }
});

//FUNCTION
function playMusic() {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");

    record.classList.add("play");
    songImg.classList.add("play");

    record.classList.remove("paused");
    songImg.classList.remove("paused");

    document.getElementById("control-icon").setAttribute('title', "Pause");
}

function pauseMusic() {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");

    record.classList.remove("play");
    songImg.classList.remove("play");

    record.classList.add("paused");
    songImg.classList.add("paused");

    document.getElementById("control-icon").setAttribute('title', "play");
}

function playPause() {

    if (currentCard) {
        //playing music
        if (ctrlIcon.classList.contains("fa-pause")) {
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");

            record.classList.remove("play");
            songImg.classList.remove("play");

            record.classList.add("paused");
            songImg.classList.add("paused");

            document.getElementById("control-icon").setAttribute('title', "play");
        }
        //stopping music
        else {
            song.play();
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");

            record.classList.add("play");
            songImg.classList.add("play");

            record.classList.remove("paused");
            songImg.classList.remove("paused");

            document.getElementById("control-icon").setAttribute('title', "pause");
        }
    }
}

function updateSong(clickedCard) {
    currentCard = clickedCard;
    // Toggle lớp "clicked"
    clickedCard.classList.add("clicked");

    // Xóa lớp "selected" từ tất cả các thẻ bài
    document.querySelectorAll('.song_card').forEach(song_card => {
        if (song_card !== clickedCard) {
            song_card.classList.remove("clicked");
        }
    });
    //AUDIO UPDATE
    let clickedCard_audio = clickedCard.querySelector('audio');
    if (clickedCard_audio) {
        let source = clickedCard_audio.querySelector('source');
        if (source) {
            song.src = source.src;
            song.load();
        }
        playMusic();
    }
    //RECORD IMAGE UPDATE
    let record_image = clickedCard.querySelector('img');
    if (record_image) {
        let song_img = document.getElementById("song-image");
        song_img.src = record_image.src;

        //BACKGROUND UPDATE
        let box = document.getElementById("wrapper-overlay");
        box.style.backgroundImage = "url(" + record_image.src + ")";
    }

    //SONG NAME AND AUTHOR
    let p = clickedCard.getElementsByTagName('p');
    let name_song = p[1].textContent;
    document.getElementById("playing_heading-titleSong").textContent = name_song;
    let author = p[2].textContent;
    document.getElementById("playing_heading-author").textContent = author;

    //UPDATE TITLE WEB
    title.innerHTML = name_song + " - " + author + " | Phonia";
}

function nextSong() {
    if (currentCard) {
        var i = 0;
        let box = document.querySelectorAll('.song_card');

        for (; i < box.length; i++) {
            if (box.item(i) === currentCard) {
                break;
            }
        }
        i++;
        if (i < box.length) {
            updateSong(box.item(i));
        }
        else {
            progress.value = 0;
            song.currentTime = 0;

            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");

            record.classList.remove("play");
            songImg.classList.remove("play");

            record.classList.add("paused");
            songImg.classList.add("paused");
        }

    }
}

function previousSong() {
    if (currentCard) {
        var i = 0;
        let box = document.querySelectorAll('.song_card');

        for (; i < box.length; i++) {
            if (box.item(i) === currentCard) {
                break;
            }
        }
        i--;
        updateSong(box.item(i));
    }
}

function set_up() {
    let box = document.querySelectorAll('.song_card');
    document.querySelector('#playlist_heading-infor span:nth-child(3)').innerHTML = (box.length).toString() + " songs";

    for (let i = 0; i < box.length; i++) {
        box.item(i).querySelector('#order').innerHTML = i + 1;
    }

}

function playlistVisible() {
    var playlistBox = document.getElementById('playlist_box');
    var playingLyricsBox = document.getElementById('playing_lyrics_box');

    if (playlistBox.classList.contains('hidden')) {
        playlistBox.classList.remove('hidden');
        playlistBox.classList.add('visible');
        playingLyricsBox.classList.add('shifted');
    } else {
        playlistBox.classList.remove('visible');
        playlistBox.classList.add('hidden');
        playingLyricsBox.classList.remove('shifted');
    }
}

function lyricsVisible() {
    var lyricsBox = document.getElementById('lyric_box');
    var playingBox = document.getElementById('playing_box');

    console.log('lyricsBox:', lyricsBox);
    console.log('playingBox:', playingBox);

    if (lyricsBox.classList.contains('hidden')) {
        lyricsBox.classList.remove('hidden');
        lyricsBox.classList.add('visible');
        playingBox.classList.add('shifted');
    } else {
        lyricsBox.classList.remove('visible');
        lyricsBox.classList.add('hidden');
        playingBox.classList.remove('shifted');
    }
}

// function volumeVisible() {
//     let parentDiv = document.getElementById('audio-control-volume');
//     let volume = document.getElementById('volume-scale');

//     parentDiv.addEventListener("mouseover", function () {
//         volume.classList.add('visible');
//     });

//     parentDiv.addEventListener("mouseout", function () {
//         volume.classList.remove('visible');
//     });
// }

function auto_play() {
    song.addEventListener('timeupdate', function () {
        if (song.currentTime === song.duration) {
            nextSong();
        }
    });
}

function shuffle_mode() {
    let box = document.querySelectorAll('.song_card');
    let parent = box[0].parentNode;  // Get the parent node of the song cards
    let j, index;

    if(currentCard){
        for(let i = 0; i < box.length; i++){
            if(box.item(i) === currentCard){
                index = i;
                break;
            }
        }
    
        for (let i = box.length - 1; i > index; i--) {
            j = Math.floor(Math.random() * (i - index + 1 + 1) + index + 1);
            // Swap the DOM elements within their parent
            parent.insertBefore(box[i], box[j]);
        }
    }else{
        for (let i = box.length - 1; i >= 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            console.log(i + " " + j);
            // Swap the DOM elements within their parent
            parent.insertBefore(box[i], box[j]);
        }
    }
 
    set_up();
    auto_play();
}


function repeat_all_mode() {
    let box = document.querySelectorAll('.song_card');
    song.addEventListener('timeupdate', function () {
        if (song.currentTime === song.duration && currentCard === box.item(box.length - 1)) {
            updateSong(box.item(0));
        } else {
            auto_play();
        }
    });
}