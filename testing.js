var fs = require('fs')
fs.readFile('permitir_accesodias', 'utf8', function(err, data)
{
    if (err)
    {
        // check and handle err
    }
    // data is the file contents as a single unified string
    // .split('\n') splits it at each new-line character and all splits are aggregated into an array (i.e. turns it into an array of lines)
    // .slice(1) returns a view into that array starting at the second entry from the front (i.e. the first element, but slice is zero-indexed so the "first" is really the "second")
    // .join() takes that array and re-concatenates it into a string
    var linesExceptFirst = data.split('\n').slice(1).join('\n');
    fs.writeFile('permitir_accesodias', linesExceptFirst);
});