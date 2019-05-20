// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.songSelector = document.querySelector('#song-selector');
    this.themeInput = document.querySelector('#query-input');
    this.form = document.querySelector('form');
    const jsonPath = 'https://fullstackccu.github.io/homeworks/hw4/songs.json';
    
    //load songs info & set song selector
    fetch(jsonPath).then(response=>response.json(),error => console.log(error))
        .then(json =>{
          this.songs = Object.entries(json);
          for(let s of this.songs){
            let opt = document.createElement('option');
            opt.textContent = s[1].artist + ': ' + s[0];
            this.songSelector.appendChild(opt);
          }
        });

    //set theme
    this.themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space']
    const themeIndex = Math.floor(Math.random() * Math.floor(this.themes.length));
    this.themeInput.value = this.themes[themeIndex];
    //submit button
    this.onSubmit = this.onSubmit.bind(this);
    this.form.addEventListener('submit',this.onSubmit);
    this.errorHandler = this.errorHandler.bind(this);
    document.addEventListener('notEnoughError',this.errorHandler);
  }
  // TODO(you): Add methods as necessary.
  show(){
    this.containerElement.classList.remove('inactive');
  }
  hide(){
    this.containerElement.classList.add('inactive');
  }
  onSubmit(event){
    event.preventDefault();
    let options = document.querySelectorAll('option');
    const tSong = this.songs[this.songSelector.selectedIndex];
    const songUrl = tSong[1].songUrl;
    if(this.themeInput.value === ''){ //if the user left the theme blank.
      const themeIndex = Math.floor(Math.random() * Math.floor(this.themes.length));
      this.themeInput.value = this.themes[themeIndex];
    }
    //console.log(this.themeInput.value);
    const eventInfo = {
        song: songUrl,
        theme: this.themeInput.value
    }
    document.dispatchEvent(new CustomEvent('submitted',{detail:eventInfo}))
  }
  errorHandler(){
    document.querySelector('#error').classList.remove('inactive');
  }
}