<template lang="html">
  <section>
    <div class="totalHolder">
        <div class="gameover" v-if="gameOver">
            <div class="forCentering">

            <div>
                <h1>Game <span class="colored">Over</span></h1>
                <br>
                <p>Score: <span class="colored">{{this.currentScore}}</span></p>
                <br>
                <h3>Your stats: </h3>
                <br>
                <p>Rows Cleared: <span class="colored">{{this.rowsCleared}}</span></p>
                <p>Level: <span class="colored">{{this.currentLevel}}</span></p>
                <p>Final drop speed: <span class="colored">{{this.speed}}</span></p>
                <br>
            </div>
            <div>
                <router-link :to="{ name: 'index'}" class="link">Return to Welcome Page</router-link>
                <router-link :to="{ name: 'Rules' }" class="link">View Rules and Play Again</router-link>

            </div>
        </div>
        </div>
        <div class="game" v-if="playing">

            <div class="leftHolder">
                <div class="row" v-for="(row, rowIndex) in rows">
                    <div class="tile" v-for="(tile, tileIndex) in row" :key="tile[1]" :id="tile[0] + '_' + tile[1]" :ref="tile[0] + '_' + tile[1]" v-bind:class="{'I': tile[3][0], 'J': tile[3][1], 'L': tile[3][2], 'O': tile[3][3], 'T': tile[3][4], 'S': tile[3][5], 'Z': tile[3][6]}">
                    </div>
                </div>
            </div>

            <div class="rightHolder">
                <div class="bounding">
                    <div class="upperHalf">
                        <div class="displayTile">
                            <div v-for="row in displayRows" class="row">
                                <div v-for="tile in row" class="tile" :key="tile[1]" v-bind:class="{'I': tile[3][0], 'J': tile[3][1], 'L': tile[3][2], 'O': tile[3][3], 'T': tile[3][4], 'S': tile[3][5], 'Z': tile[3][6]}">
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="lowerHalf">
                        <p class="statsText">Score: <span class="coloredRed">{{this.currentScore}}</span></p>
                        <p class="statsText">Rows Cleared: <span class="coloredRed">{{this.rowsCleared}}</span></p>
                        <p class="statsText">Level: <span class="coloredRed">{{this.currentLevel}}</span></p>
                        <p class="statsText">Rows until next level: <span class="coloredRed">{{this.untilNextLevel}}</span></p>
                        <p class="statsText">Current drop speed: <span class="coloredRed">{{this.speed}}</span></p>
                        <br>
                        <table class="statsText">
                            <tbody>

                           <tr>
                               <th></th>
                               <th></th>
                               <th>Controls</th>
                               <th></th>
                               <th></th>
                           </tr>
                           <tr>
                               <td></td>
                               <td></td>
                               <td class="coloredRed">Rotate</td>
                               <td></td>
                               <td></td>
                           </tr>
                           <tr>
                               <td></td>
                               <td></td>
                               <td>	&#8593</td>
                               <!-- <td>&#8593</td> -->
                               <td></td>
                               <td></td>
                           </tr>
                           <tr>
                               <td class="coloredRed">Left </td>
                               <td>&#8592 </td>

                               <!-- <td>&#8592</td> -->
                               <td>Arrows</td>
                               <td>&#8594</td>
                               <!-- <td>&#8594</td> -->
                               <td class="coloredRed">Right</td>
                           </tr>
                           <tr>
                               <td></td>
                               <td></td>
                               <td>	&#8595</td>
                               <!-- <td>&#8595</td> -->
                               <td></td>
                               <td></td>
                           </tr>
                           <tr>
                               <td></td>
                               <td></td>
                               <td class="coloredRed">Down</td>
                               <td></td>
                               <td></td>
                           </tr>
                           <tr>
                              <td></td>
                           </tr>
                           <tr>
                               <td></td>
                               <td>Space</td>
                               <td> = </td>
                               <td class="coloredRed">Drop</td>
                               <td></td>
                           </tr>
                       </tbody>
                       </table>
                       <router-link :to="{ name: 'Rules' }" class="link">View Rules</router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
</template>

<script>
import Pieces from '~/components/Pieces.vue'
import Vue from 'vue'
export default {
    data() {
        return {
            playing: true,
            gameOver: false,
            show: true,
            rows: [],
            //tiles: [],
            displayRows: [],
            //displayTiles: [],
            ticker: 1,
            numOfRows: 20,
            numOfColumns: 10,

            rowsCleared: 0,
            currentLevel: 1,
            currentScore: 0,
            rowCombo: 0,
            speed: 500,
            softDropSpeed: 100,
            untilNextLevel: null,
            doubleTetris: 0,

            firstPass: true,
            type: '',
            typeIndex: null,
            orientationIndex: null,
            currentPiece: [],
            standby: [],
            standbyInfo: ['', null, null],
            pieces: Pieces.data().pieces,
            nextIndex: 0,
            pieceHistory: [],
            interval: null,
            defaultInterval: null,
            dropInterval: null,
            delayBetweenLines: null,
            keyCode: null,
            full: false
        }
    },
    methods: {
        generateAllTiles(){
            let allTiles = []
            for (let i = 0; i < this.numOfRows; i++) {
                let row = []
                let h = i
                for (let j = 0; j < this.numOfColumns; j++) {
                    let k = j
                    // 0: y, 1: x, 2: empty tile or not, 3: array of piece indexes, 4: the index selected, or 7 if none
                    row.push([h, k, false, [false, false, false, false, false, false, false], 7])
                    allTiles.push([h, k, false, [false, false, false, false, false, false, false], 7])
                }
                this.rows.push(row)
            }
            this.tiles = allTiles

            for (let i = 0; i < 8; i++) {
                let displayRow = []
                let h = i
                for (let j = 0; j < 6; j++){
                    let k = j
                    displayRow.push([h, k, false, [false, false, false, false, false, false, false], 7])
                }
                this.displayRows.push(displayRow)
            }
            console.log(this.displayRows)


        },
        selectRandomPiece(){
            let length = this.pieces.length
            let randomIndex = Math.floor(Math.random() * length)
            this.pieceHistory.push(randomIndex)
            this.nextIndex = randomIndex
            if (randomIndex == 4 || randomIndex == 6) {
                if (this.pieceHistory[this.pieceHistory.length - 2] == randomIndex &&
                    this.pieceHistory[this.pieceHistory.length - 3] == randomIndex &&
                    this.pieceHistory[this.pieceHistory.length - 4] == randomIndex &&
                    this.pieceHistory[this.pieceHistory.length - 5] == randomIndex) {
                        console.log("had 4 of the same type of piece, either S type or Z type, which is not allowed. Must select different piece. Index was " + randomIndex)
                        this.selectRandomPiece()
                    }
            }
            return randomIndex
        },
        getRandomPosition(thePiece){
            let maxPosition = 0
            let position = 0

            if (thePiece == 'O' || thePiece == 'S') {
                // 2
                maxPosition = 8
                position = Math.floor(Math.random() * maxPosition)
            } else if (thePiece == 'I') {
                // 4
                maxPosition = 6
                position = Math.floor(Math.random() * maxPosition)
            } else {
                // 3
                maxPosition = 7
                position = Math.floor(Math.random() * maxPosition)
            }
            return position
        },
        loadCurrentPiece(){


        //    console.log("standby index: " + this.standby[4])
            let tempPieceType = this.pieces[this.standby[4]].pieceType
            let tempPieceOrientation = 0
            let newPiece = this.pieces[this.standby[4]].orientations[0]
            let clear = true
            let centering = this.getRandomPosition(tempPieceType)
            let heightAdjustment = 0

            // Adjust orientation so that piece is presented in the 'flattest' way possible
            if (tempPieceType == 'I' || tempPieceType == 'J' || tempPieceType == 'L') {
                newPiece = this.pieces[this.standby[4]].orientations[1]
                tempPieceOrientation = 1
            }
            // Adjust centering so piece is most centered or leaning left
            // if (tempPieceType == 'I' || tempPieceType == 'T' || tempPieceType == 'S') {
            //     centering = 4
            // }
            if (tempPieceType == 'I' || tempPieceType == 'L' || tempPieceType == 'T' ) {
                heightAdjustment = -1
            }
            for (let i = 0; i < 4; i++) {
                // console.log("newpiece[i]: " + newPiece[i])
                // console.log("heightAdjustment: " + heightAdjustment)
                // console.log("newPiece[i][0]+heightAdjustment: " + newPiece[i][0]+heightAdjustment)
                // console.log("centering: " + centering)
                // console.log("[newPiece[i][1]+centering]: " + [newPiece[i][1]+centering])
                if (this.rows[newPiece[i][0]+heightAdjustment][newPiece[i][1]+centering][2] === true) {
                    clear = false
                }
            }
            if (clear === true) {
                this.ticker = 1
                this.currentPiece = []
                this.type = this.pieces[this.standby[4]].pieceType
                this.typeIndex = this.standby[4]
                this.orientationIndex = tempPieceOrientation

                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[newPiece[i][0]+heightAdjustment][newPiece[i][1]+centering], 2, true)
                    Vue.set(this.rows[newPiece[i][0]+heightAdjustment][newPiece[i][1]+centering][3], this.typeIndex, true)
                    Vue.set(this.rows[newPiece[i][0]+heightAdjustment][newPiece[i][1]+centering], 4, this.typeIndex)
                    // Set the currentPiece data property to the current piece
                    this.currentPiece.push([newPiece[i][0]+heightAdjustment,newPiece[i][1]+centering])
                }
            } else {
                this.ticker += 1
                let previousIndex = this.pieceHistory[this.pieceHistory.length - this.ticker]
                this.type = this.pieces[previousIndex].pieceType
                this.typeIndex = previousIndex
                this.full = true
            }

        },
        loadNewStandby(){
            let newIndex = this.selectRandomPiece()
            let newSelection = this.pieces[newIndex]
            let newStandby = newSelection.orientations[0]
            let oldIndex = this.standby[4]
            for (let i = 0; i < 4; i++) {
                Vue.set(this.displayRows[this.standby[i][0]][this.standby[i][1]], 2, false)
                Vue.set(this.displayRows[this.standby[i][0]][this.standby[i][1]][3], oldIndex, false)

            }
            if (this.full === true) {
                return
            }
            this.standby = []
            for (let i = 0; i < 4; i++) {
                Vue.set(this.displayRows[newStandby[i][0]+2][newStandby[i][1]+2], 2, true)
                Vue.set(this.displayRows[newStandby[i][0]+2][newStandby[i][1]+2][3], newIndex , true)
                // Set the currentPiece data property to the current piece
                this.standby.push([newStandby[i][0]+2,newStandby[i][1]+2])
            }
            this.standby.push(newIndex)

        },
        loadPiece(){
            this.checkForRowComplete()
            if (this.pieceHistory.length <= 1 ){
                if (this.firstPass === true) {
                    this.loadNewStandby()
                    this.firstPass = false
                    this.loadPiece()
                } else {
                    this.loadCurrentPiece()
                }
            } else {
                this.loadCurrentPiece()
                this.loadNewStandby()
            }
            if (this.defaultInterval == null) {
                this.defaultInterval = setInterval(()=>this.normalDown('auto'), this.speed)
            }
            // if (this.pauseSet == true) {
            //     this.delayBetweenLines = setTimeout(()=>this.loadPiece(), 100)
            //     this.pauseSet = false
            // }

            // Present the piece
        },
        normalDown(scoringInfo){
            let piece = this.currentPiece
            let pieceIndex = this.typeIndex
            if (this.checkIfClear('down')){
                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[piece[i][0]][piece[i][1]], 2, false)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]][3], pieceIndex, false)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]], 4, 7)
                }
                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[piece[i][0]+1][piece[i][1]], 2, true)
                    Vue.set(this.rows[piece[i][0]+1][piece[i][1]][3], pieceIndex, true)
                    Vue.set(this.rows[piece[i][0]+1][piece[i][1]], 4, pieceIndex)
                    this.currentPiece[i][0]++

                }
                switch (scoringInfo) {
                    case 'auto':
                        break
                    case 'pressing':
                        this.currentScore +=1
                        break
                    case 'dropping':
                        this.currentScore +=2
                        break
                }
            } else {
                clearInterval(this.interval)
                this.interval = null
                clearInterval(this.defaultInterval)
                this.defaultInterval = null
                clearInterval(this.dropInterval)
                this.dropInterval = null
                if (this.full == false){
                    this.loadPiece()
                } else {
                    this.gameOver = true
                    this.playing = false
                }

            }
        },
        moveLeft(){
            let piece = this.currentPiece
            let pieceIndex = this.typeIndex
            if (this.checkIfClear('left')) {
                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[piece[i][0]][piece[i][1]], 2, false)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]][3], pieceIndex, false)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]], 4, 7)
                }
                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[piece[i][0]][piece[i][1]-1], 2, true)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]-1][3], pieceIndex, true)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]-1], 4, pieceIndex)
                    this.currentPiece[i][1]--
                }
            }
        },
        moveRight(){
            let piece = this.currentPiece
            let pieceIndex = this.typeIndex
            if (this.checkIfClear('right')){
                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[piece[i][0]][piece[i][1]], 2, false)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]][3], pieceIndex, false)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]], 4, 7)
                }

                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[piece[i][0]][piece[i][1]+1], 2, true)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]+1][3], pieceIndex, true)
                    Vue.set(this.rows[piece[i][0]][piece[i][1]+1], 4, pieceIndex)
                    this.currentPiece[i][1]++
                }
            }

        },
        rotatePiece(){
            let piece = this.currentPiece
            let pieceIndex = this.typeIndex
            let currentOrientation = this.orientationIndex // orientation of said piece
            let pieceSelection = this.typeIndex // index of said piece-type in pieces
            let finalPiece = []
            let initialPiece = []

            // the set of differences for a rotation from current position to new, i.e. the set for "north(current) to east(new)"
            let displacementSet = this.pieces[pieceIndex].differences[currentOrientation]

            // clear space
            for (let i = 0; i < 4; i++) {
                Vue.set(this.rows[piece[i][0]][piece[i][1]], 2, false)
                Vue.set(this.rows[piece[i][0]][piece[i][1]][3], pieceIndex, false)
                Vue.set(this.rows[piece[i][0]][piece[i][1]], 4, 7)
            }

            // calculate new values & assign them to finalPiece. Store old values in initialPiece
            for (let i = 0; i < 4; i++) {
                let newPosition = [piece[i][0] + displacementSet[i][0], piece[i][1] + displacementSet[i][1]]
                let oldPosition = [piece[i][0],piece[i][1]]
                finalPiece[i] = newPosition
                initialPiece[i] = oldPosition

            //    Vue.set(this.currentPiece, i , newPosition)
            }


            if (this.checkIfClearForRotate(initialPiece, finalPiece) == 0){
                // load in new currentPiece
                for (let i = 0; i < 4; i++) {
                    let newPosition = [this.currentPiece[i][0] + displacementSet[i][0], this.currentPiece[i][1] + displacementSet[i][1]]
                    //finalPiece[i] = newPosition
                    Vue.set(this.currentPiece, i , newPosition)
                }

                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[finalPiece[i][0]][finalPiece[i][1]], 2, true)
                    Vue.set(this.rows[finalPiece[i][0]][finalPiece[i][1]][3], pieceIndex , true)
                    Vue.set(this.rows[finalPiece[i][0]][finalPiece[i][1]], 4, pieceIndex)
                }

                // since we are done rotating, need to update the current orientation (north is now east)
                if (this.orientationIndex <= 2) {
                    this.orientationIndex++
                } else {
                    this.orientationIndex = 0
                }
            } else if (this.checkIfClearForRotate(initialPiece, finalPiece) == 1) {

                let finalPieceLocation = this.currentPiece

                let testRows = []
                let testColumns = []
                let differenceY = 0
                let differenceX = 0
                for (let i = 0; i < 4; i++){
                    testRows.push(finalPiece[i][0])
                    testColumns.push(finalPiece[i][1])
                }
                var testMaxRow = testRows.reduce(function(a, b){
                    return Math.max(a,b)
                })
                // console.log("max rotated row: "+ rotatedMaxRow)
                var testMaxColumn = testColumns.reduce(function(a, b){
                    return Math.max(a,b)
                })

                var testMinRow = testRows.reduce(function(a,b){
                    return Math.min(a,b)
                })

                // console.log("max rotated column: "+ rotatedMaxColumn)
                var testMinColumn = testColumns.reduce(function(a, b){
                    return Math.min(a,b)
                })


                if (testMaxRow >= 20) {
                    differenceY = 19 - testMaxRow
                    for (let i = 0; i < 4; i++) {
                        finalPiece[i][0] += differenceY
                    }
                } else if (testMinRow < 0){
                    differenceY = testMinRow * -1
                    for (let i = 0; i < 4; i++) {
                        finalPiece[i][0] += differenceY
                    }
                } else if (testMaxColumn >= 10) {
                    let differenceX = 9 - testMaxColumn
                    for (let i = 0; i < 4; i++) {
                        finalPiece[i][1] += differenceX
                    }
                } else if (testMinColumn < 0) {
                    let differenceX = testMinColumn * -1
                    for (let i = 0; i < 4; i++) {
                        finalPiece[i][1] += differenceX
                    }
                }

                for (let i = 0; i < 4; i++) {
                    let newPosition = [finalPiece[i][0], finalPiece[i][1]]
                    //finalPiece[i] = newPosition
                    Vue.set(this.currentPiece, i , newPosition)
                }

                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[finalPiece[i][0]][finalPiece[i][1]], 2, true)
                    Vue.set(this.rows[finalPiece[i][0]][finalPiece[i][1]][3], pieceIndex , true)
                    Vue.set(this.rows[finalPiece[i][0]][finalPiece[i][1]], 4, pieceIndex)
                }
                // since we are done rotating, need to update the current orientation (north is now east)
                if (this.orientationIndex <= 2) {
                    this.orientationIndex++
                } else {
                    this.orientationIndex = 0
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    Vue.set(this.rows[initialPiece[i][0]][initialPiece[i][1]], 2, true)
                    Vue.set(this.rows[initialPiece[i][0]][initialPiece[i][1]][3], pieceIndex , true)
                    Vue.set(this.rows[initialPiece[i][0]][initialPiece[i][1]], 4, pieceIndex)
                }
            }

        },
        contains(wholePiece, coordinatesX, coordinatesY) {
            let tile = wholePiece
            let testRow = coordinatesX
            let testColumn = coordinatesY

            let trueForRow = tile.filter(row => row[0] === testRow);
            let trueForBoth = trueForRow.filter(column => column[1] === testColumn)
            if (trueForBoth.length === 0) {
                return false
            } else {
                return true
            }

        },
        levelUp(){
            if (this.rowsCleared < 6){
                if (this.untilNextLevel <= 0) {
                    this.currentLevel++
                    this.speed-= 50
                    this.softDropSpeed-=10
                    this.untilNextLevel += 2
                }
            } else if (this.rowsCleared < 12){
                if (this.untilNextLevel <= 0) {
                    this.currentLevel++
                    this.speed-=25
                    this.untilNextLevel += 4
                }
            } else if (this.currentLevel < 18) {
                if (this.untilNextLevel <= 0) {
                    this.currentLevel++
                    this.speed-=10
                    this.untilNextLevel += 4
                }
            } else {

            }
            if (this.speed <= 10) {
                this.speed = 10
            }
        },
        checkDown(piece, rows, tiles){
            for (let i = 0; i < 4; i++){
                if (this.rows[piece[i][0] + 1][piece[i][1]][2] == true && !this.contains(piece, piece[i][0] + 1, piece[i][1]) )  {

                    return false
                }
            }
            return true
        },
        checkLeft(piece, rows, tiles){
            for (let i = 0; i < 4; i++){
                if ( this.rows[piece[i][0]][piece[i][1]-1][2] === true && !this.contains(piece, piece[i][0], piece[i][1] - 1)) {

                    return false
                }
            }
            return true
        },
        checkRight(piece, rows, tiles) {
            for (let i = 0; i < 4; i++){
                if ( this.rows[piece[i][0]][piece[i][1]+1][2] === true && !this.contains(piece, piece[i][0], piece[i][1] + 1)) {

                    return false
                }
            }
            return true
        },
        compareFirstAndFinal(first, location, tileRow, tileColumn) {
            if (first[location][0] === tileRow && first[location][1] === tileColumn){
                return true
            } else {
                return false
            }
        },
        checkRotate(first, final){
            // console.log("first: " + first)
            // console.log("final: " + final)
            let overlappingTiles = []
            let nonOverlappingTiles = []
            let searchable = final
            for (let i = 0; i < 4; i ++){
                if ( this.rows[final[i][0]][final[i][1]][2] === true && !this.compareFirstAndFinal(first, i, final[i][0], final[i][1])){
                    return false
                }
            }
            return true
        },
        checkIfClear(direction){
            let returnValue = false
            let piece = this.currentPiece
            let rows = []
            let tiles = []
            for (let i = 0; i < 4; i++) {
                rows.push(this.currentPiece[i][0])
                tiles.push(this.currentPiece[i][1])
            }

            var maxRow = rows.reduce(function(a, b){
                return Math.max(a,b)
            })
            var maxColumn = tiles.reduce(function(a, b){
                return Math.max(a,b)
            })
            var minColumn = tiles.reduce(function(a, b){
                return Math.min(a,b)
            })



            switch (direction) {
                case 'down':
                    if (maxRow == 19) {
                        returnValue = false
                    } else if (!this.checkDown(piece, rows, tiles)){
                        returnValue = false
                    } else {
                        returnValue = true
                    }
                    break;
                case 'left':
                    if (minColumn == 0) {
                        returnValue = false
                    } else if (!this.checkLeft(piece, rows, tiles)){
                        returnValue = false
                    } else {
                        returnValue = true
                    }
                    break;
                case 'right':
                    if (maxColumn == 9) {
                        returnValue = false
                    } else if (!this.checkRight(piece, rows, tiles)){
                        returnValue = false
                    } else {
                        returnValue = true
                    }
                    break;
            }
            return returnValue
        },
        checkIfClearForRotate(firstPosition, finalPosition){
            let returnValue = 0
            let rotatedRows = []
            let rotatedTiles = []
            for (let i = 0; i < 4; i++ ){
                if (finalPosition[i][0] != undefined) {
                    rotatedRows.push(finalPosition[i][0])
                }
                if (finalPosition[i][1] != undefined){
                    rotatedTiles.push(finalPosition[i][1])
                }
            }

            var rotatedMaxRow = rotatedRows.reduce(function(a, b){
                return Math.max(a,b)
            })
            // console.log("max rotated row: "+ rotatedMaxRow)
            var rotatedMaxColumn = rotatedTiles.reduce(function(a, b){
                return Math.max(a,b)
            })
            // console.log("max rotated column: "+ rotatedMaxColumn)
            var rotatedMinColumn = rotatedTiles.reduce(function(a, b){
                return Math.min(a,b)
            })
            // console.log("min rotated column: "+ rotatedMinColumn)
            var rotatedMinRow = rotatedRows.reduce(function(a, b){
                return Math.min(a,b)
            })

            if (rotatedMaxRow >= 19 || rotatedMaxColumn >= 10 || rotatedMinColumn < 0 || rotatedMinRow < 0 ){
                returnValue = 1
            } else if (!this.checkRotate(firstPosition, finalPosition)){
                returnValue += 2
            } else {
                returnValue = 0
            }
        return returnValue
    },
    checkForRowComplete(){
        for (let i = 0; i < this.numOfRows; i++) {
            let checked = 0
            for (let j = 0; j < this.numOfColumns; j++){
                // console.log("r: "+ i + " c: " + j + " t/f: " + this.rows[i][j][2])
                if (this.rows[i][j][2] === true)
                checked++
            }
            if (checked == 10) {
                this.rowClear(i)
                return
                 //???? yes? because recursive call comes later in droprowsabove, and to finish out this row check is pointless since the new complete row could be above or below this one.
            }

        }
        this.calculateScore()
        this.levelUp()
        this.rowCombo = 0
    },
    rowClear(rowToBeCleared){
        for (let i = 0; i < this.numOfColumns; i++){
            Vue.set(this.rows[rowToBeCleared][i], 2, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 0, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 1, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 2, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 3, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 4, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 5, false)
            Vue.set(this.rows[rowToBeCleared][i][3], 6, false)
            Vue.set(this.rows[rowToBeCleared][i], 4, 7)
        }
        // below this line, need to add in "pauseSet" to true
    //    this.delayBetweenLines = setTimeout(()=>(this.dropRowsAbove(rowToBeCleared), this.pauseSet = true), 100)
        this.dropRowsAbove(rowToBeCleared)
    },
    dropRowsAbove(aboveThis){
        let aboveTypeIndex = null

        for (let i = aboveThis; i >= 1; i--) {
            for (let j = 0; j < this.numOfColumns; j++) {

                aboveTypeIndex = this.rows[i - 1][j][4]
                if (aboveTypeIndex != 7){
                    Vue.set(this.rows[i][j], 2, this.rows[i - 1][j][2])
                    Vue.set(this.rows[i][j][3], 0, false)
                    Vue.set(this.rows[i][j][3], 1, false)
                    Vue.set(this.rows[i][j][3], 2, false)
                    Vue.set(this.rows[i][j][3], 3, false)
                    Vue.set(this.rows[i][j][3], 4, false)
                    Vue.set(this.rows[i][j][3], 5, false)
                    Vue.set(this.rows[i][j][3], 6, false)
                    Vue.set(this.rows[i][j][3], aboveTypeIndex, this.rows[i - 1][j][3][aboveTypeIndex])
                    Vue.set(this.rows[i][j], 4, aboveTypeIndex)
                } else {
                    Vue.set(this.rows[i][j], 2, false)
                    Vue.set(this.rows[i][j][3], 0, false)
                    Vue.set(this.rows[i][j][3], 1, false)
                    Vue.set(this.rows[i][j][3], 2, false)
                    Vue.set(this.rows[i][j][3], 3, false)
                    Vue.set(this.rows[i][j][3], 4, false)
                    Vue.set(this.rows[i][j][3], 5, false)
                    Vue.set(this.rows[i][j][3], 6, false)
                    Vue.set(this.rows[i][j], 4, 7)
                }
            }
        }
        this.rowsCleared++
        this.untilNextLevel--
        this.rowCombo++
        console.log(this.rowCombo + " - combo")
        this.checkForRowComplete()

    },
    calculateScore(){
        if (this.rowCombo <= 3){
            this.currentScore += this.rowCombo * 100
        } else {
            this.currentScore += 800
            this.doubleTetris+=1
        }
        if (this.doubleTetris == 2) {
            this.currentScore += 800
            this.doubleTetris = 0
        }

    },
    keyboardInputHandler(event){
        this.keyCode = event.keyCode
        switch (this.keyCode) {
            case 40:
            event.preventDefault()
            if (this.interval == null) {
                this.interval = setInterval(()=>this.normalDown('pressing'), this.softDropSpeed)
            }
            break;
            case 39:
            event.preventDefault()
            this.moveRight()
            break
            case 37:
            event.preventDefault()
            this.moveLeft()
            break
            case 38:
            event.preventDefault()
            this.rotatePiece()
            break
            case 32:
            event.preventDefault()
            this.dropInterval = setInterval(()=>this.normalDown('dropping'),10)
            break
            default:
            break
        }
    },
    keyboardUp(event){
        if (this.keyCode == 40) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    },
    created(){
        this.generateAllTiles()
        let myIndex = this.selectRandomPiece()
        let mySelection = this.pieces[myIndex]
        let myPiece = mySelection.orientations[0]
        for (let i = 0; i < 4; i++) {
            //Vue.set(this.displayRows[myPiece[i][0]+2][myPiece[i][1]+2], 2, true)
            //Vue.set(this.displayRows[myPiece[i][0]+2][myPiece[i][1]+2][3], myIndex , true)
            // Set the currentPiece data property to the current piece
            this.standby.push([myPiece[i][0]+2,myPiece[i][1]+2])
        }
        this.standby.push(myIndex)
        this.untilNextLevel = 2
        this.loadPiece()

    },
    beforeMount(){
        window.addEventListener('keydown', (event) => {this.keyboardInputHandler(event)})
        window.addEventListener('keyup', (event) => {this.keyboardUp(event)})
    }
}
</script>

<style lang="css">

.row {
    display: block;
    height: 30px;
    width: 300px;
}
.tile {
    display: inline-block;
    height: 30px;
    width: 30px;
    background-color:#e1e0e1;

    border: solid 2px;
    border-color: #8e8e8e;
    border-collapse: collapse;

}
.I {
    background-color: cyan;
}
.J {
    background-color: blue;
}
.L {
    background-color: orange;
}
.O {
    background-color: yellow;
}
.T {
    background-color: green;
}
.S {
    background-color: purple;
}
.Z {
    background-color: red;
}

.totalHolder {
    height: 100vh;
    width: 100vw;
    display: inline-block;
    position: relative;

    background-color: #9f9f9f;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='200' viewBox='0 0 16 32'%3E%3Cg fill='%23b60000' fill-opacity='0.8'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");

    /* background-color: #b2b2b2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 32 32'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='Artboard-5' fill='%23ffffff' fill-opacity='0.3' fill-rule='nonzero'%3E%3Cpath d='M6 18h12V6H6v12zM4 4h16v16H4V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
}
.leftHolder {
    /*position: absolute;*/
    display: inline-block;
    border: solid 10px;
    /* border-color: #d60000; */
    border-color: #59c3aa;
    background-color: grey;
    padding: 10px;
    margin-right: 20px;
}
.rightHolder{
    position: absolute;
    display: inline-block;
    border: solid 10px;
    /* border-color: #d60000; */
    border-color: #59c3aa;
    background-color: grey;
    padding: 10px;
    margin-right: 20px;
    font-family: "Trebuchet MS", sans-serif;
}
.bounding {

    background-color: grey;
    display: inline-block;
    /*top: 200px;*/
    height: 600px;
    width: 200px;
}
.upperHalf{
    display: block;
    height: 45%;
    background-color:  grey;
}
.displayTile{
    padding: 10px;
}
.lowerHalf{
    display: block;
    height: 55%;
    background-color:  grey;
    padding: 0px;
    text-align: center;
}

.statsText{
    padding: 3px;
    color: white;
}
.notStarted{
    font-family: "Trebuchet MS", sans-serif;
    padding: 10px;
    margin-top: 10px;
    margin-left: 300px;
    margin-right: 300px;
    border: solid 3px;
    border-color: #ae0000;
    border-radius: 100px;
    text-align: center;
    background-color: #59c3aa;
    font-size: 20px;
    color: white;
}
.game{
    padding-left: 25vw;
    padding-top: 10vh;
}
.gameover{
    display: inline-block;
    padding: 10px;
    margin-top: 10vh;
    margin-left: 30vw;
    border: solid 3px;
    border-color: white;
    border-radius: 10px;
    text-align: center;
    background-color: #ae0000;
    font-size: 20px;
    color: white;
}
table{
    align-self: center;
    font-size: 13px;
    text-align: center;
    margin-bottom: 10px;
}
button{
    border-radius: 10px;
    border: solid 1px;
    border-color: white;
    background-color: #ae0000;
    color: white;
    font-size: 14px;
}
.link{
    margin-top: 20px;
    text-decoration: none;
    background-color: white;
    color: #ae0000;
    border-radius: 10px;
    padding-left: 3px;
    padding-right: 3px;
    border: solid 3px;
    border-color: #59c3aa;
    margin-left: 3px;
    margin-right: 3px;
}
.colored{
    color: #59c3aa;
}
.coloredRed {
    color: #ae0000;
}
.forCentering{
    display: inline-block;
    text-align: center;
}
</style>
