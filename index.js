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
let baseTwoFound = false;

// Base Cloud Randoms
let cloudOneBaseX = bt.randInRange(10, 60);
let cloudTwoBaseX;

while (!baseTwoFound) {
  cloudTwoBaseX = bt.randInRange(10, 60);
  let cloudXDifference = Math.abs(cloudOneBaseX - cloudTwoBaseX);
  console.log(cloudXDifference);
  if (cloudXDifference >= 10) {
    baseTwoFound = true;
  }
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
cloud[2].setAngle(149);
cloud[2].arc(169, 12);
const cloudTwoLines = cloud[2].lines();

// cloudThree
const cloudThreeBase = [cloudThreeBaseX, 96];
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

// cloudFour
const cloudFourBase = [cloudFourBaseX, 95];
cloud[4].up();
cloud[4].goTo(cloudThreeBase);
cloud[4].down();
cloud[4].forward(49.2);
cloud[4].arc(180, 6);
cloud[4].setAngle(90);
cloud[4].arc(140, 9);
cloud[4].setAngle(106);
cloud[4].arc(140, 10);
cloud[4].setAngle(135);
cloud[4].arc(126, 10);
cloud[4].setAngle(200);
cloud[4].arc(160, 7);
const cloudFourLines = cloud[4].lines();

// cloudFive
const cloudFiveBase = [cloudFiveBaseX, 93];
cloud[5].up();
cloud[5].goTo(cloudThreeBase);
cloud[5].down();
cloud[5].forward(44.1);
cloud[5].arc(233, 9);
cloud[5].setAngle(83);
cloud[5].arc(180, 10);
cloud[5].setAngle(101);
cloud[5].arc(179, 8);
cloud[5].setAngle(174);
cloud[5].arc(181, 7);
const cloudFiveLines = cloud[5].lines();

// Draw Clouds
let cloudRandom = bt.randIntInRange(0, 3)
if (cloudRandom == 0) {
  cloudList.push(cloudOneBaseX, cloudTwoBaseX)
  bt.cover(cloudTwoLines, cloudOneLines);
  drawLines(cloudOneLines, { stroke: "gray", width: 4 })
  drawLines(cloudTwoLines, { stroke: "gray", width: 4 })
} else if (cloudRandom == 1) {
  cloudList.push(cloudOneBaseX, cloudTwoBaseX, cloudThreeBaseX)
  bt.cover(cloudThreeLines, cloudTwoLines);
  bt.cover(cloudThreeLines, cloudOneLines);
  bt.cover(cloudTwoLines, cloudOneLines);
  drawLines(cloudOneLines, { stroke: "gray", width: 4 })
  drawLines(cloudTwoLines, { stroke: "gray", width: 4 })
  drawLines(cloudThreeLines, { stroke: "gray", width: 4 })
} else if (cloudRandom == 2) {
  cloudList.push(cloudOneBaseX, cloudTwoBaseX, cloudFourBaseX)
  bt.cover(cloudFourLines, cloudTwoLines);
  bt.cover(cloudFourLines, cloudOneLines);
  bt.cover(cloudTwoLines, cloudOneLines);
  drawLines(cloudOneLines, { stroke: "gray", width: 4 })
  drawLines(cloudTwoLines, { stroke: "gray", width: 4 })
  drawLines(cloudFourLines, { stroke: "gray", width: 4 })
} else if (cloudRandom == 3) {
  cloudList.push(cloudOneBaseX, cloudTwoBaseX, cloudFiveBaseX)
  bt.cover(cloudFiveLines, cloudTwoLines);
  bt.cover(cloudFiveLines, cloudOneLines);
  bt.cover(cloudTwoLines, cloudOneLines);
  drawLines(cloudOneLines, { stroke: "gray", width: 4 })
  drawLines(cloudTwoLines, { stroke: "gray", width: 4 })
  drawLines(cloudFiveLines, { stroke: "gray", width: 4 })
}

// Rain Generation
let rainFinalSet; // Rain Amount
if (rainRand == false) {
  rainFinalSet = rainIntensity
} else if (rainRand == true) {
  rainFinalSet = bt.randIntInRange(1, rainIntensity)
};

// Main Generation
let finalLines = [];
let raindrops = [];
let currentDrop = [];
let lastDrop = [];

// Find the leftest cloud
let minCloud = Math.min(...cloudList);
// Find the rightest cloud
let maxCloud = Math.max(...cloudList) + 43; // Highest cloud base plus lowest cloud length

for (let i = 0; i < rainFinalSet; i++) {
  // Raindrop shape variables
  let base = bt.randInRange(10, 58);
  let tip = base + bt.randInRange(10, rainMaxLength);
  let maxWidth = rainMaxLength / 3;
  let leftSide = bt.randInRange(minCloud, maxCloud);
  let rightSide = leftSide + bt.randInRange(3, maxWidth);
  let sidesDifference = (rightSide - leftSide) / 2;
  let center = sidesDifference + leftSide;
  let covered;

  //Raindrop Shaping
  const raindrop = bt.catmullRom([
    [center, tip],
    [leftSide, base],
    [rightSide, base],
    [center, tip]
  ]);

  // Check against all polylines in finalLines
  let canAddRaindrop = true;
  
  for (let j = 0; j < finalLines.length; j++) {
    if (bt.cut([raindrop], [finalLines[j]]) != 0) {
      canAddRaindrop = false;
      break;
    }
  }

  if (canAddRaindrop) {
    finalLines.push(raindrop);
  } else {
    // If the condition is true, restart the loop
    i--; // Allows the code to repeat without moving up
    continue;
  }
}

drawLines(finalLines, { stroke: rainColor, width: 2 });
