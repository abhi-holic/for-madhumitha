var html = document.getElementsByTagName("html")[0];
var sun = document.querySelector(".sun");
var rainbow = document.querySelector(".rainbow");
var rabbit = document.querySelector(".rabbit");
var snow = document.querySelectorAll(".snow");
var rain = document.querySelectorAll(".rain");
var flowers = document.querySelectorAll(".flower");
var lightColours = ["#93d5eb", "#add63a", "#c5d63a", "#febe42"],
 mediumColours = ["#66bbd8", "#92c938", "#acc52b", "#ff9d25"],
 darkColours = ["#4da2bb", "#2a9d5c", "#89a503", "#ff6b2f"],
 backgroundColours = ["#cbe9f4", "#daf8ff", "#feec98", "#ffdc8a"],
 bushColours = ["#ffffff", "#3ebf6d", "#99b31a", "#fd6d2e"],
 cloudColours = ["#ffffff", "#ffffff", "#ffffff", "#eaf9fe"],
 seasons = ["Winter", "Spring", "Summer", "Autumn"];
var c = 1;
var season;
var currentParagraph = 0;
var paragraphs = document.querySelectorAll('.text-paragraph');

const content_class_list = ["para1", "para2", "para3", "para4", "para5", "para6", "para7", "para8", "para9"];
let current_class_index = 0;

function changeMessage() {
    // Remove active class from current paragraph
    let currObj = document.querySelector('.' + content_class_list[current_class_index]);
    if (currObj) {
        currObj.classList.remove('active');
        currObj.style.opacity = '0';
        currObj.style.transform = 'translateY(20px)';
    }

    // Move to next paragraph
    current_class_index = (current_class_index + 1) % content_class_list.length;

    // Add active class to next paragraph
    let nextObj = document.querySelector('.' + content_class_list[current_class_index]);
    if (nextObj) {
        nextObj.style["display"]="block";
        nextObj.classList.add('active');
        nextObj.style.opacity = '1';
        nextObj.style.transform = 'translateY(0)';
    }
}

function playMusicOnce() {
    const music = document.getElementById('bg-music');
    if (music.paused) {
        music.play();
    }
}

function updateSeasons() {
changeMessage()
playMusicOnce()
 html.style.setProperty("--bgd-color", backgroundColours[c]);
 html.style.setProperty("--light", lightColours[c]);
 html.style.setProperty("--medium", mediumColours[c]);
 html.style.setProperty("--dark", darkColours[c]);
 html.style.setProperty("--bush", bushColours[c]);
 html.style.setProperty("--cloud", cloudColours[c]);
 season = seasons[c];

 // Handle weather effects
 const weatherContainers = document.querySelectorAll('.weather-container');
 weatherContainers.forEach(container => {
  const snowElements = container.querySelectorAll('.snow');
  const rainElements = container.querySelectorAll('.rain');

  // Handle snow
  snowElements.forEach(el => {
   el.style.display = season === seasons[0] ? 'block' : 'none';
  });

  // Handle rain
  rainElements.forEach(el => {
   el.style.display = season === seasons[3] ? 'block' : 'none';
  });
 });

 // Handle rabbit animation in all seasons
 if (rabbit) {
  // Remove animation class first
  rabbit.classList.remove("animated");
  // Force a reflow
  void rabbit.offsetWidth;
  // Add animation class back
  rabbit.classList.add("animated");
 }

 //add rainbow if season = spring
 if (rainbow) {
  season === seasons[1]
   ? rainbow.classList.add("animated")
   : rainbow.classList.remove("animated");
 }

 //add flowers if season = spring
 if (flowers) {
  flowers.forEach(function(el) {
   season === seasons[1]
    ? el.classList.add("animated")
    : el.classList.remove("animated");
  });
 }

 //add sun if season = summer
 if (season === seasons[2]) {
  html.style.setProperty("--sun", "#ffb53a");
 } else {
  html.style.setProperty("--sun", "transparent");
 }

 // Reveal next paragraph
 revealNextParagraph();

 //increment array index
 c = (c + 1) % seasons.length;
}

function revealNextParagraph() {
    if (currentParagraph < paragraphs.length) {
        const paragraph = paragraphs[currentParagraph];
        paragraph.style.display = 'block';
        // Force a reflow
        void paragraph.offsetWidth;
        paragraph.classList.add('visible');
        currentParagraph++;
    }
}

// Initialize first paragraph
document.addEventListener('DOMContentLoaded', function() {
    // Show first paragraph
    let firstPara = document.querySelector('.' + content_class_list[0]);
    if (firstPara) {
        firstPara.classList.add('active');
        firstPara.style.opacity = '1';
        firstPara.style.transform = 'translateY(0)';
    }
});

// Remove the automatic animation
// let nF = 0;
// function animate() {
//  if (++nF % 600 === 0) {
//   updateSeasons();
//  }
//  requestAnimationFrame(animate);
// }
// animate();
