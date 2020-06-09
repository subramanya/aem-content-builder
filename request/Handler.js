const fetch = require('cross-fetch');

/**
 * Allows for the posting of an AEM component to a target AEM system.
 * The {@code request} object should respect the standard FETCH API 
 * Request object, set to the POST method.
 * @param {req} The Fetch API Request object with URL;
 * @param {url} url 
 */
function handle(req) {

    // Form requestID (datestamp + url?)
    console.log(`Attempting to post ${JSON.stringify(req)}`);

    fetch(req)
        .then(res => {
            console.log(res);
            if (res.ok) {
                console.log(`Posted to ${req.url} with a status of ${res.statusCode}`);
            }
            res.text();
        })
        .then(html => {
            console.log(html)
        })
        .catch(err => {
            console.log(`Error while attempting POST to ${req.url}`);
            console.log(err);
            console.log(req);
        })
}

module.exports = {
    handle: handle
}