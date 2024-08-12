var currentCard = null;
var song = document.getElementById("song");

var progress = document.getElementById("progress");
var ctrlIcon = document.getElementById("control-icon");

var record = document.getElementById("record");
var songImg = document.getElementById("song-image");

var left_timetrack = document.getElementById("left_timetrack");
var right_timetrack = document.getElementById("right_timetrack");

updatePlaylist_Heading();

//SET UP 
song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

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

song.addEventListener('timeupdate', function() {
    if (song.currentTime === song.duration) {
        nextSong();
    }
});

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");

    record.classList.add("play");
    songImg.classList.add("play");

    record.classList.remove("paused");
    songImg.classList.remove("paused");

    document.getElementById("control-icon").setAttribute('title', "pause");
}

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


// Đặt sự kiện click trên phần tử cha chứa các song_card
document.getElementById('playlist_box-songs').addEventListener('click', function (event) {
    // Kiểm tra nếu phần tử được nhấp là một song_card
    let clickedCard = event.target.closest('.song_card');
    if (clickedCard.id === "song_card") {
       updateSong(clickedCard);
    }
});

// Đặt thời gian cho mỗi thẻ bài
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
function playMuic() {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");

    record.classList.add("play");
    songImg.classList.add("play");

    record.classList.remove("paused");
    songImg.classList.remove("paused");

    document.getElementById("control-icon").setAttribute('title', "pause");
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

function updateSong(clickedCard){
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
        playMuic();
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
}

function nextSong() {
    if (currentCard) {
        var i = 0;
        let box = document.querySelectorAll('.song_card');

        for (; i < box.length; i++) {
            if(box.item(i) === currentCard){
                break;
            }
        }
        i++; 
        if(i < box.length){
            updateSong(box.item(i));
        }
        else{
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

function previousSong(){
    if (currentCard) {
        var i = 0;
        let box = document.querySelectorAll('.song_card');

        for (; i < box.length; i++) {
            if(box.item(i) === currentCard){
                break;
            }
        }
        i--;
        updateSong(box.item(i));
    }
}

function updatePlaylist_Heading(){
    let box = document.querySelectorAll('.song_card');
    document.querySelector('#playlist_heading-infor span:nth-child(3)').innerHTML = (box.length).toString() + " songs";
}

function playlistVisible(){
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

function lyricsVisible(){
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