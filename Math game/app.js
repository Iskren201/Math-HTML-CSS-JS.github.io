// if we clokc on the start/reset button
    // if we are playing
        //reload the page
            // if we are not playing
                //show countdown box        
                    //reduce the time by 1sc in loops
                        //timelift
                            //yes->continue
                                //no game over
                                    //change button to reset
                                        //generate new Q&A
                                    //if we clock on answer box
                                //if we are playing
                            //correct?
                        //yes
                    //increase score
                //show correct box
            //generate new Q&A
        //no
    //show try again box for 1 sc
// set score to zero

var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
document.getElementById("start-reset").onclick = function(){
    //if we are playing
    if (playing == true){
        location.reload(); // Reload page
    }
    else{
        
        playing = true;

        score = 0;
        
        document.getElementById("score-value").innerHTML = score;    
        
        document.getElementById("timeRemaining").style.display = "block";
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        document.getElementById("gameOver").style.display = "none"

        document.getElementById("start-reset").innerHTML = "Reset Game";
    
        startCountdown();

        generateQA();
    }

}

    for(i = 1; i < 5; i++){
        document.getElementById("box" + i).onclick =function(){
            if (playing == true) {
                if(this.innerHTML == correctAnswer){
                    score++;
                    document.getElementById("score-value").innerHTML = score;
                    document.getElementById("wrong").style.display = "none";
                    document.getElementById("correct").style.display = "block";
                    setTimeout(function(){
                        document.getElementById("correct").style.display = "none"; 
                    }, 1000);
    
                    //Generate New Q&A
    
                    generateQA();
                }else{
                    // wrong answers
                    document.getElementById("correct").style.display = "none";
                    document.getElementById("wrong").style.display = "block";
                    setTimeout(function(){
                        document.getElementById("wrong").style.display = "none"; 
                    }, 1000);
                }
    
            }
        }
    }


function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){ // game over
            stopCountdown();
            
            show("gameOver");

            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p> <p>Your Score is " + score + " .</p>";
            
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000)

}


function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById("timeRemaining").style.display = "none";
}

function show(Id){
    document.getElementById("gameOver").style.display = "block";
}

function generateQA(){
    var x = 1+ Math.round(9 * Math.random());
    var y = 1+ Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y ;

        var correctPosition =  1+ Math.round(3 * Math.random());
        document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill correct answer , one box

        //fill other boxes with wrong answers

    var answers = [correctAnswer];

        for(i = 1; i < 5; i++){
            if(i != correctPosition){
                var wrongAnswer;

                do{
                    wrongAnswer = ( 1+ Math.round(9 * Math.random()) ) * ( 1+ Math.round(9 * Math.random()) ); // a Wrong answer
                }
                while(answers.indexOf(wrongAnswer)> -1)

                document.getElementById("box" + i).innerHTML = wrongAnswer;

                answers.push(wrongAnswer);

            }
        }

}