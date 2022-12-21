// Initializing the variables
let songIndex = 0;
let audioElement = new Audio("/sounds/song1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Besharam Rang (Pathan)", filePath: "sounds/song1.mp3", coverPath: "images/song1.jpeg" },
    { songName: "Kesariya (Brahmastra)", filePath: "sounds/song2.mp3", coverPath: "images/song2.jpeg" },
    { songName: "Dandelion (Ruth B.)", filePath: "sounds/song3.mp3", coverPath: "images/song3.jpg" },
    { songName: "Light Switch (Charlie Puth)", filePath: "sounds/song4.mp3", coverPath: "images/song4.png" },
    { songName: "As it was (Harry Styles)", filePath: "sounds/song5.mp3", coverPath: "images/song5.png" }
]

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle Play/Pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// Listen to Evenets
audioElement.addEventListener('timeupdate', () => {
    // Update Progress
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

let makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.currentTime = 0;
        audioElement.src = `sounds/song${songIndex+1}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    }
    else {
        songIndex += 1
    }
    audioElement.src = `sounds/song${songIndex + 1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add('fa-pause-circle');
})


document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1
    }
    audioElement.src = `sounds/song${songIndex + 1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add('fa-pause-circle');
})