<template lang="html">
    <div class="container">
        <div class="rules">
            <p>Before you begin...</p>
            <h1>Game Mechanics</h1>
            <h4>No Infinite Spin</h4>
            <h6>Your piece will continue to drop no matter what. If it touches a piece below it that blocks it's descent, or reaches the bottom of the play area, then you only have an instant of time before it locks into place. Regardless of whether you are rotating your piece, or moving it to one side... if you take to long, then your piece will lock into place. </h6>
            <h4>Space Key to 'hard' Drop</h4>
            <h6>Hitting the space key will drop the current piece straight down. Once you hit this key, the piece will drop, and there is no way to stop or interrupt this process. This is sometimes called a 'hard drop.'</h6>
            <h4>Down Arrow to 'soft' Drop </h4>
            <h6>The downwards arrow key can be pressed and held to drop a piece at a faster speed. You can release this key at any time and your piece will return to dropping at it's normal pace. You can hold this key until your piece hits the bottom, and this is sometimes called a 'soft drop.'</h6>
            <h4>Levels</h4>
            <h6>Level changes are triggered by a number of row clears. Every few clears will trigger the next level. A new level means that the pieces will drop slightly more quickly than they did before.</h6>
            <h4>Pieces</h4>
            <h6>Pieces are selected 100% randomly with one exception. You may get the same piece several times in a row, but that occurance is pure random chance. The exception is that you can only draw a 'Z' or 'S' type piece 4 times in a row, and no more. This is to prevent a technically unwinnable game from occuring. You can read more about this on the wikipedia page for Tetris.</h6>
            <h1>Scoring</h1>
            <h4>Drops</h4>
            <h6>Soft dropping (down arrow) is worth 1 point per drop; i.e. if your tile is 3 squares from the bottom, and you press and hold the down arrow, you will get 3 points.</h6>
            <h6>Hard dropping (space bar) is worth 2 points per drop. In the same scenario above, you would recieve 6 points instead of 3.</h6>
            <h6>Natural dropping (no keys pressed) does not earn any points. The only way a natural drop may contribute to earning points is if it happens to trigger a row clear. See the next section for scoring on rows.</h6>
            <h4>Rows and Combos</h4>
            <h6>Each single row clear is worth 100 points. Double and Triple row clears are no different, and not awarded any extra points. A quadruple row clear, also known as a Tetris, is worth 800 points. Back-to-back tetrises are worth 1200 points apiece.</h6>

        </div>
        <div class="button">
            <p>Ready to play? Click the button to begin!</p>
            <router-link :to="{ name: 'Play'}" class="link">Play!</router-link>
            <router-link :to="{ name: 'index'}" class="link">Return to Title Page</router-link>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.container {
    height: 100vh;
    width: 100vw;
    display: inline-block;
    position: relative;
    /* background-size: cover; */
    background-color: #9f9f9f;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='200' viewBox='0 0 16 32'%3E%3Cg fill='%23b60000' fill-opacity='0.8'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
    text-align: center;
}
.rules{
    /* background-color: #59c3aa; */
    font-family: "Trebuchet MS", sans-serif;
    background-color: grey;
    border: solid 3px;
    color: white;
    border-color: #ae0000;
    border-radius: 30px;
    display: inline-block;
    padding: 30px;
    padding-top: 0px;
    padding-bottom: 2px;
    margin-top: 10px;
    margin-left: 100px;
    margin-right: 100px;
    text-align: center;

    font-size: 20px;

}
.rules h1{
    color: #b22121;
}
.rules p {
    color: white;
}
.button{
    display: inline-block;
    width: 350px;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    border: solid 2px;
    border-color: white;
    background-color: #ae0000;
    color: white;
    font-size: 16px;
    margin: 3px;
}
.link{
    margin-top: 10px;
    width:auto;
    text-decoration: none;
    background-color: white;
    color: #ae0000;
    border-radius: 10px;
    padding-left: 3px;
    padding-right: 3px;
    border: solid 1.5px;
    border-color: #59c3aa;
    margin: 3px;
    font-size: 14px;
}
</style>
