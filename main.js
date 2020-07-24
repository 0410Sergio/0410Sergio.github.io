
fetch('10,422_Puzzles.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log(err);
    })

    function getRandomInt(min, max) {
        min = Math.ceil(0);
        max = Math.floor(10422);
        return Math.floor(Math.random() * (max - min)) + min;
      }

function appendData(data) {
    var mainContainer = document.getElementById("myData");

    chosenQuiz = data[getRandomInt()].quizzes.split('');
    //chosenQuiz = "213845760500020700000600300059700200030080400700901000067250000145009080000000000".split('');
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + chosenQuiz;
    //mainContainer.appendChild(div);
    
    for(let i=0; i < 81; i++) {
        var secContainer = document.getElementById("cell-" + String(i+1));
        if(chosenQuiz[i] !== "0") {
            secContainer.innerHTML = chosenQuiz[i];
    }   else{
            document.getElementById("cell-" + String(i+1)).style.fontFamily = "helvetica";
            document.getElementById("cell-" + String(i+1)).style.fontSize = "xx-large"; 
    }
    }  
}

$( function() {
    $( ".widget input[type=submit]" ).button();
    $( "input" ).click( function( event ) {
      Starter();
    } );
});





let chosenQuiz;
let missingVal = 0;
let targetBox = [];
let rowNum = 0;
let aIter = 1;
let bIter = 2;
let cIter = 3;
let targetRow = [];
let rowIds = [];
let num = 1;
let numC = 1;
let numRows = 1;
let numCols = 1;
let numBoxes = 1;
let aLine = 1;
let bLine = 2;
let cLine = 3;
let mapOne = new Map();
let mapTwo = new Map();
let arrayBox = new Array();
let arrayCol = new Array();
let arrayRow = new Array();

async function Starter() {

    let total = [];
    total = document.getElementById("myTable").innerText.replace(/\s/g,'').split('');


    while(total.length < 81) {

        for(var i=0; i < 3; i++) {
            await delayedStart();
        }

        for(var i=0; i < 3; i++) {
            await delayedStartCol();
        }

        for(var i=0; i < 9; i++) {
            await delayedRows();
        }

        for(var i=0; i < 9; i++) {
            await delayedCols();
        }

        for(var i=0; i < 9; i++) {
            await delayedBoxes();
        } 
        total = document.getElementById("myTable").innerText.replace(/\s/g,'').split('');
        
    }
    
}

async function tester() {
    let total = [];
    total = document.getElementById("myTable").innerText.replace(/\s/g,'').split('');

    while(total.length < 81) {
        for(var i=0; i < 9; i++) {
            await delayedRows();
        }
    }
}


function iterateRows() {

    aLine = document.getElementById("row-" + aIter.toString(10)).innerText.replace(/\s/g,'').split('');
    bLine = document.getElementById("row-" + bIter.toString(10)).innerText.replace(/\s/g,'').split('');
    cLine = document.getElementById("row-" + cIter.toString(10)).innerText.replace(/\s/g,'').split('');

    solvingIt(aLine, bLine, cLine);

}

function iterateCols() {

    aLine = ($(".layer-" + aIter.toString(10)).text()).split('');
    bLine = ($(".layer-" + bIter.toString(10)).text()).split('');
    cLine = ($(".layer-" + cIter.toString(10)).text()).split('');

    solvingItCol(aLine, bLine, cLine);
        
}


async function delayedRows() {

    let counter = [];
    let rowVal = '';
    arrayRow = new Array();

    
    
    for(var j = 1; j < 10; j++) {

        arrayRow = arrayRow.concat(document.getElementById("row-" + numRows).getElementsByClassName("layer-" + j)[0].innerText);
        document.getElementById("row-" + numRows).getElementsByClassName("layer-" + j)[0].style.animation = "blinkingBackgroundTwo 2s 1";
        
    }

    await sleep(250);
    counter = arrayRow.join('').replace(/\s/g,'').split('').length;
    

    if(counter === 8) { 
        for(var i = 1; i < 10; i++) {
            if(!arrayRow.includes(i.toString(10))) {
                
                rowVal = document.getElementById("row-" + numRows).getElementsByClassName("layer-" + (arrayRow.indexOf('') + 1))[0].id;
                break;

            } 
        }
    } else { 
        for(var j = 1; j < 10; j++) {
            document.getElementById("row-" + numRows).getElementsByClassName("layer-" + j)[0].style.animation = "";
        }
        if(numRows === 9) {numRows = 0;}

        numRows++;
        return;
    }

    document.getElementById(rowVal).style.animation = "blinkingBackgroundFour 1s 1"
    await sleep(500);
    document.getElementById(rowVal).innerText = i;
    await sleep(500);
    document.getElementById(rowVal).style.animation = "";

    for(var j = 1; j < 10; j++) {
        document.getElementById("row-" + numRows).getElementsByClassName("layer-" + j)[0].style.animation = "";
    }
    if(numRows === 9) {numRows = 0};
    numRows++;
}


async function delayedCols() {

    let counter = [];
    let colVal = '';
    arrayCol = new Array();
    
    for(var i = 0; i < 9; i++) {

        arrayCol = arrayCol.concat(document.getElementsByClassName("layer-" + numCols)[i].innerText);

        document.getElementsByClassName("layer-" + numCols)[i].style.animation = "blinkingBackgroundTwo 2s 1";
    }
    
    await sleep(250);
    counter = arrayCol.join('').replace(/\s/g,'').split('').length;
    

    if(counter === 8) { 
        for(var i = 1; i < 10; i++) {
            if(!arrayCol.includes(i.toString(10))) {
                colVal = document.getElementsByClassName("layer-" + numCols)[arrayCol.indexOf('')].id;
                break;
            }
        }
    } else { 
        for(var i = 0; i < 9; i++) {
            document.getElementsByClassName("layer-" + numCols)[i].style.animation = "";
        }
        if(numCols === 9) {numCols = 0;}
        numCols++;
        return;
    }
    document.getElementById(colVal).style.animation = "blinkingBackgroundFour 1s 1";
    await sleep(500);
    document.getElementById(colVal).innerText = i;
    await sleep(500);
    console.log(colVal);
    
    document.getElementById(colVal).style.animation = "";
    for(var i = 0; i < 9; i++) {
        document.getElementsByClassName("layer-" + numCols)[i].style.animation = "";
    }
    if(numCols === 9) {numCols = 0};
    numCols++;
}


async function delayedBoxes() {

    let counter = [];
    let boxVal = '';
    arrayBox = new Array();
    
    for(var i = 0; i < 9; i++) {

        arrayBox = arrayBox.concat(document.getElementsByClassName("box-" + numBoxes)[i].innerText);

        document.getElementsByClassName("box-" + numBoxes)[i].style.animation = "blinkingBackgroundTwo 2s 1";
    }
    
    await sleep(250);
    counter = arrayBox.join('').replace(/\s/g,'').split('').length;
    

    if(counter === 8) { 
        for(var i = 1; i < 10; i++) {
            if(!arrayBox.includes(i.toString(10))) {
                boxVal = document.getElementsByClassName("box-" + numBoxes)[arrayBox.indexOf('')].id;
                break;
            }
        }
    } else { 
        for(var i = 0; i < 9; i++) {
            document.getElementsByClassName("box-" + numBoxes)[i].style.animation = "";
        }
        if(numBoxes === 9) {numBoxes = 0;}
        numBoxes++;
        return;
    }
    document.getElementById(boxVal).style.animation = "blinkingBackgroundFour 1s 1";
    await sleep(500);
    document.getElementById(boxVal).innerText = i;
    await sleep(500);
    console.log(boxVal);
    
    document.getElementById(boxVal).style.animation = "";
    for(var i = 0; i < 9; i++) {
        document.getElementsByClassName("box-" + numBoxes)[i].style.animation = "";
    }
    if(numBoxes === 9) {numBoxes = 0};
    numBoxes++;
}


function sleep(ms) {
    
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function delayedStart() {

    mapOne = new Map();

    iterateRows();

    for(let entry of mapOne.values()) {
        findRow(entry[0], entry[1], entry[2]);
        await sleep(4000);
    }

    aIter += 3;
    bIter += 3;
    cIter += 3;
    num = 1;
    console.log("one round");

    if(cIter > 9) {
        aIter = 1;
        bIter = 2;
        cIter = 3;
    }

}

async function delayedStartCol() {

    mapTwo = new Map();

    iterateCols();

    for(let entry of mapTwo.values()) {
        findCol(entry[0], entry[1], entry[2]);
        await sleep(4000);
        
    } 

    aIter += 3;
    bIter += 3;
    cIter += 3;
    numC = 1;
    console.log("one round");

    if(cIter > 9) {
        aIter = 1;
        bIter = 2;
        cIter = 3;
    }

}

async function blink(item, missingV) {

    //
    await sleep(1800);
    document.getElementById(item).innerHTML = missingV;
    document.getElementById(item).style.animation = "blinkingBackgroundFour 1s 1";
    await sleep(1000);
    document.getElementById(item).style.animation = "";
    
}
async function blinkRow(item) {
    
    
    await sleep(500);
    document.getElementById("row-" + item).style.animation = "blinkingBackground 1s 1";
    await sleep(1000);
    document.getElementById("row-" + item).style.animation = "";
}
async function blinkVal(item) {
    let valId = '';

    for(let h = 1; h <= 9; h++) {
        if(document.getElementById("row-" + aIter).getElementsByClassName("layer-" + h)[0].innerText === item) {
            //console.log("aIter worked its " + h);
            valId = valId.concat(document.getElementById("row-" + aIter).getElementsByClassName("layer-" + h)[0].id, ' ');
            document.getElementById("row-" + aIter).style.animation = "blinkingBackgroundThree 2.5s 1";
        }
        if(document.getElementById("row-" + bIter).getElementsByClassName("layer-" + h)[0].innerText === item) {
            //console.log("bIter worked its " + h);
            valId = valId.concat(document.getElementById("row-" + bIter).getElementsByClassName("layer-" + h)[0].id, ' ');
            document.getElementById("row-" + bIter).style.animation = "blinkingBackgroundThree 2.5s 1";
        }
        if(document.getElementById("row-" + cIter).getElementsByClassName("layer-" + h)[0].innerText === item) {
            //console.log("cIter worked its " + h);
            valId = valId.concat(document.getElementById("row-" + cIter).getElementsByClassName("layer-" + h)[0].id, ' ');
            document.getElementById("row-" + cIter).style.animation = "blinkingBackgroundThree 2.5s 1";
        }

    }
    valId = valId.trim().split(' ');
    console.log(valId);
    await sleep(100)
    document.getElementById(valId[0]).style.animation = "blinkingBackground 2.4s 1";

    document.getElementById(valId[1]).style.animation = "blinkingBackground 2.4s 1";
    await sleep(3000);
    document.getElementById(valId[0]).style.animation = "";
    document.getElementById(valId[1]).style.animation = "";
    document.getElementById("row-" + aIter).style.animation = "";
    document.getElementById("row-" + bIter).style.animation = "";
    document.getElementById("row-" + cIter).style.animation = "";
}
async function blinkTarget(item) {
    
    //document.getElementById(item).style.backgroundColor = "red";
    console.log(document.getElementById(item[0]).innerText === '');
    console.log("below");
    await sleep(800);
    if(document.getElementById(item[0]).innerText === '') {
        document.getElementById(item[0]).style.animation = "blinkingBackgroundTwo 2s 1";
    }
    if(document.getElementById(item[1]).innerText === '') {
        document.getElementById(item[1]).style.animation = "blinkingBackgroundTwo 2s 1";
    }
    if(document.getElementById(item[2]).innerText === '') {
        document.getElementById(item[2]).style.animation = "blinkingBackgroundTwo 2s 1";
    }
    await sleep(2000);
    document.getElementById(item[0]).style.animation = "";
    document.getElementById(item[1]).style.animation = "";
    document.getElementById(item[2]).style.animation = "";
}
async function blinkLayer(item, missingT) {
    let colId = '';
    

    item = item.trim().split(' ');
    console.log(item[0].split('').pop());
    console.log("below");

    await sleep(1500)
    for(let y = 1; y <= 9; y++) {
        
        if(document.getElementById("row-" + y).getElementsByClassName(item[0])[0].innerText === missingT) {
            //console.log("aIter worked its " + h);
            colId = colId.concat(document.getElementById("row-" + y).getElementsByClassName(item[0])[0].id, ' ');
            document.getElementById("col-" + item[0].split('').pop()).style.animation = "blinkingBackgroundTwo 1.25s 1";
            }
        if(document.getElementById("row-" + y).getElementsByClassName(item[1])[0].innerText === missingT) {
            //console.log("aIter worked its " + h);
            colId = colId.concat(document.getElementById("row-" + y).getElementsByClassName(item[1])[0].id, ' ');
            document.getElementById("col-" + item[1].split('').pop()).style.animation = "blinkingBackgroundTwo 1.25s 1";
            }
        
    }

    console.log(colId);
    console.log("below");
    colId = colId.trim();
    
    document.getElementById(colId).style.animation = "blinkingBackground 1.25s 1";
    await sleep(2000);
    document.getElementById(colId).style.animation = "";
    document.getElementById("col-" + item[0].split('').pop()).style.animation = "";
    document.getElementById("col-" + item[1].split('').pop()).style.animation = "";

    
}

function delayedEnd(val1, val2, val3) {
    
    mapOne.set(num, Array.of(val1, val2, val3));
    num = num + 1;
}

function delayedMid(val1, val2, val3) {
    
    mapTwo.set(numC, Array.of(val1, val2, val3));
    numC = numC + 1;
}

function solvingIt(lineOne, lineTwo, lineThree) {

    missingVal = 0;
    targetBox = [];
    rowNum = 0;
    let mainLine = [];

    
    for(let i of lineOne) {
        missingVal = 0;

        if(lineTwo.includes(i)) {
            if(lineThree.includes(i)) {
                continue;
            }
            else{ 
                missingVal = i;
                mainLine = lineThree;
                rowNum = cIter;

                delayedEnd(missingVal, mainLine, rowNum);
                missingVal = 0;
                
                
                
            }
        }
        if(lineThree.includes(i)) {
            if(lineTwo.includes(i)) {
                continue;
            }
            else{ 
                missingVal = i;
                mainLine = lineTwo;
                rowNum = bIter;
                delayedEnd(missingVal, mainLine, rowNum);
                missingVal = 0;
                
                
                
            }
        }

    }
    if(missingVal === 0) {
        for(let m of lineTwo) {
            missingVal = 0;
            if(lineThree.includes(m)) {
                if(lineOne.includes(m) === false) {
                    missingVal = m;
                    mainLine = lineOne;
                    rowNum = aIter;
                    delayedEnd(missingVal, mainLine, rowNum);
                    
                    }
                }
            }
        }

    }
    
    



function findRow(missingVal, mainLine, rowNum) {
        let boxOne = [];
        let boxTwo = [];
        let boxThree = [];
        let boxNum = 0;

        boxOne.push($(".box-" + aIter.toString(10)).text());
        boxTwo.push($(".box-" + bIter.toString(10)).text());
        boxThree.push($(".box-" + cIter.toString(10)).text());

        boxOne = boxOne.join('').split('');
        boxTwo = boxTwo.join('').split('');
        boxThree = boxThree.join('').split('');

        
        
        if(boxOne.includes(missingVal) === false) {
            targetBox = boxOne;
            boxNum = aIter;
        }
        else if(boxTwo.includes(missingVal) === false) {
            targetBox = boxTwo;
            boxNum = bIter;
        }
        else if(boxThree.includes(missingVal) === false) {
            targetBox = boxThree;
            boxNum = cIter;
        } else { return;}

        console.log(missingVal);
        blinkVal(missingVal);
        //console.log(targetBox);
        //console.log(rowNum);
        //blinkRow(rowNum);
        
        

        targetRow = [];
        rowIds = [];

        targetRow.push($("#row-" + rowNum.toString(10)).find(".box-" + boxNum.toString(10)).text());
        targetRow = targetRow.join('').split('');

        console.log(targetRow);

        for(let i = 0; i < 3; i++) {

            rowIds.push(document.getElementById("row-" + rowNum.toString(10)).getElementsByClassName("box-" + boxNum.toString(10))[i].id);
        }
        //console.log(rowIds);

        blinkTarget(rowIds);

        solveRow(targetRow, rowIds, missingVal);

}

function solveRow(targetRow, rowIds, missingVal) {
    let cellLayer = '';
    let layerList = [];
    let allLayers = '';
    let currLayer = [];

    if(targetRow.length === 2) {
        for(let i = 0; i < 3; i++) {
            if(document.getElementById(rowIds[i]).innerHTML === '') {
                //document.getElementById(rowIds[i]).innerHTML = missingVal;
                blink(rowIds[i].toString(10), missingVal);
                //document.getElementById(rowIds[i]).style.backgroundColor = "cyan";
                 
            }
        }
    }

    if(targetRow.length === 1) {
        for(let i = 0; i < 3; i++) {
            if(document.getElementById(rowIds[i]).innerHTML === '') {
                cellLayer = document.getElementById(rowIds[i]).className;
                cellLayer = cellLayer.split(' ')[0];
                allLayers += cellLayer + ' ';

                layerList.push(($("." + cellLayer).text()));
                layerList = layerList.join('').split('');
            }
            console.log(layerList);
            //console.log(allLayers);
            
        }

        for(let i = 0; i < 3; i++) {
            if(document.getElementById(rowIds[i]).innerHTML === '') {
                currLayer = [];
                cellLayer = document.getElementById(rowIds[i]).className;
                cellLayer = cellLayer.split(' ')[0];

                currLayer.push(($("." + cellLayer).text()));
                currLayer = currLayer.join('').split('');

                if(currLayer.includes(missingVal.toString(10)) === false && layerList.includes(missingVal.toString(10)) === true) {
                        
                    //document.getElementById(rowIds[i]).innerHTML = missingVal;
                    //document.getElementById(rowIds[i]).style.backgroundColor = "cyan";
                    blinkLayer(allLayers, missingVal);
                    blink(rowIds[i].toString(10), missingVal);
                    
                    
                } 

            }
        }

    }
}







async function blinkCol(item, missingV) {
    
    //document.getElementById(item).style.backgroundColor = "#fce303";
    await sleep(1800);
    document.getElementById(item).innerHTML = missingV;
    document.getElementById(item).style.animation = "blinkingBackgroundFour 1s 1";
    await sleep(1000);
    document.getElementById(item).style.animation = "";
    
    
}
async function blinkRowCol(item) {
    
    //document.getElementById(item).style.backgroundColor = "red";
    await sleep(500);
    document.getElementById("row-" + item).style.animation = "blinkingBackground 2s 1";
    await sleep(1000);
    document.getElementById("row-" + item).style.animation = "";
}
async function blinkValCol(item) {
    let valId = '';

    for(let h = 1; h <= 9; h++) {
        if(document.getElementById("row-" + h).getElementsByClassName("layer-" + aIter)[0].innerText == item) {
            //console.log("aIter worked its " + h);
            valId = valId.concat(document.getElementById("row-" + h).getElementsByClassName("layer-" + aIter)[0].id, ' ');
            document.getElementById("col-" + aIter).style.animation = "blinkingBackgroundThree 2.5s 1";
        }
        if(document.getElementById("row-" + h).getElementsByClassName("layer-" + bIter)[0].innerText == item) {
            //console.log("bIter worked its " + h);
            valId = valId.concat(document.getElementById("row-" + h).getElementsByClassName("layer-" + bIter)[0].id, ' ');
            document.getElementById("col-" + bIter).style.animation = "blinkingBackgroundThree 2.5s 1";
        }
        if(document.getElementById("row-" + h).getElementsByClassName("layer-" + cIter)[0].innerText == item) {
            //console.log("cIter worked its " + h);
            valId = valId.concat(document.getElementById("row-" + h).getElementsByClassName("layer-" + cIter)[0].id, ' ');
            document.getElementById("col-" + cIter).style.animation = "blinkingBackgroundThree 2.5s 1";
        }

    }
    valId = valId.trim().split(' ');
    await sleep(100)
    document.getElementById(valId[0]).style.animation = "blinkingBackground 2.4s 1";
    document.getElementById(valId[1]).style.animation = "blinkingBackground 2.4s 1";
    await sleep(3000);
    document.getElementById(valId[0]).style.animation = "";
    document.getElementById(valId[1]).style.animation = "";
    document.getElementById("col-" + aIter).style.animation = "";
    document.getElementById("col-" + bIter).style.animation = "";
    document.getElementById("col-" + cIter).style.animation = "";
}
async function blinkTargetCol(item) {
    
    //document.getElementById(item).style.backgroundColor = "red";
    
    await sleep(1500);
    if(document.getElementById(item[0]).innerText === '') {
        document.getElementById(item[0]).style.animation = "blinkingBackgroundTwo 2s 1";
    }
    if(document.getElementById(item[1]).innerText === '') {
        document.getElementById(item[1]).style.animation = "blinkingBackgroundTwo 2s 1";
    }
    if(document.getElementById(item[2]).innerText === '') {
        document.getElementById(item[2]).style.animation = "blinkingBackgroundTwo 2s 1";
    }
    await sleep(2000);
    document.getElementById(item[0]).style.animation = "";
    document.getElementById(item[1]).style.animation = "";
    document.getElementById(item[2]).style.animation = "";
}
async function blinkLayerCol(item, missingT) {
    let colId = '';
    item = item.trim().split(' ');
    await sleep(1500);
    for(let y = 1; y <= 9; y++) {
        
        if(document.getElementById(item[0]).getElementsByClassName("layer-" + y)[0].innerText === missingT) {
            //console.log("aIter worked its " + h);
            colId = colId.concat(document.getElementById(item[0]).getElementsByClassName("layer-" + y)[0].id, ' ');
            document.getElementById("row-" + item[0].split('').pop()).style.animation = "blinkingBackgroundTwo 1.25s 1";
            }
        if(document.getElementById(item[1]).getElementsByClassName("layer-" + y)[0].innerText === missingT) {
            //console.log("aIter worked its " + h);
            colId = colId.concat(document.getElementById(item[1]).getElementsByClassName("layer-" + y)[0].id, ' ');
            document.getElementById("row-" + item[1].split('').pop()).style.animation = "blinkingBackgroundTwo 1.25s 1";
            }
        
    }

    console.log("below");
    console.log(colId);
    colId = colId.trim();
    
    document.getElementById(colId).style.animation = "blinkingBackground 1.25s 1";
    await sleep(2000);
    document.getElementById(colId).style.animation = "";
    
    
}
    





function solvingItCol(lineOne, lineTwo, lineThree) {

    missingVal = 0;
    targetBox = [];
    rowNum = 0;
    let mainLine = [];
    
    for(let i of lineOne) {
        missingVal = 0;

        if(lineTwo.includes(i)) {
            if(lineThree.includes(i)) {
                continue;
            }
            else{ 
                missingVal = i;
                mainLine = lineThree;
                rowNum = cIter;
                delayedMid(missingVal, mainLine, rowNum);
                missingVal = 0;
            }
        }
        if(lineThree.includes(i)) {
            if(lineTwo.includes(i)) {
                continue;
            }
            else{ 
                missingVal = i;
                mainLine = lineTwo;
                rowNum = bIter;
                delayedMid(missingVal, mainLine, rowNum);
                missingVal = 0;
            }
        }
    }
    if(missingVal === 0) {
        for(let m of lineTwo) {
            missingVal = 0;
            if(lineThree.includes(m)) {
                if(lineOne.includes(m) === false) {
                    missingVal = m;
                    mainLine = lineOne;
                    //console.log(mainLine);
                    rowNum = aIter;
                    delayedMid(missingVal, mainLine, rowNum);
                    missingVal = 0;
                }
            }
        }
    }
    
    }

function findCol(missingVal, mainline, rowNum) {
    let boxOne = [];
    let boxTwo = [];
    let boxThree = [];
    let boxNum = 0;

    let oneNum = ($(".layer-" + rowNum)[0].className).split(' ')[1];
    let twoNum = ($(".layer-" + rowNum)[3].className).split(' ')[1];
    let threeNum = ($(".layer-" + rowNum)[6].className).split(' ')[1];
    
    oneNum = oneNum.split('').pop();
    twoNum = twoNum.split('').pop();
    threeNum = threeNum.split('').pop();

    oneNum = document.getElementsByClassName("box-" + oneNum)[0].className;
    twoNum = document.getElementsByClassName("box-" + twoNum)[0].className;
    threeNum = document.getElementsByClassName("box-" + threeNum)[0].className;

    oneNum = oneNum.split(' ')[1];
    twoNum = twoNum.split(' ')[1];
    threeNum = threeNum.split(' ')[1];

    console.log(rowNum + "row");

    boxOne.push($("." + oneNum).text());
    boxTwo.push($("." + twoNum).text());
    boxThree.push($("." + threeNum).text());

    boxOne = boxOne.join('').split('');
    boxTwo = boxTwo.join('').split('');
    boxThree = boxThree.join('').split('');


    if(boxOne.includes(missingVal) === false) {
        targetBox = boxOne;
        boxNum = oneNum.split('').pop();
        
    }
    else if(boxTwo.includes(missingVal) === false) {
        targetBox = boxTwo;
        boxNum = twoNum.split('').pop();
        
    }
    else if(boxThree.includes(missingVal) === false) {
        targetBox = boxThree;
        boxNum = threeNum.split('').pop();
        
    } else {return;}

    console.log(missingVal);
    blinkValCol(missingVal);


    targetRow = [];
    rowIds = [];

    for(let i = 0; i < 3; i++) {
        try {
            targetRow.push(document.getElementsByClassName("layer-" + rowNum.toString(10) + " box-" + boxNum.toString(10))[i].innerHTML);
        } catch(err) { continue;}
        console.log(targetRow);
    }

    targetRow = targetRow.join('').split('');

    console.log(targetRow);

    for(let i = 0; i < 3; i++) {
        try {
            rowIds.push(document.getElementsByClassName("layer-" + rowNum.toString(10) + " box-" + boxNum.toString(10))[i].id);
            } catch(err) { continue;}
    
    }
    blinkTargetCol(rowIds);

    solveCol(targetRow, rowIds, missingVal);


}

function solveCol(targetRow, rowIds, missingVal) {
    let cellLayer = '';
    let layerList = [];
    let allLayers = '';
    let currLayer = [];

    if(targetRow.length === 2) {
        for(let i = 0; i < 3; i++) {
            if(document.getElementById(rowIds[i]).innerHTML === '') {
                //document.getElementById(rowIds[i]).innerHTML = missingVal;
                //document.getElementById(rowIds[i]).style.backgroundColor = "cyan";
                blinkCol(rowIds[i].toString(10), missingVal);
            }
        }
    }

    if(targetRow.length === 1) {
        for(let i = 0; i < 3; i++) {
            if(document.getElementById(rowIds[i]).innerHTML === '') {
                cellLayer = document.getElementById(rowIds[i]).parentElement.id;
                
                cellLayer = cellLayer.split(' ')[0];
                allLayers += cellLayer + ' ';
                layerList.push(($("#" + cellLayer).text()));
                layerList = layerList.join('').trim().split(/\s+/);
                layerList = layerList.join('').split('');
                
            }
            console.log(layerList);
            //console.log(allLayers);
        }

        for(let i = 0; i < 3; i++) {
            if(document.getElementById(rowIds[i]).innerHTML === '') {
                currLayer = [];
                cellLayer = document.getElementById(rowIds[i]).parentElement.id;
                cellLayer = cellLayer.split(' ')[0];

                currLayer.push(($("#" + cellLayer).text()));
                currLayer = currLayer.join('').trim().split(/\s+/);
                currLayer = currLayer.join('').split('');

                if(currLayer.includes(missingVal.toString(10)) === false && layerList.includes(missingVal.toString(10)) === true) {
                        
                    //document.getElementById(rowIds[i]).innerHTML = missingVal;
                    //document.getElementById(rowIds[i]).style.backgroundColor = "cyan";
                    blinkLayerCol(allLayers, missingVal);
                    blinkCol(rowIds[i].toString(10), missingVal);
                } 

            }
        }
    

    }
}