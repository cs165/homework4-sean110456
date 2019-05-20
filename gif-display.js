// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(fore,imgUrl) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.fore = fore;
    this.imgUrl = imgUrl;
    this.prelaodImg = [];
    this.lastImgIndex = null;
    this.preload(0);
    this.updateImg = this.updateImg.bind(this);
    this.loadComplete = this.loadComplete.bind(this);
    document.addEventListener('load-complete',this.loadComplete);
    //double buffer
    this.back = document.querySelector('#back');
    this.back.classList.add('inactive');
    this.front = true; //displaying this.fore
  }
  // TODO(you): Add methods as necessary.
  preload(i){
      if(i===this.imgUrl.length){
        return;
      }
      if(this.prelaodImg.length >= 2){
        document.dispatchEvent(new CustomEvent('load-complete',{}));
      }
      const tImg = document.createElement('img');
      tImg.src = this.imgUrl[i];
      //when load is done, load next
      tImg.addEventListener('load',(event)=>{this.preload(++i);
        console.log('loaded '+tImg.src);
      })
      this.prelaodImg.push(tImg);
  }
  updateImg(){
    this.fore.classList.toggle('inactive');
    this.back.classList.toggle('inactive');
    if(this.front){
      const index = this.prepareImgIndex();
      this.front = false;
      this.fore.style.backgroundImage = 'url('+this.prelaodImg[index].src+')';
    }
    else{
      const index = this.prepareImgIndex();
      this.front = true;
      this.back.style.backgroundImage = 'url('+this.prelaodImg[index].src+')';
    }    
  }
  prepareImgIndex(){
    let imgIndex = null;
    do{ //prevent duplicate gif from showing up twice in a row
      imgIndex = Math.floor(Math.random() * Math.floor(this.prelaodImg.length));
    }while(this.lastImgIndex === imgIndex);
    this.lastImgIndex = imgIndex;
    return imgIndex;
  }
  loadComplete(){
    const imgIndex = this.prepareImgIndex();
    this.fore.style.backgroundImage = 'url('+this.prelaodImg[imgIndex].src+')';
    const nextImgIndex = this.prepareImgIndex();
    this.back.style.backgroundImage = 'url('+this.prelaodImg[nextImgIndex].src+')';
    document.addEventListener('kick',this.updateImg);
  }
}
