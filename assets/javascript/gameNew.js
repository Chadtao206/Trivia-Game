
// This code will run as soon as the page loads


var intervalId;
var clockRunning = false;

// Stopwatch
var stopwatch = {

    time: 0,

    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 10);
        }

    },

    count: function () {
        if (stopwatch.time <= 0) {
            clearInterval(intervalId);
            clockRunning = false;
            alert("Time's Up!");
            //insert ending here
            gameEnd();
        } else {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);
            $("#display").text(converted);
            clockRunning = true;
        }
    },
    timeConverter: function (t) {
        var minutes = Math.floor(t / 6000);
        var seconds = Math.floor(t / 100 - (minutes * 60));
        var centiSeconds = t - (minutes * 6000 + seconds * 100);

        if (centiSeconds < 10) {
            centiSeconds = "0" + centiSeconds;
        }

        if (seconds === 0) {
            seconds = "00";
        } else if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }


        return minutes + ":" + seconds + ":" + centiSeconds;
    }
};

//Quiz Database API call
var difficulty = "easy";
var questionCount = 10;
var questions = {};
var correct = 0;
var wrong = 0;
//Game End
function gameEnd() {
    var comment = "";
    var percentage = Math.ceil(correct / questionCount * 100);
    if (percentage < 20) {
        comment = "You are dumber than a pile of rocks!"
    } else if (percentage >= 20 && percentage < 40) {
        comment = "You are probably not the sharpest pencil in the drawer!"
    } else if (percentage >= 40 && percentage < 60) {
        comment = "Congratulations! You will achieve mediocrity in life!"
    } else if (percentage >= 60 && percentage < 80) {
        comment = "You know enough to impress people at social gatherings, but not quite enough to fill the existential void."
    } else if (percentage >= 80 && percentage < 100) {
        comment = "You are pretty smart, at least smart enough to look for the answers in console."
    } else if (percentage == 100) {
        comment = "Wow! You really know your stuff! Well done, NERD!"
    }
    console.log(percentage);
    clearInterval(intervalId);
    clockRunning = false;
    $("#display").html("GAME OVER!!!");
    $("#buttons").html("<h1 style='font-weight:bold;color:darkblue;border-style:solid;border-width:5px;margin:auto;padding:10px;background-color:orange;width:75%;'>You have answered " + percentage + "% of the questions correctly</h1>");
    $("#buttons").append("<div id='assessment'>Your Assessment</div>");
    $("#buttons").append("<div id='comment'>" + comment + "</div>");
    $("#buttons").append("<button id='restart'>START OVER</button>")
    $("#restart").on("click", newgame);
}


//Start Trivia
function newgame(){
$("#display").html("WELCOME TO TRIVIA MANIA!");
$("#buttons").html("<h1 class='select'>Select Trivia Length</h1>");
$("#buttons").append("<div class='button button1'><button length='10' time='30000' class='selection btn btn-primary btn-lg'>Compact</button></div>");
$("#buttons").append("<div class='button button2'><button length='25' time='75000' class='selection btn btn-primary btn-lg'>Normal</button></div>");
$("#buttons").append("<div class='button button3'><button length='50' time='150000' class='selection btn btn-primary btn-lg'>Epic</button></div>");
$(".selection").on("click", function () {
    stopwatch.time = $(this).attr("time");
    questionCount = $(this).attr("length");
    console.log(stopwatch.time);
    console.log(questionCount);
    $(".select").html("Select Your Difficulty");
    $(".button1").html("<button difficulty='easy' class='difficulty btn btn-primary btn-lg'>Easy</button>");
    $(".button2").html("<button difficulty='medium' class='difficulty btn btn-primary btn-lg'>Medium</button>");
    $(".button3").html("<button difficulty='hard' class='difficulty btn btn-primary btn-lg'>Hard</button>");
    $(".difficulty").on("click", function () {
        difficulty = $(this).attr("difficulty");
        console.log(difficulty);
        var quizURL = "https://opentdb.com/api.php?amount=" + questionCount + "&difficulty=" + difficulty;
        $.ajax({
            url: quizURL,
            method: "GET",
        }).then(function (response) {
            var questionNum = 0;
            var playerAnswer = "";
            var answerArray = "";
            var randArray = [];
            correct = 0;
            wrong = 0;
            stopwatch.start();
            questions = response.results;
            console.log(questions);
            newQuestion();
            //new question
            function newQuestion() {
                console.log(correct + wrong);
                console.log(questionCount);
                $("#buttons").html("<div id='title'>Category is - " + questions[questionNum].category);
                $("#buttons").append("<div id='question'>" + questions[questionNum].question);
                if (questions[questionNum].type === "boolean") {
                    $("#buttons").append("<div><button class='answer btn btn-primary btn-lg' state='True'>True</button></div>");
                    $("#buttons").append("<div><button class='answer btn btn-primary btn-lg' state='False'>False</button></div>");
                } else {
                    answerArray = questions[questionNum].incorrect_answers;
                    answerArray.push(questions[questionNum].correct_answer);
                    console.log(answerArray);
                    randArray = [];
                    for (i = 0; i < 4; i++) {
                        var temp = Math.floor(Math.random() * answerArray.length);
                        randArray.push(answerArray[temp]);
                        answerArray.splice(temp, 1);
                    }
                    for (i = 0; i < randArray.length; i++) {
                        $("#buttons").append("<div><button class='answer btn btn-primary btn-lg' state='" + randArray[i] + "'>" + randArray[i] + "</button></div>");
                    }
                }
                $(".answer").on("click", function () {
                    playerAnswer = $(this).attr("state");
                    if (playerAnswer === questions[questionNum].correct_answer) {
                        alert("Correct! The answer is " + playerAnswer);
                        correct += 1;
                        if (correct + wrong == questionCount) {
                            $("#buttons").empty();
                            gameEnd();
                        } else {
                            questionNum += 1;
                            newQuestion();
                        }
                    } else {
                        alert("WRONG! The correct answer is " + questions[questionNum].correct_answer);
                        wrong += 1;
                        if (correct + wrong == questionCount) {
                            $("#buttons").empty();
                            gameEnd();
                        } else {
                            questionNum += 1;
                            newQuestion();
                        }
                    }
                })

            }


        })

    })
})
}
$(document).ready(newgame);








