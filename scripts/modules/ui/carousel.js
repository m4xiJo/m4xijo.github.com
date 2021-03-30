import UI from "./ui.js";
import {config} from "../../config.js";

export default class Carousel extends UI {
  _imgSlide;
  entries;
  carousel;
  constructor(appendTo) {
    super(appendTo);
    this._imgSlide = 0;
    this.delay = config.carousel.delay;
    this.timer;
    this.entries = config.carousel.entries;
    this.carousel = document.createElement("div");
    this.createCarousel();
    this.createControls();
    this.createDots();
    super.container.appendChild(this.carousel);
    if(this.delay > 0) this.loopSlides();
    //super.container.innerHTML = this.carousel.innerHTML;
  }

  createCarousel() {
    for (let i = 0; i < this.entries.length; i++) {
      let slide = document.createElement("div");
      slide.addEventListener("mouseover", (e) => {
        this.pauseSlides();
      });
      slide.addEventListener("mouseout", (e) => {
        this.loopSlides();
      });
      slide.setAttribute("class", "slide");
      if(i == this.imgSlide) slide.classList.add("visible");
      let image = document.createElement("img");
      image.setAttribute("class", "slideimg");
      image.setAttribute("src", this.entries[i].image);
      slide.appendChild(image);
      this.carousel.appendChild(slide);
    }
  }

  createControls() {
    let controlNext = document.createElement("div");
    controlNext.setAttribute("class", "slidenext");
    controlNext.innerHTML = "&#10095;"
    this.carousel.appendChild(controlNext);
    controlNext.addEventListener("click", (e) => {
      this.imgSlide++;
    });

    let controlPrev = document.createElement("div");
    controlPrev.setAttribute("class", "slideprev");
    controlPrev.innerHTML = "&#10094;"
    this.carousel.appendChild(controlPrev);
    controlPrev.addEventListener("click", (e) => {
      this.imgSlide--;
    });
  }

  createDots() {
    let dots = document.createElement("div");
    dots.setAttribute("class", "slidedots");
    for (let i = 0; i < this.entries.length; i++) {
      let dot = document.createElement("span");
      dot.setAttribute("class", "slidedot");
      dot.setAttribute('data-number', i);
      dot.innerHTML = "&#10686;"
      dot.addEventListener("click", (e) => {
        this.imgSlide = dot.getAttribute('data-number');
      });
      dots.appendChild(dot);
    }
    this.carousel.appendChild(dots);
  }

  loopSlides() {
    this.timer = setInterval(() => {
      this.imgSlide++;
    }, this.delay * 1000);
  }

  pauseSlides() {
    clearInterval(this.timer);
  }

  set imgSlide(index) {
    this.pauseSlides();
    this._imgSlide = index;
    let slides = this.carousel.getElementsByClassName("slide");
    let dots = this.carousel.getElementsByClassName("slidedot");
    if(this.imgSlide > slides.length - 1) this._imgSlide = 0;
    else if (this.imgSlide < 0) this._imgSlide = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
      if(i == this.imgSlide) {
        slides[i].classList.add("visible");
        dots[i].innerHTML = "&#10687;"
      } 
      else {
        slides[i].classList.remove("visible");
        dots[i].innerHTML = "&#10686;"
      }
    }
    this.loopSlides();
  }

  get imgSlide() {
    return this._imgSlide;
  }
}

