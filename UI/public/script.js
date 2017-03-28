'uses strict'

var username = null;

var users = {
    'user': 'password',
    'tambrozhevich': 'ambr',
    'Yana': 'yana',
    'Vladislav': 'vladislav'
};

var articlesService = (function () {

    var articles = [{
        "id": "2",
        "title": "6 марта в Беларуси ожидаются дожди",
        "summary": "В Беларуси 6 марта будет облачно с прояснениями, на большей части территории пройдут дожди.",
        "createdAt": "2017-02-28T06:00:00.000Z",
        "author": "TUT.BY",
        "content": "В северных районах страны возможен мокрый снег, слабый гололед, на отдельных участках дорог гололедица.",
        "image":"http://www.telefakt.ru/upload/information_system_1/1/9/8/item_19896/information_items_19896.jpg"
    }, {
        "id": "5",
        "title": "Белорусские биатлонистки заняли 10-е место",
        "summary": "Женская сборная Беларуси по биатлону заняла десятое место в эстафете на этапе Кубка мира в южнокорейском Пхенчхане.",
        "createdAt": "2017-02-27T13:24:00.000Z",
        "author": "SPORT.TUT.BY",
        "content": "С самого начала гонка для нашей команды складывалась не лучшим образом. Скардино трижды прибегнула к дополнительным патронам и передала эстафету лишь 16-й. Ирина Кривко также три раза  промахнулась и свой этап завершила на 15-м месте, причем отставание составляло уже более двух минут. Дарья Юркевич сделала два неточных выстрела. Дарья Домрачева приняла эстафету 16-й, стреляла точно и смогла  финишировать на 10-м месте. Отставание нашей сборной составило две минуты и семь секунд.",
        "image": "https://i.ytimg.com/vi/O5NiZfkC2iE/maxresdefault.jpg"
    }, {
        "id": "6",
        "title": "Трамп обвинил Обаму в прослушке его телефонов во время предвыборной гонки",
        "summary": "Президент США Дональд Трамп обвинил бывшего главу гос-ва Барака Обаму в том, что тот прослушивал его телефоны в октябре 2016 года.",
        "createdAt": "2017-02-27T13:07:00.000Z",
        "author": "TUT.BY",
        "content": "«Ужасно! Только что узнал, что Обама прослушивал мои разговоры в Trump Tower незадолго до победы [на выборах].Ничего не нашли», — написал Трамп и задался вопросом, законно ли то, что действующий президент занимался прослушкой во время предвыборной кампании.",
        "image": "http://img2.ntv.ru/home/news/20161110/trump_obama_no_vs.jpg"
    }, {
        "id": "7",
        "title": "Ла-Ла Ленд взял шесть 'Оскаров'",
        "summary": "В Лос-Анджелесе состоялась 89-я церемония вручения наград Американской академии киноискусств. ",
        "createdAt": "2017-02-27T17:03:00.000Z",
        "author": "TUT.BY",
        "content": "Пусть «Ла-Ла Ленд» и не взял рекордные 14 статуэток, но победа в шести номинациях тоже о многом говорит. В финале церемонии случился забавный казус, который наверняка будут обсуждать активнее, чем победителей.",
        "image": "http://www.cinematicsound.net/wordpress/wp-content/uploads/2017/01/la-la-land-banner.jpg?w=640"
    }, {
        "id": "8",
        "title": "В США акции сторонников и противников Трампа переросли в столкновения",
        "summary": "В десятках городов США состоялись акции под общим названием «Марш за Трампа».",
        "createdAt": "2017-02-27T19:09:00.000Z",
        "author": "TUT.BY",
        "content": "На улицы вышли и его противники. В нескольких случаях шествия переросли в столкновения групп демонстрантов.По данным организаторов, шествия в поддержку Дональда Трампа прошли примерно в 50 городах.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Donald_Trump_official_portrait_%28crop%29.jpg/250px-Donald_Trump_official_portrait_%28crop%29.jpg"
    }, {
        "id": "9",
        "title": "В Литве установят сирены на случай чрезвычайных ситуаций на БелАЭС ",
        "summary": "Сирены собираются установить в Вильнюсе и Вильнюсском районе, всего в 150 местах,которые находятся от АЭС примерно в 50 километрах.",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "TUT.BY",
        "content": "Белорусская АЭС строится по проекту АЭС-2006 с реакторами типа ВВЭР-1200.Стройплощадка находится в 18 км от Островца в Гродненской области в 50 километрах от столицы Литвы.АЭС будет состоять из двух энергоблоков суммарной мощностью до 2400 (2×1200) МВт. Первый энергоблок планируется ввести в эксплуатацию в 2019 году, второй — в 2020-м.Правительство Литвы утверждает, что БелАЭС возводится с нарушениями стандартов безопасности. Минск эти упреки отвергает.",
        "image": "https://img.tyt.by/620x620s/n/brushko/0f/2/belaes_17022016_tutby_brush_phsl_img_37.jpg"
    }, {
        "id": "10",
        "title": "Стань самой спортивной девушкой Onliner.by и выиграй отпуск на Кипре",
        "summary": "Да, это Беларусь, страна симпатичных, улыбчивых и физически развитых людей. Ввиду наступившей и даже отчасти состоявшейся весны Onliner.by объявляет конкурс красоты, красоты женской.",
        "createdAt": "2017-02-28T08:40:00.000Z",
        "author": "42.TUT.BY",
        "content": "Девушки, ну вы же не зря хорошели всю зиму от тренажерки, фитнеса и прочих полезных для здоровья и внешности вещей?!   Не надо стесняться. Настало время показать себя!",
        "image": "http://upgradebody.ru/wp-content/uploads/2015/05/devushka-s-gantelyami.jpg"
    }, {
        "id": "12",
        "title": "Журналист Onliner.by Никита Мелкозеров: почему меня бесят 8 Марта и 23 Февраля ",
        "summary": "Никита Мелкозеров — журналист Onliner.by, который искренне считает, что конец февраля и начало марта  превращаются в фестиваль маразма из-за гендерных праздников.",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "Дмитрий Корсак",
        "content": "Уверен, чтобы дарить женщинам цветы, можно найти три миллиарда поводов, и 8 Марта для этого вообще не нужно.Жизнь у нас — касается гендерных праздников — такая, что женщины делают тебе какой-то подарок на 23 Февраля и как будто принуждают к взаимности.А все последующие попытки гармонизации связаны с не самым нужным в этой жизни напрягом.И этот порочный круг никак не получается разорвать аж со школы.",
        "image": "http://usiter.com/uploads/20131108/+prazdnik+podarok+podarochek+korobka+57543606847.jpg"
    }, {
        "id": "13",
        "title": "Стрим из гроба: погребенный заживо британец стримит из могилы",
        "summary": "Дублинец Джон Эдвардс решил на три дня заключить себя в гробу, чтобы привлечь внимание к проблемам наркоманиии самоубийств.",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "Виталий Олехнович",
        "content": "В могилу Джона положили 1 марта, и сегодня его захоронение должно закончиться, однако британец продолжаетвести онлайн-стрим из гроба, параллельно консультируя наркоманов и близких к суициду особ, которые могут дозвониться ему по телефону горячей линии.",
        "image": "https://i.ytimg.com/vi/9_wTYQJp4Yo/maxresdefault.jpg"
    }, {
        "id": "15",
        "title": "В России создали лекарство от всех видов рака",
        "summary": "Российские СМИ сообщили о завершении доклинических испытаний лекарства, которой способно совершить революцию в онкологии.",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "Виталий Олехнович",
        "content": "Лекарство удалось получить с помощью биотехнологий и эксперимента на МКС в 2015 году по выращиванию сверхчистого кристалла. Лекарство было опробовано на мышах и крысах, у которых развивались меланомы и саркомы. Пациентам оно станет доступно через три-четыре года, пока пройдут все доклинические испытания.Впрочем, многое будет зависеть от финансирования программы.",
        "image": "http://lgotyinfo.ru/wp-content/uploads/2015/04/spisok-besplatnyx-lekarstv.jpg"
    }, {
        "id": "16",
        "title": "Самые ожидаемые игры весны 2017 года",
        "summary": "Прошедшей зимой вышло не так уж много действительно интересных и громких проектов.Некоторые из игр вызвали разочарование, другие в целом оправдали ожидания. ",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "Onliner.by",
        "content": " The Last Guardian оказалась неплохим приключением (хоть и скучным) и привлекла к себе внимание, кроме прочего, тем, что в разработке она находилась долгие девять лет. Resident Evil 7: Biohazard  восприняли кто как: некоторым страшилка показалась неканоничной, другим — свежей и интересной.",
        "image": "http://u.kanobu.ru/longreads/2016/2/29/3b4b0a5c-1a06-4507-a400-b2c05cd0c015.jpg"
    }, {
        "id": "17",
        "title": "Bloomberg представил топ-500 богатейших людей планеты. Белорусов среди них пока нет",
        "summary": " Самый богатый белорус - это 40-летний создатель онлайн-игры World of Tanks Виктор Кислый",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "TUT.BY",
        "content": "В феврале 2016-го пополнил список долларовых миллиардеров Bloomberg, но пока «отстает» от замыкающего топ-500 96-летнего миллиардера из Саудовской Аравии Сулеймана аль Раджи более чем на 2 млрд долларов.Возглавил рейтинг основатель Microsoft Билл Гейтс (85,6 млрд долларов), на втором месте — американский бизнесмен Уоррен Баффет (78,9 млрд), на третьем — глава Amazon Джефф Безос (73,5 млрд).",
        "image": "http://www.istok-spb.info/wp-content/uploads/2016/06/raznye-dengi.jpg"
    }, {
        "id": "18",
        "title": "Российский хоккеист НХЛ хитро реализовал буллит без броска",
        "summary": "Российский форвард «Тампы» Никита Кучеров принес победу своей команде в поединке против «Баффало», хитро реализовав послематчевый буллит. Ему удалось отправить шайбу в сетку, даже не исполнив броска.",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "SPORT.TUT.BY",
        "content": "Сблизившись с голкипером, Никита Кучеров сделал обманное движение, как будто собираясь переложить шайбуна неудобную сторону крюка, но не стал ее касаться, и снаряд неспешно проскользнул в сетку под не ожидавшим такого трюка шведским вратарем Робином Ленером.",
        "image": "http://fizkultura-na5.ru/images/futbol/1346930685_hokkey-1.jpg"
    }, {
        "id": "19",
        "title": "Едим на ночь: 8 продуктов для ужина, которые помогут сбросить вес",
        "summary": "Многие до сих пор уверены: для того чтобы похудеть, нельзя есть после 18 00.",
        "createdAt": "2017-02-28T08:55:00.000Z",
        "author": "Onliner.by",
        "content": "Но специалисты в области питания опровергают данное утверждение, ведь это слишком усредненные цифры. Правильнее есть примерно за 2 часа до сна. Так вы не успеете проголодаться и легко уснете, не совершив в последний момент набег на холодильник.",
        "image": "http://builderbody.ru/wp-content/uploads/2016/06/9-1.jpg"
    }, {
        "id": "1490549982200",
        "title": "В Минск едет рэпер Хаски, про которого говорят все",
        "summary": "В апреле, 21-го числа, в Минске впервые выступит российский рэпер Хаски. Это артист, о котором говорят более-менее все. Уроженец Бурятии Дмитрий Кузнецов записывается под псевдонимом Хаски. ",
        "createdAt": "2017-03-26T17:39:42.200Z",
        "author": "tambrozhevich",
        "content": "За 2016-й он выпустил всего пару песен, но их хватило, чтобы выстрелить на весь русскоязычный интернет. За посещение концерта человека, которого называют «Drake наоборот», надо будет заплатить в районе 20 рублей.\n\nВыступит Хаски в клубе Burlesque, который расположен на улице Октябрьской, 5. Первые 100 билетов стоят 15 рублей. Остальные — по 20, говорится в официальной группе концерта в Facebook. Программа называется «Дорогая редакция». Хаски будет презентовать альбом «Любимые песни (воображаемых) людей».",
        "image": "https://i.ytimg.com/vi/kuTAoRaKTYw/maxresdefault.jpg"
    }, {
        "id": "1490551172779",
        "title": "Топ-5 книг по психологии отношений",
        "summary": "В книжных магазинах и на просторах интернета можно найти огромное количество книг по психологии отношений а-ля «10 способов покорить сердце мужчины», «Как стать женщиной мечты» и т.д.",
        "createdAt": "2017-03-26T17:59:32.779Z",
        "author": "tambrozhevich",
        "content": "Мэтью Хасси — мегапопулярный в Великобритании и США коуч по отношениям, заслуживший звание «живого Хитча». Хасси разработал собственную программу Get the Guy, которая помогла миллионам женщин со всего мира найти своего мужчину. Чуть ли не на каждой странице предлагается конкретный метод, который позволит любой женщине стать более уверенной в себе и — цитируем — «настоящей мечтой для любого представителя сильного пола человечества». Чем отличается Хасси от сотен таких же коуч-терапевтов, которых в Штатах на каждом шагу?",
        "image": "http://muftiyat.kg/sites/default/files/photo/1439205322.jpg"
    }, {
        "id": "1490552218689",
        "title": "9 правил моего счастья",
        "summary": "«Женское счастье - был бы милый рядом, ну, а больше ничего не надо!», -  пела Татьяна Овсиенко. Но какое-то странное получается счастье. Если милого нет, то и счастья нет?",
        "createdAt": "2017-03-26T18:16:58.689Z",
        "author": "tambrozhevich",
        "content": "Что такое счастье для меня? 1. Не строить ожиданий Если желаемое не складывается, то можно придумать другие варианты. Реакция зависит от полученных эмоций, потому лучший выход  -  сформировать любопытство и определить дальнейшее положительное развитие событий. 2. Делать себя счастливой каждый день Сначала наполняю свой сосуд, затем делюсь с другими. Я такая, какая есть, принимаю себя. Если что-то идет не так, то это означает «временно». Самое лучшее себе: красивая орхидея для подруги, только тогда, когда она есть у меня. 3. Знать свои “хотелки” и желания Если хочется петь, пою. Танцевать – танцую.",
        "image": "https://rebenok.by/pics/image/pexels-photo-216983.jpeg"
    }];

    var ls = JSON.parse(localStorage.getItem('data'));
    if (!ls)
        localStorage.setItem('data', JSON.stringify(articles));
    else {
        articles = ls;
        for (var a of articles) {
            a.createdAt = new Date(a.createdAt);
        }
    }

    window.addEventListener('beforeunload', function () {
        localStorage.setItem('data', JSON.stringify(articles));
    });


    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        var sortedArticles = articles.slice();

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

    function getArticle(id) {
        var article = articles.find(function (item) {
            return item.id == id;
        });
        return article;
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
        amendArticle = getArticle(id);
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

    function removeArticle(id) {
        var index = articles.indexOf(getArticle(id));
        articles.splice(index, 1);
    }

    return {
        getArticles: getArticles,
        getOne: getArticle,
        add: addArticle,
        edit: editArticle,
        remove: removeArticle,
        size: function () {
            return articles.length;
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
        var article = articlesService.getOne(id);
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
        articlesService.remove(id);
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
        document.getElementsByClassName('news')[0].innerHTML = '';

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
