const authorization = (function () {
    function isAuthorized() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/username');
            xhr.onload = () => xhr.status === 200 ? resolve(xhr.responseText) : reject();
            xhr.onerror = () => reject(new Error('getArticle crashed'));
            xhr.send();
        });
    }

    function logIn(user) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/login');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => xhr.status === 200 ? resolve(xhr.responseText) : reject();
            xhr.onerror = () => reject(new Error('getArticle crashed'));
            xhr.send(JSON.stringify(user));
        });
    }

    function logOut() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/logout');
            xhr.onload = () => xhr.status === 200 ? resolve() : reject();
            xhr.onerror = () => reject(new Error('getArticle crashed'));
            xhr.send();
        });
    }

    return {
        logIn,
        logOut,
        isAuthorized
    }
}());