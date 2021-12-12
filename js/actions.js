


const playerActions = {


    secondsToMinutes(time) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(-2)}`
    },

    btn_play_on() {
        playerElements.btn_playAndPause.dataset.player = "on"
    },


    MusicPlayingUpdate() {
        playerElements.music.src = musics[playerElements.currentPlaying].musicSource;
        playerElements.artist.innerHTML = musics[playerElements.currentPlaying].artist;
        playerElements.title.innerHTML = musics[playerElements.currentPlaying].title;
        playerElements.poster.src = musics[playerElements.currentPlaying].poster;
        playerElements.music.load();
        playerElements.music.play();
        playerElements.music.onloadeddata = () => {
            this.Actions()
        };
    },
    Actions() {
        this.nextAfterEnded();
        this.seekbarActions();
        this.volumeActions();
        playerElements.totalDuration.innerHTML = this.secondsToMinutes(playerElements.music.duration);
        playerElements.music.ontimeupdate = () => this.timeupdate()
    },

    timeupdate() {
        playerElements.currentDuration.innerHTML = this.secondsToMinutes(playerElements.music.currentTime)
        playerElements.seekbar.value = playerElements.music.currentTime;
    },
    nextMusic() {
        this.btn_play_on()
        if (playerElements.currentPlaying == (musics.length - 1)) {
            playerElements.currentPlaying = 0;
            this.MusicPlayingUpdate();
            return
        };
        playerElements.currentPlaying++;
        this.MusicPlayingUpdate();
    },

    previousMusic() {
        this.btn_play_on()
        if (playerElements.currentPlaying == 0) {
            playerElements.currentPlaying = (musics.length - 1);
            this.MusicPlayingUpdate();
            return
        };
        playerElements.currentPlaying--;
        this.MusicPlayingUpdate();
    },

    nextAfterEnded() {
        playerElements.music.onended = () => this.nextMusic();
        playerElements.seekbar.max = playerElements.music.duration;
    },


    playSelectedMusic(musicnum) {
        this.btn_play_on();
        playerElements.currentPlaying = musicnum;
        this.MusicPlayingUpdate();
    },

    setSeek(value) {
        playerElements.seekbar.max = playerElements.music.duration;
        playerElements.music.currentTime = value
    },
    seekbarActions() {
        playerElements.seekbar.oninput = () => this.setSeek(playerElements.seekbar.value);
        playerElements.seekbar.onchange = () => this.setSeek(playerElements.seekbar.value);
    },
    setVolume(value) {
        playerElements.music.volume = value / 100
    },
    volumeActions() {
        playerElements.volumeControl.oninput = () => this.setVolume(playerElements.volumeControl.value)
        playerElements.volumeControl.onchange = () => this.setVolume(playerElements.volumeControl.value)
    }

}
window.addEventListener("load", function () {
    playerActions.nextAfterEnded()
    playerActions.MusicPlayingUpdate()
    console.log("teste")
})



//TOGGLE ON/OFF MUTE
playerElements.volume.addEventListener("click", function () {
    if (playerElements.music.muted != true) {
        playerElements.music.muted = true;
        playerElements.volume.dataset.situation = "muted"
    }
    else {
        playerElements.music.muted = false
        playerElements.volume.dataset.situation = "unmuted"
    }
})



//PAUSE AND PLAY
playerElements.btn_playAndPause.addEventListener("click", function () {
    if (playerElements.btn_playAndPause.dataset.player == "off") {
        playerElements.btn_playAndPause.dataset.player = "on"
        playerElements.music.play()
    }
    else if (playerElements.btn_playAndPause.dataset.player == "on") {
        playerElements.btn_playAndPause.dataset.player = "off"
        playerElements.music.pause()
    }
});

//VOLUME CONTROL





