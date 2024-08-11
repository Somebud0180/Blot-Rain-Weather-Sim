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
let rainColor = "gray" // I like either gray or blue
let rainMaxLength = 15 // Adjust max length of the raindrops
let rainRand = false // "false" for manual (rainIntensity) / "true" for random with rainIntensity as max
let rainIntensity = 10 // 1:1 Raindrop, Higher intensity has more chance to overlap, I suggest < 6

// Cloud Creation
let cloud = [1, 2, 3, 4];
cloud[1] = new bt.Turtle();
cloud[2] = new bt.Turtle();
cloud[3] = new bt.Turtle();
cloud[4] = new bt.Turtle();

// cloudOne
let cloudOneBaseX = bt.randIntInRange(10, 20)
const cloudOneBase = [cloudOneBaseX, 88]; // Static
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
let cloudTwoBaseX = bt.randIntInRange(20, 40)
const cloudTwoBase = [cloudTwoBaseX, 97];
cloud[2].up();
cloud[2].goTo(cloudTwoBase);
cloud[2].down();
cloud[2].forward(52.9);
cloud[2].arc(103, 8);
cloud[2].setAngle(103);
cloud[2].arc(86, 8);
cloud[2].setAngle(-90);
cloud[2].arc(146, -9);
cloud[2].setAngle(155);
cloud[2].arc(48, 12);
cloud[2].setAngle(209);
cloud[2].arc(72, 9);
cloud[2].setAngle(142);
cloud[2].arc(133.5, 13);
const cloudTwoLines = cloud[2].lines();

// cloudThree
let cloudThreeBaseX = bt.randIntInRange(40, 60)
const cloudThreeBase = [cloudThreeBaseX, 90];
cloud[3].up();
cloud[3].goTo(cloudThreeBase);
cloud[3].down();
cloud[3].forward(52.9);
cloud[3].arc(103, 8);
cloud[3].setAngle(103);
cloud[3].arc(86, 8);
cloud[3].setAngle(-90);
cloud[3].arc(146, -9);
cloud[3].setAngle(155);
cloud[3].arc(48, 12);
cloud[3].setAngle(209);
cloud[3].arc(72, 9);
cloud[3].setAngle(142);
cloud[3].arc(133.5, 13);
const cloudThreeLines = cloud[3].lines();

// bt.cover(cloudThreeLines, cloudTwoLines);
// bt.cover(cloudThreeLines, cloudOneLines);
// bt.cover(cloudTwoLines, cloudOneLines);

// drawLines(cloudOneLines, { stroke: "gray", width: 4 })
drawLines(cloudTwoLines, { stroke: "gray", width: 4 })
// drawLines(cloudThreeLines, { stroke: "gray", width: 4 })


// Rain Generation

// Pick rain amount
let rainFinalSet = 0

if (rainRand == false) {
  rainFinalSet = rainIntensity
} else if (rainRand == true) {
  rainFinalSet = bt.randIntInRange(1, rainIntensity)
};

// Main Generation
let finalLines = [];
let cutLines = [];

for (let i = 0; i < rainFinalSet; i++) {
  // Raindrop shape variables
  let base = bt.randIntInRange(10, 64);
  let tip = base + bt.randInRange(10, rainMaxLength);
  let maxWidth = rainMaxLength / 3;
  let leftSide = bt.randInRange(10, 108);
  let rightSide = leftSide + bt.randInRange(3, maxWidth);
  let sidesDifference = (rightSide - leftSide) / 2;
  let center = sidesDifference + leftSide;


  //Raindrop Shaping
  const raindrop = bt.catmullRom([
    [center, tip],
    [leftSide, base],
    [rightSide, base],
    [center, tip]
  ])

  finalLines.push(raindrop);
  bt.cover(cutLines, finalLines);
  drawLines(finalLines, { stroke: rainColor, width: 2 });
  cutLines.push(finalLines);
}
