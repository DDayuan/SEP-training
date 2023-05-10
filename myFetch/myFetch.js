function myFetch(url, options) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        let method = 'GET';
        if (options) {
            if (options.method) {
                method = options.method;
            }
        }
        xhttp.open(method, url);
        xhttp.onload = function() {
            if (xhttp.status>=200 &&  xhttp.status<=400) {
                resolve(xhttp.response);
            }
            else {
                reject(xhttp.status)
            }
        }
        xhttp.onerror = (error) => {
            reject("request error", error);
        }
        if (options) {
            if (options.header) {
                for (let key in options.header) {
                    xhttp.setRequestHeader(key, options.header[key]);
                }
            }
            if (options.body) {
                console.log("this is body" + JSON.stringify(options.body));
                xhttp.send(JSON.stringify(options.body))
            } else {
                xhttp.send();
            }
        } else {
            xhttp.send();
        }

        // if (options.header) {
        //     for (let key in options.header) {
        //         xhttp.setRequestHeader(key, options.header[key]);
        //     }
        // }
        // if (options.body) {
        //     xhttp.send(JSON.stringify(options.body))
        // } else {
        //     xhttp.send();
        // }
    // })

})
}
const body = {
    name:"yan",
    email:"hello@gmail.com"
}

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//         .then(response => response.json())
//         .then(json => console.log(json))


// const XHR = (url, cb) => {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             // Typical action to be performed when the document is ready:
//             cb(xhttp.response);
//         }
//     };
//     xhttp.open("GET", url);
//     xhttp.send();
// };

// XHR("https://jsonplaceholder.typicode.com/todos/1", (data) => {
//     console.log(data, 1);
// })

myFetch('https://jsonplaceholder.typicode.com/posts/1', {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then((data) => {
    console.log('get: '+ data);
})
.catch((err) => {
    console.log(err);
});

myFetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: body
})
.then((data) => {
    console.log('put: '+ data);
})
.catch((err) => {
    console.log(err);
});

