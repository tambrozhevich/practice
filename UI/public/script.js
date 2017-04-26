'uses strict'

var username = null;


var articlesService = (function () {


    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        var sortedArticles = serverWorker.getArticles().slice();

        if (filterConfig) {
            if (filterConfig.author) {
                sortedArticles = sortedArticles.filter(x => x.author === filterConfig.author);
            }
            if (filterConfig.dateFrom) {
                sortedArticles = sortedArticles.filter(x => x.createdAt >= filterConfig.dateFrom);
            }
        }
        return sortedArticles.splice(skip, top);
    }

    var validator = {
        id: function (id) {
            return Boolean(id) && typeof(id) === 'string';
        },
        title: function (title) {
            return Boolean(title) && typeof(title) === 'string' && title.length < 100;
        },
        summary: function (summary) {
            return Boolean(summary) && typeof(summary) === 'string' && summary.length < 200;
        },
        createdAt: function (createdAt) {
            return Boolean(createdAt) && createdAt instanceof Date;
        },
        author: function (author) {
            return Boolean(author) && typeof(author) === 'string';
        },
        content: function (content) {
            return Boolean(content) && typeof(content) === 'string';
        }
    };

    function validateArticle(article) {
        for (field in validator) {
            if (!validator[field](article[field])) {
                return false;
            }
        }
        return true;
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            articles.push(article);
            return true;
        } else
            return false;
    }

    function editArticle(id, article) {
        var amendArticle;
        amendArticle = serverWorker.getArticle(id);
        var index = articles.indexOf(amendArticle);
        if (article.title != null) {
            amendArticle.title = article.title;
        }
        if (article.summary != null) {
            amendArticle.summary = article.summary;
        }
        if (article.content != null) {
            amendArticle.content = article.content;
        }
        if (!validateArticle(amendArticle))
            return false;
        Object.assign(article, amendArticle)
        articles[index] = article;
        functionsService.change(articles[index].id, articles[index]);
        return true;
    }

    return {
        getArticles: getArticles,
        add: addArticle,
        edit: editArticle,
        size: function () {
            return serverWorker.getArticles().length;
        }
    };
}());

var functionsService = (function () {
    var id = 1;

    var range = {
        skip: 0,
        top: 3
    };

    function addNew(id) {
        var article = serverWorker.getArticle(id);
        if (!article)
            return false;
        var elem = document.createElement('div');
        elem.className = "new";
        elem.id = id;
        elem.innerHTML =
            (Boolean(article.image) ? '<img style="width: 100%; height: 200px; object-fit: cover;" src="' + article.image + '">' : '') +
            '<h3>' + article.title + ' </h3>' +
            '<p class="description" > ' + article.summary + '</p>' +
            '<p class="author"> ' + 'Author: ' + article.author + ' </p>' +
            '<p class="link" href="" onclick="ui.openReadMoreForm(' + id + ');">Read more...</p>' +
            ' <div class="icons">' +
            '<button style="display:' + (username ? 'inline' : 'none') + ';" id="' + elem.id + '" class="icon1" onclick="ui.openEditForm(this.id);"> <img src="change1.png" width="15" height="18"></button>' +
            '<button style="display:' + (username ? 'inline' : 'none') + ';" id="' + elem.id + '" class="icon2" onclick="functionsService.delete(this.id);"> <img src="delete1.png" width="15" height="18"></button>' +
            '</div>';
        id++;
        elem.style.width = '235px';
        elem.style.height = 'auto';
        return elem;
    }

    function deleteNew(id) {
        serverWorker.removeArticle(id);
        show();
    }

    var currentFilter = {};
    var len = articlesService.size();

    function filter() {
        var date = document.querySelector('input.menu').value;
        if (!date) date = undefined;
        else date = new Date(date);
        var author = document.querySelector('#by-author').value;
        if (!author) author = undefined;
        if (author === 'Select author') author = undefined;

        currentFilter = currentFilter || {};
        currentFilter.dateFrom = date;
        currentFilter.author = author;

        range.skip = 0;
        len = articlesService.getArticles(0, articlesService.size(), currentFilter).length;
        show();
    }

    function show(what) {
        var parentElem = document.getElementsByClassName("news")[0];
        parentElem.innerHTML = '';

        if (what === 'next') {
            range.skip = Math.min(len, range.skip + 3);
        }
        if (what === 'prev') {
            range.skip = Math.max(0, range.skip - 3);
        }
        var elem = articlesService.getArticles(range.skip, range.top, currentFilter);

        if (len <= range.skip + range.top) {
            document.querySelector('#show-more').style.display = 'none';
        } else document.querySelector('#show-more').style.display = '';

        if (range.skip === 0) {
            document.querySelector('#show-prev').style.display = 'none';
        } else document.querySelector('#show-prev').style.display = '';

        for (field in elem) {
            parentElem.appendChild(addNew(elem[field].id));
        }
    }

    function sign(password) {
        if (username && users[username] === password) {
            var button1 = document.querySelector('#user .pink.btn');
            var button2 = document.querySelector('#user .exit');
            button1.style.display = 'none';
            button2.style.display = 'inline';

            var userTemp = document.getElementById('USERNAME');
            userTemp.innerHTML = '<span>' + username + '</span>';
            userTemp.style.display = 'block';

            var buttons = document.getElementsByClassName("icons");
            for (var i = 0; i < buttons.length; i++) {
                buttons.item(i).style.display = "inline";
            }

            var add = document.getElementsByClassName("add");
            add[0].style.display = "inline";
            return true;
        } else if (!username) {
            var button1 = document.querySelector('#user .pink.btn');
            var button2 = document.querySelector('#user .exit');
            button1.style.display = 'inline';
            button2.style.display = 'none';

            document.getElementById("USERNAME").style.display = 'none';

            var buttons = document.getElementsByClassName("icons");
            for (var i = 0; i < buttons.length; i++) {
                buttons.item(i).style.display = "none";
            }

            var add = document.getElementsByClassName("add");
            add[0].style.display = "none";

        } else {
            alert('incorrect');
        }
        return false;
    }

    function change(id, article) {
        var result = document.getElementById(article.id);
        if (result != null) {
            var temp = addNew(article);
            result.class = temp.class;
            result.innerHTML = temp.innerHTML;
        }
    }

    var AUTHORS = ['TUT.BY', 'Дмитрий Корсак', 'SPORT.TUT.BY', 'Никита Мелкозеров', 'Виталий Олехнович', 'Onliner.by', '42.TUT.BY', 'tambrozhevich'];

    function formSelection() {
        for (var i = 0; i < AUTHORS.length; i++) {
            var select = document.getElementById('by-author');
            var option = document.createElement('option');
            option.innerHTML = AUTHORS[i];
            select.appendChild(option);
        }
    }

    formSelection();

    function addSpecificNew(article) {
        article.createdAt = new Date();
        var result = document.getElementsByClassName('news');
        result[0].insertBefore(addNew(article), result[0].firstChild);
    }

    return {
        show: show,
        sign: sign,
        add: addNew,
        addNewElem: addSpecificNew,
        select: formSelection,
        delete: deleteNew,
        change: change,
        filter: filter
    };

}());

var ui = (function () {
    function openSignInForm() {
        var copy = document.querySelector('#sign-in-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)'
        }, {
            opacity: 1,
            transform: 'scale(1)'
        }], {
            duration: 200,
            easing: 'ease'
        });
    }

    function closeSignInForm() {
        username = document.forms.signIn.login.value;
        password = document.forms.signIn.password.value;
        if (functionsService.sign(password)) {
            document.querySelector('#overlay').style.display = 'none';
            document.querySelector('#overlay').innerHTML = '';
            functionsService.show();
        }
    }

    function openAddForm() {
        var copy = document.querySelector('#add-new-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)'
        }, {
            opacity: 1,
            transform: 'scale(1)'
        }], {
            duration: 200,
            easing: 'ease'
        });
    }

    function closeAddForm() {
        var article = {
            id: '' + new Date().getTime(),
            title: document.forms.add.title.value,
            summary: document.forms.add.summary.value,
            createdAt: new Date(),
            author: username,
            content: document.forms.add.content.value,
            image: document.forms.add.image.value
        };
        if (articlesService.add(article)) {
            document.querySelector('#overlay').innerHTML = '';
            document.querySelector('#overlay').style.display = 'none';
            functionsService.show();
        } else {
            alert('incorrect');}
    }

    function openEditForm(id) {
        var copy = document.querySelector('#edit-new-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)'
        }, {
            opacity: 1,
            transform: 'scale(1)'
        }], {
            duration: 200,
            easing: 'ease'
        });

        var article = articlesService.getOne(id);
        document.forms.edit.id = id;
        document.forms.edit.title.value = article.title;
        document.forms.edit.summary.value = article.summary;
        document.forms.edit.content.value = article.content;
        document.forms.edit.image.value = article.image;

    }

    function closeEditForm() {
        var article = {
            id: document.forms.edit.id,
            title: document.forms.edit.title.value,
            summary: document.forms.edit.summary.value,
            createdAt: new Date(),
            author: username,
            content: document.forms.edit.content.value,
            image: document.forms.edit.image.value
        };
        if (articlesService.edit(article.id, article)) {
            functionsService.show();
            document.querySelector('#overlay').innerHTML = '';
            document.querySelector('#overlay').style.display = 'none';
        } else {
            alert("incorrect");
        }
    }

    function openReadMoreForm(id) {
        var copy = document.querySelector('#read-more-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)'
        }, {
            opacity: 1,
            transform: 'scale(1)'
        }], {
            duration: 200,
            easing: 'ease'
        });
        var article = articlesService.getOne(id);
        document.forms.read.querySelector('img').src = article.image;
        document.forms.read.querySelector('h1').innerText = article.title;
        document.forms.read.querySelector('h2').innerText = article.summary;
        document.forms.read.querySelector('p').innerText = article.content;
    }

    function close() {
        document.querySelector('#overlay').innerHTML = '';
        document.querySelector('#overlay').style.display = 'none';
    }

    document.querySelector('#overlay').addEventListener('click', function (event) {
        if (event.target === document.querySelector('#overlay')) {
            close();
        }
    });

    return {
        openSignInForm: openSignInForm,
        closeSignInForm: closeSignInForm,
        openAddForm: openAddForm,
        closeAddForm: closeAddForm,
        openEditForm: openEditForm,
        closeEditForm: closeEditForm,
        openReadMoreForm: openReadMoreForm,
        close: close
    }
})();
