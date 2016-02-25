require! <[fs google-spreadsheet]>

sheet = new google-spreadsheet \18AYlrW4MlIlEouQ4IYRh3kOfdOJJNhIYxHMmP9rWZHs

(err, row-data) <-! sheet.get-rows 1
return console.log err if err
console.log row-data

