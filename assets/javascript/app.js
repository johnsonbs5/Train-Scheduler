$(document).ready(function () {

    // Initializing Firebase Below
    var config = {
        apiKey: "AIzaSyDUnGHkSbef8OJPPHgvqoEYaMJhGkzx1TQ",
        authDomain: "fir-project-209a4.firebaseapp.com",
        databaseURL: "https://fir-project-209a4.firebaseio.com",
        projectId: "fir-project-209a4",
        storageBucket: "fir-project-209a4.appspot.com",
        messagingSenderId: "175923355280",
        appId: "1:175923355280:web:f6e5efac98dd2c87804215"
    };
    firebase.initializeApp(config);

    //Setting a variable below for our firebase info 
    var database = firebase.database();

    //Below is where we initialize those variables
    var trainName = "";
    var trainDestination = "";
    var trainFrequency = 0;
    var trainTime = "";
    var clickCounter = 1;

    //Jquery info for on click functions
    $("#add-train").on("click", function (event) {
        event.preventDefault();//prevents refresh
        if ($("#train-input").val(), $("#destination-input").val(), $("#time-input").val(), $("#frequency-input").val() === "") {
            alert("All information must be entered. Click submit when completed");

        } else if ($("#time-input").val() > 24) {
            //Time is limited to 24 hours and alerts below
            alert("Please use military time!");
        } else {

            //User input variables
            trainName = $("#train-input").val().trim();
            trainDestination = $("#destination-input").val().trim();
            trainTime = $("#time-input").val().trim();
            trainFrequency = $("#frequency-input").val().trim();


        

            //setting var for train info
            var trainDetail = {
                name: trainName,
                destination: trainDestination,
                frequency: trainFrequency,
                time: trainTime
            };

            database.ref().push(trainDetail);

            

            //Alers information about train
            alert("A new train details has been added..");

            //Clearing all the values from the input area when the submit button is clicked.
            $("#train-input").val("");
            $("#destination-input").val("");
            $("#time-input").val("");
            $("#frequency-input").val("");
        }
    });

    
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        console.log("Hello2");
        console.log(childSnapshot.val());

        //Store to a variable.......
        var trainNumber = clickCounter++;
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

       
        //converting times
        var trainTimeConvert = moment(trainTime, "HH:mm").subtract(1, "years");
        console.log("trainTimeConvert", + trainTimeConvert);

        //Moment js for current time
        var currentTime = moment();

        //Use moment.js to show the difference in time between the first train arrival and the current time
        var diffTime = moment().diff(trainTimeConvert, "minutes");
        console.log(diffTime);

        var remainder = diffTime % trainFrequency;
        console.log("Remainder: " + remainder);

        //Moment js remaining time
        var timeRemain = trainFrequency - remainder;
        console.log("Time Remain: " + timeRemain);

        //Moment.js calculation and variables
        var newTrainTime = moment().add(timeRemain, "minutes");
        var newTrainTimeFormat = moment(newTrainTime).format("HH:mm");

        
        var row = $(("<tr class = 'tableRow'><td>" + trainNumber + "</td><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency + "</td><td>" + newTrainTimeFormat + "</td><td>" + timeRemain + "</td></tr>"));

        //Appending row 
        $(".tableBody").append(row);
    });
});