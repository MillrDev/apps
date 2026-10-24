<template>
  <!-- Slideshow container -->
  <div class="slideshow-container">
    <!-- Full-width images with number and caption text -->
    <div class="mySlides fade">
      <div class="numbertext">1 / 6</div>
      <img src="../../assets/myspace/beeriokart.png" style="width: 100%" />
      <div class="text">
        Vinder af ITU beeriokart fall 2026 (mit støste flex)
      </div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">2 / 7</div>
      <img src="../../assets/myspace/malfoy.png" style="width: 100%" />
      <div class="text">Mig som Malfoy til halloween sidste år</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">3 / 7</div>
      <img src="../../assets/myspace/campus.JPEG" style="width: 100%" />
      <div class="text">GTA 6 tema til CampusCup 2026!!</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">4 / 7</div>
      <img src="../../assets/myspace/beer.JPEG" style="width: 100%" />
      <div class="text">Jeg har god stil</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">5 / 7</div>
      <img src="../../assets/myspace/halloween.png" style="width: 100%" />
      <div class="text">Klædt ud som Damon Salvatore (iykyk)</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">6 / 7</div>
      <img src="../../assets/myspace/vamp.JPEG" style="width: 100%" />
      <div class="text">Gertrud lavede min vampyr makeup (67)</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">7 / 7</div>
      <img src="../../assets/myspace/boulder.JPEG" style="width: 100%" />
      <div class="text">Min første røde (and in the rentals too!)</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideIndex: 0,
    };
  },

  mounted() {
    this.showSlides();
  },

  methods: {
    showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      this.slideIndex++;
      if (this.slideIndex > slides.length) {
        this.slideIndex = 1;
      }
      slides[this.slideIndex - 1].style.display = "block";
      setTimeout(this.showSlides, 5000);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Slideshow container */
.slideshow-container {
  position: absolute;
  inset: 0;
}

/* Hide the images by default */
.mySlides {
  display: none;
  height: 100%;
  width: 100%;
}

.mySlides img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  display: block;
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  font-size: 16px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 0.5s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
