//Everything
const app =  () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector("body > div > div.vid-container > video");
    const chooseSong = document.querySelector(".choose-song");
    const chooseVid = document.querySelector(".choose-vid");

//Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    const musics = ["./sounds/rain.mp3",
        "./sounds/ambient.mp3",
        "./sounds/beach.mp3",
        "./sounds/chill.mp3",
        "./sounds/meditateRain.mp3",
        "./sounds/ocean-deep.mp3",
        "./sounds/peaceful.mp3",
        "./sounds/serene.mp3"
    ]
    const videos = ["./videos/rain.mp4",
        "./videos/beach.mp4",
        "./videos/peCup.mp4",
        "./videos/peCups.mp4",
        "./videos/peIvan.mp4",
        "./videos/smoke.mp4" 
    ]
// Time Display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button")
    //Get lentght pf outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 10;


    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength

// PLay different Sounds
        chooseSong.addEventListener("click", function () {
        song.src = musics[Math.floor(Math.random() * 7)];
            checkPlaying(song, video)
        })
    
        chooseVid.addEventListener("click", function () {
            video.src = videos[Math.floor(Math.random() * 5)];
        checkPlaying(song, video);
             
            })
    
//play sound
    play.addEventListener("click", () => {
        checkPlaying(song, video);
    });


    // Select time Sound
    timeSelect.forEach(time => {
        time.addEventListener("click", function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`;
        });
    });

    const checkPlaying = (song, video) => {
        if (song.paused || video.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }
        else {
            song.pause()
            video.pause()
            play.src = "./svg/play.svg"
        }
    };

// We can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60)

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            video.pause();
            play.src = "./svg/play.svg"
        };
    };

}



app()
