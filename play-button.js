// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.playing = true;
    this.onSwitch = this.onSwitch.bind(this);
    document.addEventListener('playBtnClick',this.onSwitch);
  }
  // TODO(you): Add methods as necessary.
  onSwitch(event){
    if(this.playing){
      this.playing = false;
      document.dispatchEvent(new CustomEvent('pause',{}));
      this.containerElement.src = 'images/play.png';
    }
    else{
      this.playing = true;
      document.dispatchEvent(new CustomEvent('play',{}));
      this.containerElement.src = 'images/pause.png';
    }
  }
}
