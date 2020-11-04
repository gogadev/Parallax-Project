// setup mouse
let mouse = {
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.5,
};

// setup input
let input = {
  mouseX: {
    start: 0,
    end: window.innerWidth,
    current: mouse.x,
  },
  mouseY: {
    start: 0,
    end: window.innerWidth,
    current: mouse.y,
  },
};
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// setup output
let output = {
  blur: {
    start: 0.35,
    range: 16,
  },
  x: {
    start: -300,
    end: 300,
    current: 0,
  },
  y: {
    start: -300,
    end: 300,
    current: 0,
  },
  z: {
    range: 15000,
  },
};
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

// setup HTML
let parallaxContainer = document.querySelector("#parallaxContainer");
let itemsArray = [];
for (let i = 0; i < 170; i++) {
  // create new element with parallax-item
  let item = document.createElement("div");
  item.className = "parallax-item";
  itemsArray.push(item);

  // create new leaf
  let butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  item.appendChild(butterfly);

  // add element to container
  parallaxContainer.appendChild(item);
  // random width, height, depth, rotation, background image
  //let randomNum = Math.random();

  item.style.width = 500 * Math.random() + 20;
  item.style.height = 500 * Math.random() + 20;
  item.dataset.depth = Math.random();
  //butterfly.style.transform = 'rotate(' + Math.round(360 * Math.random()) + 'deg)';
  // leaf.style.backgroundImage = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1158400/parallax-asset-' + (Math.round(Math.random() * 90) + 1) + '.png)';
  butterfly.style.animation = "spinner 15s linear infinite";
  item.style.top = Math.round(Math.random() * 100 - 35) + "%";
  item.style.left = Math.round(Math.random() * 100) + "%";
  item.style.zIndex = output.z.range - Math.random() * output.z.range;

  /*let bgImgNum = Math.round(Math.random() * 91);
    let rotateNum = (360 * Math.random());
    let depth = Math.random();
    //let blur = (depth - output.blur.start) * output.blur.range;
    let zIndex = output.z.range - (depth * output.z.range);


    item.style.zIndex = zIndex;
    item.style.width = (500 * Math.random()) + 50;
    item.style.height = (500 * Math.random()) + 50;
    item.dataset.depth = Math.random();
    leaf.style.transform = 'rotate('+rotateNum +'deg)';
    leaf.style.backgroundImage = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1158400/parallax-asset-'+bgImgNum+'.png)';

    // adjust blur on depth
    item.style.filter = 'blur('+blur+ 'px)';
    // random position
    item.style.top = Math.round(Math.random() * 100 - 20) + '%';
    item.style.top.left = Math.round(Math.random() * 100 - 20) + '%'; */
}

function updateInputs() {
  // input current, fraction
  input.mouseX.current = mouse.x;
  input.mouseY.current = mouse.y;
  input.mouseX.fraction =
    (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  input.mouseY.fraction =
    (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}

function updateOutputs() {
  // output current.x and y
  output.x.current = output.x.end - input.mouseX.fraction * output.x.range;
  output.y.current = output.y.end - input.mouseY.fraction * output.y.range;
}

function updateParallaxItems() {
  // apply to HTML
  itemsArray.forEach(function (item, i) {
    let depth = parseFloat(item.dataset.depth, 10);
    let itemOutput = {
      x: output.x.current * depth,
      y: output.y.current * depth,
    };
    item.style.transform =
      "translate(" + itemOutput.x + "px, " + itemOutput.y + "px)";
  });
}

function handleMouseMove(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  updateInputs();
  updateOutputs();
  updateParallaxItems();
}

function handleResize() {
  // end, range
  input.mouseX.end = window.innerWidth;
  input.mouseY.end = window.innerHeight;

  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

// add event listeners
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);
