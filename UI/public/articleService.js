const articleService = (function () {
    function getArticles(filter) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', '/getArticles');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                if(xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText, (key, value) => {
                        if(key === 'createdAt') return new Date(value);
                        return value;
                    }));
                else
                    reject();
            };
            xhr.onerror = () => reject(new Error('getArticles crashed'));
            xhr.send(JSON.stringify(filter));
        });
    }

    function getArticle(id) {
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/getArticle/${id}`);
            xhr.onload = () => xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject();
            xhr.onerror = () => reject(new Error('getArticle crashed'));
            xhr.send();
        });
    }

    function removeArticle(id) {
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/delete/${id}`);
            xhr.onload = () => xhr.status === 200 ? resolve() : reject();
            xhr.onerror = () => reject(new Error('removeArticle crashed'));
            xhr.send();
        });
    }

    function updateArticle(article) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', '/editArticle');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => xhr.status === 200 ? resolve() : reject();
            xhr.onerror = () => reject(new Error('removeArticle crashed'));
            xhr.send(JSON.stringify(article));
        });
    }

    function addArticle(article) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', '/addArticle');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => xhr.status === 200 ? resolve() : reject();
            xhr.onerror = () => reject(new Error('removeArticle crashed'));
            xhr.send(JSON.stringify(article));
        });
    }

    const validator = {
        title(title) {
            return Boolean(title) && typeof (title) === 'string' && title.length < 100;
        },
        summary(summary) {
            return Boolean(summary) && typeof (summary) === 'string' && summary.length < 200;
        },
        createdAt(createdAt) {
            return Boolean(createdAt) && createdAt instanceof Date;
        },
        author(author) {
            return Boolean(author) && typeof (author) === 'string';
        },
        content(content) {
            return Boolean(content) && typeof (content) === 'string';
        },
    };

    function validateArticle(article) {
        for (let field in validator) {
            if (!validator[field](article[field])) {
                return false;
            }
        }
        return true;
    }

    return {
        validateArticle,
        getArticles,
        getArticle,
        removeArticle,
        updateArticle,
        addArticle,
    };
}());