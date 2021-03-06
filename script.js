
// scene manager
var manager;

// canvas lengths
var canvasHeight, canvasWidth;

// offset
var offset;

/**
    Sets up canvas, canvas sizes, and inits
    Scene Manager
*/
function setup() {

    manager = new SceneManager();
    manager.addScene(StartScreen);
    manager.addScene(ApproxScreen);

    manager.showNextScene();

    canvasHeight = canvasWidth = 800;
    // offset to bottom of screen
    offset = 100;

    createCanvas(canvasWidth-offset, canvasHeight);

}

/**
    Draw Loop
*/
function draw() {

    // shows screens
    manager.draw();

}

/**
    Title screen of the simulation
*/
function StartScreen() {

    // start -> pi approx screen
    var startBtn;

    /**
        Enter function includes statements that will
        always be called when the parent function is
        called
    */
    this.enter = function() {

        startBtn = new Clickable();
        this.initBtns();

    }

    /**
        Draws the title text and start btn
    */
    this.draw = function() {

        background("#f1f1f1");

        // title text
        fill("#000");
        textSize(68);
        textFont("Georgia");
        textAlign(RIGHT);
        text("Approximating PI",
            canvasWidth/2 + offset + offset,
            canvasHeight/2 - offset
        );

        // show start btn
        startBtn.draw();

    }

    /**
        Initializes the start btn including
        placement, onPress functions, and
        text
    */
    this.initBtns = function() {

        // start btn
        startBtn.locate(canvasWidth/3.5, canvasHeight/2);
        startBtn.resize(200, 50);
        startBtn.color = "#fff";
        startBtn.cornerRadius = 3;
        startBtn.strokeWeight = 1;
        startBtn.text = "Start";
        startBtn.textSize = 32;
        startBtn.textFont = "serif";

        // when pressed, redirect to next screen
        startBtn.onPress = function() {
            manager.showNextScene();
        }

        // change appearance when cursor hover
        startBtn.onHover = function() {
            startBtn.stroke = "#333";
            startBtn.color = "#bbb";
            startBtn.textColor = "#fff";
        }

        // keep original colors when cursor !hover
        startBtn.onOutside = function() {
            startBtn.stroke = "#000";
            startBtn.color = "#fff";
            startBtn.textColor = "#000";
        }

    }

}

/**
    Screen that simulates the PI
    approximation
*/
function ApproxScreen() {

    // generate, pause, restart btns
    var randPtsBtn, pauseBtn, restartBtn;
    // center circle pt
    var centerPt;
    // pi simulation vars
    var piApprox = 0.0;
    var totalPts = [];
    var totalNumPts = 0;
    var ptsInCircle = 0;
    // flags for simulation
    var genPts = false;
    var flag = 0;

    /**
        Initializes btns
    */
    this.enter = function() {

        randPtsBtn = new Clickable();
        pauseBtn = new Clickable();
        restartBtn = new Clickable();

        this.initBtns();

    }

    /**
        Draw loops runs the simulation,
        updates the text fields, and will
        pause when indicated
    */
    this.draw = function() {

        background("#f7f7f7");
        randPtsBtn.draw();
        restartBtn.draw();

        this.drawCenterCircle();

        //   init text fields
        textSize(16);
        textFont("Georgia");
        textAlign(LEFT);
        text(
            "PI Approximation: " + piApprox,
            10, 20
        );
        text(
            "Number of Points Inside: " + ptsInCircle,
            10, 50
        );
        text(
            "Total Number of Points: " + totalNumPts,
            10, 80
        );

        // text("(" + int(mouseX) + ", " + int(mouseY) + ")", int(mouseX), int(mouseY));

        // if simulation has started...
        if (genPts) {
            this.generateRandPts();
            pauseBtn.draw();
            this.updatePIApprox();
        }

        // if simulation was paused...
        if (flag) {
            pauseBtn.draw();
        }

        // draw all the points created
        for (p of totalPts) {
            p.draw();
        }

    }

    /**
        Draws the container circle and square
        for the PI simulation
    */
    this.drawCenterCircle = function() {


        stroke("#000");
        strokeWeight(0.5);

        // container square
        fill("#e6e6e6");
        rect(0, offset, canvasWidth-offset, canvasHeight-offset);

        // center circle
        fill("#fff");
        circle((canvasWidth/2)-(offset/2), (canvasHeight/2)+(offset/2), canvasWidth-offset);

        // center point
        fill("#000");
        // create as point to compare with
        // distance formula
        centerPt = new Point();
        centerPt.x = (canvasWidth/2)-(offset/2);
        centerPt.y = (canvasHeight/2)+(offset/2);
        centerPt.d = 2;

        circle((canvasWidth/2)-(offset/2), (canvasHeight/2)+(offset/2), 2);



    }

    this.initBtns = function() {

        // gen random points btn
        randPtsBtn.locate(canvasWidth-260, 10);
        randPtsBtn.resize(150, 30);
        randPtsBtn.color = "#fff";
        randPtsBtn.cornerRadius = 3;
        randPtsBtn.strokeWeight = 1;
        randPtsBtn.text = "Generate Random Points";
        randPtsBtn.textSize = 12.5;
        // if generate button is pressed,
        // start simulation
        randPtsBtn.onPress = function() {
            genPts = true;
        }
        randPtsBtn.onHover = function() {
            randPtsBtn.stroke = "#333";
            randPtsBtn.color = "#bbb";
            randPtsBtn.textColor = "#fff";
        }
        randPtsBtn.onOutside = function() {
            randPtsBtn.stroke = "#000";
            randPtsBtn.color = "#fff";
            randPtsBtn.textColor = "#000";
        }

        // pause btn
        pauseBtn.locate(canvasWidth-260, 45);
        pauseBtn.resize(65, 30);
        pauseBtn.color = "#fff";
        pauseBtn.cornerRadius = 3;
        pauseBtn.strokeWeight = 1;
        pauseBtn.text = "Pause";
        pauseBtn.textSize = 12.5;
        // if pause btn is pressed, pause simulation
        pauseBtn.onPress = function() {
            if (flag == 0) {
                genPts = false;
                pauseBtn.text = "Play";
                flag = 1;
            } else {
                flag = 0;
                genPts = true;
                pauseBtn.text = "Pause";
            }
        }
        pauseBtn.onHover = function() {
            pauseBtn.stroke = "#333";
            pauseBtn.color = "#bbb";
            pauseBtn.textColor = "#fff";
        }
        pauseBtn.onOutside = function() {
            pauseBtn.stroke = "#000";
            pauseBtn.color = "#fff";
            pauseBtn.textColor = "#000";
        }

        // start over btn
        restartBtn.locate(canvasWidth-190, 45);
        restartBtn.resize(80, 30);
        restartBtn.color = "#fff";
        restartBtn.cornerRadius = 3;
        restartBtn.strokeWeight = 1;
        restartBtn.text = "Restart";
        restartBtn.textSize = 12.5;
        // if restart is pressed, clear fields
        restartBtn.onPress = function() {
            genPts = false;
            piApprox = 0.0;
            totalNumPts = 0;
            totalPts = [];
            ptsInCircle = 0;
            flag = 0;
            pauseBtn.text = "Pause";
        }
        restartBtn.onHover = function() {
            restartBtn.stroke = "#333";
            restartBtn.color = "#bbb";
            restartBtn.textColor = "#fff";
        }
        restartBtn.onOutside = function() {
            restartBtn.stroke = "#000";
            restartBtn.color = "#fff";
            restartBtn.textColor = "#000";
        }

    }

    /**
        Generates random points within the
        square and indicates if it landed
        inside or outside the circle
    */
    this.generateRandPts = function() {

        // center 350 450
        // x constrain 0 -> canvasWidth - offset
        // y constrain offset -> canvasHeight
        totalNumPts += 1;
        var pt = new Point(1);
        pt.x = int( random(0, canvasWidth-offset) );
        pt.y = int( random(offset, canvasHeight) );
        pt.d = 3;
        pt.color = "red";

        // if distance > circle radius, is outside circle
        if ( pt.distanceFrom(centerPt) > (canvasWidth-offset)/2) {
            pt.color = "blue"
        } else {
            pt.color = "red";
            ptsInCircle += 1;
        }

        // push all pts to array
        totalPts.push(pt);

    }

    /**
        Calculates and updated the piiApprox
        field through each iteration of the
        draw loop
    */
    this.updatePIApprox = function() {

        var div = ptsInCircle/totalNumPts;

        piApprox = 4*div;

    }

}
