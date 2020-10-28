function getId(x, y){
    x = x.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    y = y.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    return String(x)+String(y)
}

let mouseDown = false, started=false;
let blox = []
let env = document.getElementById("env")
for(let x = 0; x < 30; x++){
    let row = []
    for(let y = 0; y < 50; y++){
        let node = document.createElement('button')
        node.id = getId(x, y);
        node.style.backgroundColor = 'white'
        node.style.gridColumn = `${y+1}/${y+2}`
        node.style.gridRow = `${x+1}/${x+2}`
        node.addEventListener("mousedown", () => {
            mouseDown = true;
            selected(x, y)
        })
        node.addEventListener("mousemove", () => {
            selected(x, y)
        })
        node.addEventListener("mouseup", () => {mouseDown = false})
        row.push(false)
        env.appendChild(node)
    }
    blox.push(row)
}

function selected(x, y){
    if(mouseDown && !started){
        document.getElementById(getId(x, y)).style.backgroundColor = "black"
        blox[x][y] = true
    }
}

let game;
function start(){
    started = true;
    game = setInterval(redraw, 250)
}

function clearIt(){
    clearInterval(game)
    started = false
}

function redraw(){
    let newBlox = []

    for(let x = 0; x < 30; x++){
        let newRow = []
        for(let y  = 0; y < 50; y++){
            newStat = alive(x, y)
            newRow.push(newStat)
        }
        newBlox.push(newRow)
    }
    write(newBlox)
    blox = newBlox
}

function write(blox){
    for(let x = 0; x < 30; x++){
        for(let y = 0; y < 50; y++){
            let node = document.getElementById(getId(x, y))
            if(blox[x][y])
                node.style.backgroundColor = 'black'
            else
                node.style.backgroundColor = 'white'
        }
    }    
}


function alive(x, y){
    let list = [], value = 0;
    for(let i = x-1; i < x+2; i++){
        for(let j = y-1; j < y+2; j++){
            if(blox[i] != undefined && blox[i][j] != undefined){
                if((i!=x || j!=y)){
                    if(blox[i][j])
                        list.push(1)
                    else
                        list.push(0)
                }
            }
        }
    }
    value = list.reduce(function(a, b){
        return a + b;
    });

    if(blox[x][y]){
        if(value == 2 || value == 3)
            return true
        return false
    }
    else{
        if(value == 3)
            return true
        return false
    }
}


// function alive(x, y){
//     let list = [], value = 0;
//     for(let i = x-1; i < x+2; i++){
//         for(let j = y-1; j < y+2; j++){
//             let node = document.getElementById(getId(x, y))
//             if(node != undefined){
//                 if(i!==x || j!==y){
//                     if(node.style.backgroundColor == 'white')
//                         list.push(0)
//                     else if(node.style.backgroundColor == 'black')
//                         list.push(1)
//                 }
//             }
//         }
//     }
//     value = list.reduce(function(a, b){
//         return a + b;
//     });
//     if(document.getElementById(getId(x, y)).style.backgroundColor == 'black'){
//         if(value == 2 || value == 3)
//             return true
//         return false
//     }
//     else if(document.getElementById(getId(x, y)).style.backgroundColor == 'white'){
//         if(value == 3)
//             return true
//         return false
//     }
//     return false
// }