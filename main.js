const ColorBtn = document.querySelector(".colorBtn");
const icons = document.querySelectorAll(".sub");
const social = document.querySelectorAll(".socialIcon");
const a = document.querySelectorAll(".link");
const body = document.querySelector("body");
const nav = document.querySelector("header");
const goodBtn = document.querySelector(".goodBtn");
ColorBtn.addEventListener("click", (event) => {
  colorChange();
});
goodBtn.addEventListener("click", () => {
  console.log("click");
  init();
});
const colorChange = () => {
  if (ColorBtn.innerHTML === "Black") {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    nav.style.backgroundColor = "black";
    ColorBtn.style.color = "white";
    Object.values(icons).map(
      (icon) => (icon.style.backgroundColor = "#fcfcfc25")
    );
    Object.values(social).map((icon) => {
      icon.style.backgroundColor = "#fcfcfc25";
      icon.childNodes[1].style.color = "white";
    });
    Object.values(a).map((icon) => (icon.style.color = "white"));

    ColorBtn.innerHTML = "White";
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    ColorBtn.style.color = "black";
    nav.style.backgroundColor = "white";
    Object.values(icons).map((icon) => (icon.style.backgroundColor = "none"));
    Object.values(social).map((icon) => {
      icon.style.backgroundColor = "none";
      icon.childNodes[1].style.color = "black";
    });
    Object.values(a).map((icon) => (icon.style.color = "black"));
    ColorBtn.innerHTML = "Black";
  }
};

document.querySelector(".right-arrow").onclick = () => {
  var currentSlide = document.querySelector(".card.active");
  var nextSlide = currentSlide.nextElementSibling;
  if (nextSlide === null) {
    nextSlide = currentSlide.parentElement.childNodes[1];
  }
  currentSlide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  currentSlide.classList.remove("active");
  nextSlide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  nextSlide.classList.add("active");
};

document.querySelector(".left-arrow").onclick = function () {
  var currentSlide = document.querySelector(".card.active");
  var prevSlide = currentSlide.previousElementSibling;
  if (prevSlide === null) {
    prevSlide = currentSlide.parentElement.lastElementChild;
  }
  currentSlide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  currentSlide.classList.remove("active");
  prevSlide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  prevSlide.classList.add("active");
};

//vanilla-tilt.js
VanillaTilt.init(document.querySelectorAll(".glare"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 1,
});
VanillaTilt.init(document.querySelectorAll(".table"), {
  max: 10,
  speed: 200,
});
VanillaTilt.init(document.querySelectorAll(".logo"), {
  max: 50,
  speed: 700,
});

// 댓글창
(function () {
  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://test-tgnpfhgdmm.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
})();

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/TwxqaNjwL/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  if (prediction[0].probability > 0.8) {
    document.querySelector(".social").style.display = "flex";
    document.querySelector(".thumbsUp").style.display = "none";
    webcam.stop();
  }

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
