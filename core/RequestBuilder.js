const fetch = require('cross-fetch');

class RequestBuilder {

    static encode(username, password) {
        return Buffer.from(`${username}:${password}`).toString('base64');
    }

    constructor(url) {
        this.url = url;
        this.method = "POST";
        this.data = '';
    }

    payload(data) {
        this.data = data;
        return this;
    }

    changeMethodTo(method) {
        this.method = method;
        return this;
    }

    destination(url) {
        this.url = url;
        return this;
    }

    credentials(username, password) {
        this.user = username;
        this.pass = password;
        return this;
    }

    build() {
        return new fetch.Request(this.url, {
            method: this.method, 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Basic ${RequestBuilder.encode(this.user,this.pass)}`
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: this.data // body data type must match "Content-Type" header
        });
    }
}

module.exports = RequestBuilder;