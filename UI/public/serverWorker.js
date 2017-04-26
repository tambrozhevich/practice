var serverWorker = (function () {
    function getArticles() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET","/getArticles", false);
        xhr.send();
        var articles = JSON.parse(xhr.responseText);
        articles.forEach(function (art) {
            art.createdAt = new Date(art.createdAt);
        });
        return articles;
    }

    function getArticle(id) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET","/getArticle/"+id,false);
        xhr.send();
        var article = JSON.parse(xhr.responseText);
        article.createdAt = new Date(article.createdAt);
        return article;
    }

    function removeArticle(id) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/delete/"+id,false);
        xhr.send();
    }
    return {
        getArticles:getArticles,
        getArticle:getArticle,
        removeArticle:removeArticle
    }
}());