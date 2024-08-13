/*
@title: The (Rain)Weather Simulator
@author: Ethan John
@snapshot: snapshot1.png
*/

// Thanks to Rivques' Weather Report for making the clouds easier to understand and make

const width = 125;
const height = 125;
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];
setDocDimensions(width, height);

// Settings
let rainColor = "blue" // I like either gray or blue
let rainMaxLength = 15 // Adjust max length of the raindrops
let rainRand = false // "false" for manual (rainIntensity) / "true" for random with rainIntensity as max
let rainIntensity = 6 // 1:1 Raindrop, Higher intensity has more chance to clump, I suggest < 6

// Cloud Creation
let cloud = [
  0, // Filler
  new bt.Turtle(), // 1
  new bt.Turtle(), // 2
  new bt.Turtle(), // 3
  new bt.Turtle(), // 4
  new bt.Turtle(), // 5 
];
let cloudList = [];

// Base Cloud Randoms
let cloudOneBaseX = bt.randInRange(10, 60);
let cloudTwoBaseX = bt.randInRange(10, 60);
let averageCloudBaseX = (cloudOneBaseX + cloudTwoBaseX) / 2
if (averageCloudBaseX < 5) {
  cloudTwoBaseX = bt.randInRange(10, 60);
}


let cloudThreeBaseX = bt.randInRange(10, 60);
let cloudFourBaseX = bt.randInRange(10, 60);
let cloudFiveBaseX = bt.randInRange(10, 60);

// cloudOne
const cloudOneBase = [cloudOneBaseX, 75];
cloud[1].up();
cloud[1].goTo(cloudOneBase);
cloud[1].down();
cloud[1].forward(47.54);
cloud[1].arc(103, 7);
cloud[1].setAngle(102);
cloud[1].arc(86, 8);
cloud[1].setAngle(-93);
cloud[1].arc(125, -9);
cloud[1].setAngle(172);
cloud[1].arc(28, 23);
cloud[1].setAngle(145);
cloud[1].arc(113, 15);
cloud[1].setAngle(215);
cloud[1].arc(28, 7);
cloud[1].arc(106, 7);
const cloudOneLines = cloud[1].lines();

// cloudTwo
const cloudTwoBase = [cloudTwoBaseX, 85];
cloud[2].up();
cloud[2].goTo(cloudTwoBase);
cloud[2].down();
cloud[2].forward(53.7);
cloud[2].arc(190, 8);
cloud[2].setAngle(80);
cloud[2].arc(145, 11);
cloud[2].setAngle(129);
cloud[2].arc(138, 11);
