const figlet = require('figlet');

// Define the text for ASCII art
const asciiText = " ____                   \n|  _ \\ ___   ___  _ __  \n| |_) / _ \\ / _ \\| '_ \\ \n|  _ < (_) | (_) | |_) |\n|_| \\_\\___/ \\___/| .__/ \n                 |_|    ";



// Print ASCII art to console
figlet(asciiText, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});

