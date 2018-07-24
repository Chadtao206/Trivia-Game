// Hollywood Gossip Quiz

// This code will run as soon as the page loads
window.onload = function() {
  $("#start").on("click", stopwatch.start);
};
$("#wrapper").css("background-image: url='assets/images/background.jpg'")
var intervalId;
var clockRunning = false;

// Stopwatch
var stopwatch = {

  time: 360000,
  lap: 1,

  reset: function() {

    stopwatch.time = 0;
    stopwatch.lap = 1;

    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:00:00");

    // DONE: Empty the "laps" div.
    $("#laps").text("");
  },
  start: function() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 10);
      clockRunning = true;
    }
  },
  stop: function() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  recordLap: function() {

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);

    // DONE: Add the current lap and time to the "laps" div.
    $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

    // DONE: Increment lap by 1. Remember, we can't use "this" here.
    stopwatch.lap++;
  },
  count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
  

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t/6000);
    var seconds = Math.floor(t/100 - (minutes*60));
    var centiSeconds = t - (minutes*6000 + seconds * 100);

    if (centiSeconds < 10) {
      centiSeconds = "0" + centiSeconds;
    }

    if (seconds === 0) {
      seconds = "00";
    }else if (seconds < 10) {
      seconds = "0" + seconds; 
    }

    if (minutes === 0) {
      minutes = "00";
    }else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    

    return minutes + ":" + seconds + ":" + centiSeconds;
  }
};

//Quiz Database

var database = {
  1:{question: "Brad Pitt reportedly left former wife Jennifer Aniston for which sultry sexpot?",
    a:"Angelina Jolie",
    b:"Juliette Lewis",
    c:"Gwyneth Paltrow",
    d:"Katie Holmes",
    correct:"Angelina Jolie",
    img:"",
  },

  2:{question: "While in Las Vegas Britney Spears eloped with…",
    a:"Kevin Federline",
    b:"Jason Alexander",
    c:"Justin Timberlake",
    d:"Nick Carter",
    correct:"Jason Alexander",
    img:"",
  },

  3:{
    question: "Which famous actor is NOT a Scientologist?",
    a:"John Travolta",
    b:"Tom Cruise",
    c:"Giovanni Ribisi",
    d:"Mel Gibson",
    correct:"Mel Gibson",
    img:"",
  },

  4:{
    question: "Which infamous Hollywood director fled to France after a sex scandal involving a 13-year-old girl that could have put him behind bars for up to 50 years?",
    a:"Steven Spielberg",
    b:"George Lucas",
    c:"Roman Polanski",
    d:"David Lynch",
    correct:"Roman Polanski",
    img:"",
  },

  5:{
    question: "This Hollywood hottie who appeared in Big Fish allegedly split from his 7-months-pregnant girlfriend due to an affair with a younger, well-known actress.",
    a:"Matt Damon",
    b:"Billy Crudup",
    c:"Timothy Hutton",
    d:"Robert De Niro",
    correct:"Billy Crudup",
    img:"",
  },

  6:{
    question: "Which defiant hip-hop artist's career hasn't quite recovered since he was arrested on the night of the Grammys in 2009 for beating his pop singer girlfriend?",
    a:"Bruno Mars",
    b:"Chris Brown",
    c:"Ne-Yo",
    d:"Kanye West",
    correct:"Chris Brown",
    img:"",
  },

  7:{
    question: "Which child star has had a very public struggle with an eating disorder?",
    a:"Mary-Kate Olsen",
    b:"Ashley Olsen",
    c:"Lindsey Lohan",
    d:"Amanda Bynes",
    correct:"Mary-Kate Olsen",
    img:"",
  },

  8:{
    question: "This female country singer received death threats after speaking out against the president of the United States…",
    a:"Reba McEntire",
    b:"Natalie Maines",
    c:"Faith Hill",
    d:"Trisha Yearwood",
    correct:"Natalie Maines",
    img:"",
  },

  9:{
    question: "Which of the following couples did NOT call it quits after reality shows about their relationships appeared on MTV?",
    a:"Carmen Electra and Dave Navarro",
    b:"Jessica Simpson and Nick Lachey",
    c:"Travis Barker and Shanna Moakler",
    d:"David Beckham and Victoria Beckham",
    correct:"David Beckham and Victoria Beckham",
    img:"",
  },

  10:{
    question: "All of the following actresses have been married to Tom Cruise except…",
    a:"Katie Holmes",
    b:"Nicole Kidman",
    c:"Mimi Rogers",
    d:"Penelope Cruz",
    correct:"Penelope Cruz",
    img:"",
  },

  11:{
    question: "Which Hollywood celebrity has not adopted a child?",
    a:"Angelina Jolie",
    b:"Madonna",
    c:"Sharon Stone",
    d:"Katie Couric",
    correct:"Katie Couric",
    img:"",
  },

  12:{
    question: "Heather Locklear has been romantically linked to which men?",
    a:"Tommy Lee",
    b:"David Spade",
    c:"Jack Wagner",
    d:"All of the above",
    correct:"All of the above",
    img:"",
  },

  13:{question: "Which edgy celebrity was nominated for the Nobel Peace Prize?",
    a:"Bono",
    b:"Ellen DeGeneres",
    c:"Oprah Winfrey",
    d:"Diddy",
    correct:"Bono",
    img:"",
  },

  14:{
    question: "Who plays the role of Lara Croft in the 2018 American action-adventure film, 'Tomb Raider'?",
    a:"Margot Robbie",
    b:"Alicia Vikander",
    c:"Angelina Jolie",
    d:"Brie Larson",
    correct:"Alicia Vikander",
    img:"",
  },

  15:{
    question: "Who held Billboard's number-one song for March of 2018 with 'God's Plan'?",
    a:"Lil Wayne",
    b:"Kanye West",
    c:"Chris Brown",
    d:"Drake",
    correct:"Drake",
    img:"",
  },

  16:{
    question: "This 2018 crime comedy-drama TV series stars Christina Hendricks as Beth Boland, Retta as Ruby Hill and Mae Whitman as Annie Marks.",
    a:"Hard Sun",
    b:"Altered Carbon",
    c:"Good Girls",
    d:"Electric Dreams",
    correct:"Good Girls",
    img:"",
  },

  17:{
    question: "What English heavy metal band released their 18th studio album 'Firepower' on March 9th, 2018? ",
    a:"Iron Maiden",
    b:"The Cult",
    c:"Avenger",
    d:"Judas Priest",
    correct:"Judas Priest",
    img:"",
  },

  18:{
    question: "Guillermo del Toro won the Best Director Oscar at the 90th Academy Awards. For what film?",
    a:"The Shape of Water",
    b:"Darkest Hour",
    c:"Lady Bird",
    d:"Call Me by Your Name",
    correct:"The Shape of Water",
    img:"",
  },

  19:{
    question: "Who won the Record of the Year Grammy Award at the 60th Annual Grammy Awards?",
    a:"Redbone - Childish Gambino",
    b:"The Story of O.J. - Jay-Z",
    c:"Humble - Kendrick Lamar",
    d:"24K Magic - Bruno Mars",
    correct:"24K Magic - Bruno Mars",
    img:"",
  },

  20:{
    question: "What two countries tied for the most gold medals won at the 2018 Winter Olympics?",
    a:"Germany and Norway",
    b:"Germany and Canada",
    c:"Germany and Sweden",
    d:"Germany and United States",
    correct:"Germany and Norway",
    img:"",
  },

  21:{
    question: "What Imagine Dragon's song has the lyric - 'Just a young gun with a quick fuse. I was uptight, wanna let loose...'?",
    a:"Believer",
    b:"Thunder",
    c:"Demons",
    d:"Whatever It Takes",
    correct:"Thunder",
    img:"",
  },
  
  22:{
    question: "This 2018 TV series features a serial killer who is murdering street children during the mid-1890s in New York City.",
    a:"The Alienist",
    b:"Black Lightning",
    c:"The Chi",
    d:"Collateral",
    correct:"The Alienist",
    img:"",
  },

  23:{
    question: "Which actor made his debut as James Bond in the film Casino Royale in 2006?",
    a:"Tom Cruise",
    b:"Daniel Craig",
    c:"Tom Hardy",
    d:"Pierce Brosnan",
    correct:"Daniel Craig",
    img:"",
  },

  24:{
    question: "Howard Wolowitz is a character from which popular U.S. TV show?",
    a:"The Big Bang Theory",
    b:"Silicon Valley",
    c:"Friends",
    d:"Married With Children",
    correct:"The Big Bang Theory",
    img:"",
  },

  25:{
    question: "Who is the oldest of the Kardashian sisters?",
    a:"Chloe",
    b:"Caitlyn",
    c:"Kim",
    d:"Kourtney",
    correct:"Kourtney",
    img:"",
  },

  26:{
    question: "Who topped the Billboard charts with the single 'Love Yourself' in February, 2016?",
    a:"Bruno Mars",
    b:"Justin Timberlake",
    c:"Justin Bieber",
    d:"Justin Long",
    correct:"Justin Bieber",
    img:"",
  },

  27:{
    question: "The character Jar Jar Binks first appears in which of the Star Wars movies?",
    a:"Empire Strikes Back",
    b:"The Force Awakens",
    c:"The Last Jedi",
    d:"The Phantom Menace",
    correct:"The Phantom Menace",
    img:"",
  },

  28:{
    question: "Which leading fashion designer was found dead in his/her London home in February, 2010?",
    a:"Kate Spade",
    b:"Alexander McQueen",
    c:"Ralph Lauren",
    d:"Valentino Garavani",
    correct:"Alexander McQueen",
    img:"",
  },

  29:{
    question: "Who won the 2016 Grammy for Album of the Year with the album '1989'?",
    a:"Taylor Swift",
    b:"Justin Bieber",
    c:"Carrie Underwood",
    d:"Camilla Caballo",
    correct:"Taylor Swift",
    img:"",
  },

  30:{
    question: "Who lives in a pineapple under the sea?",
    a:"Squidward",
    b:"Patrick Star",
    c:"Sandy Squirrel",
    d:"Spongebob Squarepants",
    correct:"Spongebob Squarepants",
    img:"",
  },
}





