'use strict';

const functionsService = (function () {

    function addNew(article, username) {
        const elem = document.createElement('div');
        elem.className = 'new';
        elem.id = article._id;
        elem.innerHTML =
            `${article.image ? `<img style="width: 100%; height: 200px; object-fit: cover;" src="${article.image}">` : ''
                }<h3>${article.title} </h3>` +
            `<p class="description" > ${article.summary}</p>` +
            '<p class="author"> ' + `Author: ${article.author} </p>` +
            `<p data-id="${article._id}" class="link" onclick="ui.openReadMoreForm(this.dataset.id);">Read more...</p>` +
            ' <div class="icons">' +
            `<button style="display:${username ? 'inline' : 'none'};" id="${elem.id}" class="icon1" onclick="ui.openEditForm(this.id);"> <img src="change1.png" width="15" height="18"></button>` +
            `<button style="display:${username ? 'inline' : 'none'};" id="${elem.id}" class="icon2" onclick="functionsService.delete(this.id);"> <img src="delete1.png" width="15" height="18"></button>` +
            '</div>';
        elem.style.width = '235px';
        elem.style.height = 'auto';
        return elem;
    }

    let filter = {};
    const newsOnPage = 3;
    let page = 0;

    function show(what) {
        const parentElem = document.getElementsByClassName('news')[0];
        parentElem.innerHTML = '';

        if (what === 'next')
            page++;
        if (what === 'prev')
            page--;

        articleService.getArticles({skip: page * newsOnPage, top: newsOnPage, filter}).then(
            articles => {
                if (articles.length < 3) {
                    document.querySelector('#show-more').style.display = 'none';
                } else document.querySelector('#show-more').style.display = '';

                if (page === 0) {
                    document.querySelector('#show-prev').style.display = 'none';
                } else document.querySelector('#show-prev').style.display = '';
                authorization.isAuthorized().then(
                    username => articles.forEach(item => parentElem.appendChild(addNew(item, username))),
                    nonAuthorized => articles.forEach(item => parentElem.appendChild(addNew(item)))
                );
            }
        );
    }

    function deleteNew(id) {
        articleService.removeArticle(id).then(ready => show());
    }

    function makeFilter() {
        let date = document.querySelector('input.menu').value;
        if (!date) date = undefined;
        else date = new Date(date);
        let author = document.querySelector('#by-author').value;
        if (!author) author = undefined;
        if (author === 'Select author') author = undefined;

        filter = filter || {};
        filter.createdAt = date;
        filter.author = author;

        page = 0;
        show();
    }


    function sign(user) {
        authorization.logIn(user).then(
            ready => {
                document.querySelector('#overlay').style.display = 'none';
                document.querySelector('#overlay').innerHTML = '';
                getUsername();
                functionsService.show();
            },
            reject => alert('incorrect')
        );
    }

    function signOut() {
        authorization.logOut().then(ready => getUsername());
    }

    function getUsername() {
        authorization.isAuthorized().then(
            username => {
                const button1 = document.querySelector('#user .pink.btn');
                const button2 = document.querySelector('#user .exit');
                button1.style.display = 'none';
                button2.style.display = 'inline';

                const userTemp = document.getElementById('USERNAME');
                userTemp.innerHTML = `<span>${username}</span>`;
                userTemp.style.display = 'block';

                const buttons = document.getElementsByClassName('icons');
                for (let i = 0; i < buttons.length; i++) {
                    buttons.item(i).style.display = 'inline';
                }

                const add = document.getElementsByClassName('add');
                add[0].style.display = 'inline';


            },
            nonAuthorized => {
                const button1 = document.querySelector('#user .pink.btn');
                const button2 = document.querySelector('#user .exit');
                button1.style.display = 'inline';
                button2.style.display = 'none';

                document.getElementById('USERNAME').style.display = 'none';

                const buttons = document.getElementsByClassName('icons');
                for (let i = 0; i < buttons.length; i++) {
                    buttons.item(i).style.display = 'none';
                }

                const add = document.getElementsByClassName('add');
                add[0].style.display = 'none';
            }
        )
    }

    function change(id, article) {
        const result = document.getElementById(article.id);
        if (result) {
            const temp = addNew(article);
            result.class = temp.class;
            result.innerHTML = temp.innerHTML;
        }
    }

    const AUTHORS = ['TUT.BY', 'Дмитрий Корсак', 'SPORT.TUT.BY', 'Никита Мелкозеров', 'Виталий Олехнович', 'Onliner.by', '42.TUT.BY', 'tambrozhevich'];

    function formSelection() {
        for (let i = 0; i < AUTHORS.length; i++) {
            const select = document.getElementById('by-author');
            const option = document.createElement('option');
            option.innerHTML = AUTHORS[i];
            select.appendChild(option);
        }
    }

    formSelection();

    function addSpecificNew(article) {
        article.createdAt = new Date();
        const result = document.getElementsByClassName('news');
        result[0].insertBefore(addNew(article), result[0].firstChild);
    }

    return {
        signOut,
        show,
        sign,
        getUsername,
        addArticle: addNew,
        addNewElem: addSpecificNew,
        select: formSelection,
        delete: deleteNew,
        change,
        makeFilter,
    };
}());

const ui = (function () {
    function openSignInForm() {
        const copy = document.querySelector('#sign-in-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)',
        }, {
            opacity: 1,
            transform: 'scale(1)',
        }], {
            duration: 200,
            easing: 'ease',
        });
    }

    function closeSignInForm() {
        const username = document.forms.signIn.login.value;
        const password = document.forms.signIn.password.value;
        functionsService.sign({username, password});
    }

    function openAddForm() {
        const copy = document.querySelector('#add-new-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)',
        }, {
            opacity: 1,
            transform: 'scale(1)',
        }], {
            duration: 200,
            easing: 'ease',
        });
    }

    function closeAddForm() {
        authorization.isAuthorized().then(
            username => {
                const article = {
                    title: document.forms.add.title.value,
                    summary: document.forms.add.summary.value,
                    createdAt: new Date(),
                    author: username,
                    content: document.forms.add.content.value,
                    image: document.forms.add.image.value,
                };
                if (articleService.validateArticle(article))
                    articleService.addArticle(article).then(
                        ready => {
                            document.querySelector('#overlay').innerHTML = '';
                            document.querySelector('#overlay').style.display = 'none';
                            functionsService.show();
                        }
                    );
                else
                    alert('incorrect');
            }
        );

    }

    function openEditForm(id) {
        const copy = document.querySelector('#edit-new-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)',
        }, {
            opacity: 1,
            transform: 'scale(1)',
        }], {
            duration: 200,
            easing: 'ease',
        });

        articleService.getArticle(id).then(
            article => {
                document.forms.edit.id = article._id;
                document.forms.edit.title.value = article.title;
                document.forms.edit.summary.value = article.summary;
                document.forms.edit.content.value = article.content;
                document.forms.edit.image.value = article.image;
            }
        );
    }

    function closeEditForm() {
        authorization.isAuthorized().then(
            username => {
                const article = {
                    _id: document.forms.edit.id,
                    title: document.forms.edit.title.value,
                    summary: document.forms.edit.summary.value,
                    createdAt: new Date(),
                    author: username,
                    content: document.forms.edit.content.value,
                    image: document.forms.edit.image.value,
                };
                if (articleService.validateArticle(article))
                    articleService.updateArticle(article).then(
                        ready => {
                            functionsService.show();
                            document.querySelector('#overlay').innerHTML = '';
                            document.querySelector('#overlay').style.display = 'none';
                        }
                    );
                else
                    alert('incorrect');
            }
        );
    }

    function openReadMoreForm(id) {
        const copy = document.querySelector('#read-more-form').content.cloneNode(true);
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('#overlay').appendChild(copy);
        document.querySelector('#overlay').firstElementChild.animate([{
            opacity: 0,
            transform: 'scale(0.9)',
        }, {
            opacity: 1,
            transform: 'scale(1)',
        }], {
            duration: 200,
            easing: 'ease',
        });
        articleService.getArticle(id).then(
            article => {
                document.forms.read.querySelector('img').src = article.image;
                document.forms.read.querySelector('h1').innerText = article.title;
                document.forms.read.querySelector('h2').innerText = article.summary;
                document.forms.read.querySelector('p').innerText = article.content;
            }
        );
    }

    function close() {
        document.querySelector('#overlay').innerHTML = '';
        document.querySelector('#overlay').style.display = 'none';
    }

    document.querySelector('#overlay').addEventListener('click', (event) => {
        if (event.target === document.querySelector('#overlay')) {
            close();
        }
    });

    return {
        openSignInForm,
        closeSignInForm,
        openAddForm,
        closeAddForm,
        openEditForm,
        closeEditForm,
        openReadMoreForm,
        close,
    };
}());


document.addEventListener('DOMContentLoaded', () => {
    functionsService.show();
    functionsService.getUsername();
});