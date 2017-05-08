const serverWorker = (function () {
    function getArticles() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/getArticles', false);
        xhr.send();
        const articles = JSON.parse(xhr.responseText);
        articles.forEach((art) => {
            art.createdAt = new Date(art.createdAt);
        });
        return articles;
    }

    function getArticle(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/getArticle/${id}`, false);
        xhr.send();
        const article = JSON.parse(xhr.responseText);
        article.createdAt = new Date(article.createdAt);
        return article;
    }

    function removeArticle(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/delete/${id}`, false);
        xhr.send();
    }
    function globalPost(articles) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(articles));
    }
    function updateArticle(article) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/newsEdit', false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(article));
    }
    function getFullArticle(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/news/' + id, false);
        xhr.send();
        const article = JSON.parse(xhr.responseText);
        article.CreatedAt = new Date(article.CreatedAt);
        return article;
    }
    function sendArticle(article) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(article));
    }
    return {
        getArticles,
        getArticle,
        removeArticle,
        globalPost,
        updateArticle,
        getFullArticle,
        sendArticle,
    };
}());
