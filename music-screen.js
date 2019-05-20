// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.imgUrl = [];
    this.gifDisplay = null;
    this.audioPlayer = null;
    this.playBtn = null;
    this.onKick = this.onKick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.loadingScreen = null;
    this.loadComplete = this.loadComplete.bind(this);
    document.addEventListener('load-complete',this.loadComplete);
  }
  // TODO(you): Add methods as necessary.
  show(){   
    this.containerElement.classList.remove('inactive');
  }  
  hide(){
    this.containerElement.classList.add('inactive');
  }
  loadScreen(songUrl,theme){
    const urlHead = 'https://api.giphy.com/v1/gifs/search?';
    const q = 'q=' + encodeURIComponent(theme);
    const api_key = '&api_key=IZdz8B09DglQg3dTJUMTgqLGCesMPOVZ';
    const limit = '&limit=25';
    const rating = '&rating=g';
    const url = urlHead + q + api_key + limit + rating;
    fetch(url).then(response=>response.json(),error=>console.log(error))
      .then(json=>{
        if(json.data.length > 2){ //show the screen
          this.loadingScreen = document.querySelector('#loading');
          this.loadingScreen.classList.remove('inactive');          
          for(let d of json.data){
            this.imgUrl.push(d.images.downsized.url);
          }
          const imageBox = document.querySelector('#fore');
          this.gifDisplay = new GifDisplay(imageBox,this.imgUrl);
          this.audioPlayer = new AudioPlayer();
          this.audioPlayer.setSong(songUrl);
          this.audioPlayer.setKickCallback(this.onKick);
          const btn = document.querySelector('#music img');
          this.playBtn = new PlayButton(btn);
          btn.addEventListener('click',this.onClick);
          document.addEventListener('play',this.onPlay);
          document.addEventListener('pause',this.onPause);
        }
        else{
          document.dispatchEvent(new CustomEvent('notEnoughError',{detail:{}}))
        }
      })
  }
  onKick(){
    console.log('kick');
    document.dispatchEvent(new CustomEvent('kick',{}));
  }
  onClick(event){
    document.dispatchEvent(new CustomEvent('playBtnClick',{}));
  }
  onPlay(event){
    this.audioPlayer.play();
  }
  onPause(event){
    this.audioPlayer.pause();
  }
  loadComplete(event){
    this.loadingScreen.classList.add('inactive');
    this.show();
    this.audioPlayer.play();
  }
}
