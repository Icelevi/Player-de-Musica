
let player = {
     title : document.querySelector("#title"),
     music : document.querySelector("#music"),
     artist: document.querySelector("#artist"),
     poster: document.querySelector("#poster"),
     musicSource : document.querySelector("#musicSource"),
     btn_playAndPause: document.querySelector("#btn_playAndPause"),
     btn_next: document.querySelector("#btn_next"),
     currentPlaying: 0,
    

     next(){
        player.btn_playAndPause.dataset.player = "on"
         if(this.currentPlaying== (songs.length - 1)){
             this.currentPlaying = 0;
             songs[this.currentPlaying]();
             this.music.play();
             return
         };
         this.currentPlaying++;
         songs[this.currentPlaying]();
         this.music.play();
     },
     previous(){
        player.btn_playAndPause.dataset.player = "on"
        if(this.currentPlaying == 0){
            this.currentPlaying = (songs.length - 1);
            songs[this.currentPlaying]();
            this.music.play();
            return
        };
        this.currentPlaying--;
        songs[this.currentPlaying]();
        this.music.play();
    },
    start(){ player.music.onended = () => this.next()
    }
}

player.start()

window.addEventListener("load", function(){
    songs[player.currentPlaying]()
})

player.btn_playAndPause.addEventListener("click", function(){
    if(player.btn_playAndPause.dataset.player == "off"){
        player.btn_playAndPause.dataset.player = "on"
        player.music.play()
    }
    else if(player.btn_playAndPause.dataset.player == "on"){
        player.btn_playAndPause.dataset.player = "off"
        player.music.pause()
    }
});


