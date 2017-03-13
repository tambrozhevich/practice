var username = null;

var articlesService = (function () {

    var articles = [{
        id: "1",
        title: "В БГЭУ выбрали самую красивую студентку",
        summary: "Традиционно женский нархоз разыграл титул своей самой красивой студентки. " +
        "Пятничным вечером девять девушек сноровисто меняли платья, аккуратно вышагивали на шпильках высотой с небоскреб.",
        createdAt: new Date("2017-02-28T08:00:00+03:00"),
        author: "Onliner.by",
        content: " Девушек девять. Они представляют разные факультеты, аббревиатуры которых могут быть понятны только местным." +
        " На сцену выходит Марта Колб с факультета менеджмента. Сразу говорит, что она папина дочка: с 12 лет водит машину " +
        "и умеет забивать гвозди. Все аплодируют ее силе и независимости.В итоге главный приз" +
        " из его рук получила Марта Колб. Девушка настолько не ожидала успеха, что расплакалась прямо как в телевизоре. " +
        "Потом сказала, мол, очень сильно переживала и на репетициях даже лила слезы от перенапряжения." +
        "Девушка родом из Пинска. Пока неизвестно, вернется ли она на Полесье после учебы. Хотя это и неважно."
    }, {
        id: "2",
        title: "6 марта в Беларуси ожидаются дожди",
        summary: "В Беларуси 6 марта будет облачно с прояснениями, на большей части территории пройдут дожди." +
        "В северных районах страны возможен мокрый снег, слабый гололед, на отдельных участках дорог гололедица.",
        createdAt: new Date("2017-02-28T09:00:00+03:00"),
        author: "TUT.BY",
        content: " В северных районах страны возможен мокрый снег, слабый гололед, на отдельных участках дорог гололедица."
    }, {
        id: "3",
        title: "Прыгун в высоту принес Беларуси третью медаль на ЧЕ-2017 ",
        summary: "Белорусский прыгун в высоту 20-летний Павел Селиверстов принес Беларуси третью медаль " +
        "на чемпионате Европы по легкой атлетике в помещении, который проходит в Белграде.",
        createdAt: new Date("2017-02-28T09:40:00+03:00"),
        author: "SPORT.TUT.BY",
        content: " Лучшим результатом белоруса стала высота 2,27 м, и этого показателя хватило для бронзовой награды."
    }, {
        id: "4",
        title: "В Минске прошел торжественный марш подразделений МВД",
        summary: "Торжественный марш подразделений Министерства внутренних дел, посвященный 100-летию белорусской милиции," +
        " прошел сегодня в Минске на Октябрьской площади.",
        createdAt: new Date("2017-02-27T18:24:00+03:00"),
        author: "Onliner.by",
        content: " Всего в этом мероприятии было задействовано более 1,2 тыс. сотрудников различных подразделений МВД." +
        " Также в параде участвовало 46 единиц техники — современных машин и ретроавтомобилей."
    }, {
        id: "5",
        title: "Белорусские биатлонистки заняли 10-е место в эстафете на этапе Кубка мира",
        summary: "Женская сборная Беларуси по биатлону заняла десятое место в эстафете на этапе Кубка мира в южнокорейском Пхенчхане.",
        createdAt: new Date("2017-02-27T16:24:00+03:00"),
        author: "SPORT.TUT.BY",
        content: "С самого начала гонка для нашей команды складывалась не лучшим образом." +
        " Скардино трижды прибегнула к дополнительным патронам и передала эстафету лишь 16-й. Ирина Кривко также три раза " +
        " промахнулась и свой этап завершила на 15-м месте, причем отставание составляло уже более двух минут." +
        " Дарья Юркевич сделала два неточных выстрела. Дарья Домрачева приняла эстафету 16-й, стреляла точно и смогла " +
        " финишировать на 10-м месте. Отставание нашей сборной составило две минуты и семь секунд."
    }, {
        id: "6",
        title: "Трамп обвинил Обаму в прослушке его телефонов во время предвыборной гонки",
        summary: "Президент США Дональд Трамп обвинил бывшего главу гос-ва Барака Обаму в том, что тот прослушивал его " +
        "телефоны в октябре 2016 года.",
        createdAt: new Date("2017-02-27T16:07:00+03:00"),
        author: "TUT.BY",
        content: "«Ужасно! Только что узнал, что Обама прослушивал мои разговоры в Trump Tower незадолго до победы [на выборах]." +
        "Ничего не нашли», — написал Трамп и задался вопросом, законно ли то, что действующий президент " +
        "занимался прослушкой во время предвыборной кампании."
    }, {
        id: "7",
        title: "Ла-Ла Ленд взял шесть 'Оскаров'",
        summary: "В Лос-Анджелесе состоялась 89-я церемония вручения наград Американской академии киноискусств. ",
        createdAt: new Date("2017-02-27T20:03:00+03:00"),
        author: "TUT.BY",
        content: "Пусть «Ла-Ла Ленд» и не взял рекордные 14 статуэток, но победа в шести номинациях тоже о многом говорит. " +
        "В финале церемонии случился забавный казус, который наверняка будут обсуждать активнее, чем победителей."
    }, {
        id: "8",
        title: "В США акции сторонников и противников Трампа переросли в столкновения",
        summary: "В десятках городов США состоялись акции под общим названием «Марш за Трампа».",
        createdAt: new Date("2017-02-27T22:09:00+03:00"),
        author: "TUT.BY",
        content: "На улицы вышли и его противники. В нескольких случаях шествия переросли в столкновения групп демонстрантов." +
        "По данным организаторов, шествия в поддержку Дональда Трампа прошли примерно в 50 городах."
    }, {
        id: "9",
        title: "В Литве установят сирены на случай чрезвычайных ситуаций на БелАЭС ",
        summary: "Сирены собираются установить в Вильнюсе и Вильнюсском районе, всего в 150 местах," +
        "которые находятся от АЭС примерно в 50 километрах.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "TUT.BY",
        content: "Белорусская АЭС строится по проекту АЭС-2006 с реакторами типа ВВЭР-1200." +
        "Стройплощадка находится в 18 км от Островца в Гродненской области в 50 километрах от столицы Литвы." +
        "АЭС будет состоять из двух энергоблоков суммарной мощностью до 2400 (2×1200) МВт." +
        " Первый энергоблок планируется ввести в эксплуатацию в 2019 году, второй — в 2020-м." +
        "Правительство Литвы утверждает, что БелАЭС возводится с нарушениями стандартов безопасности. Минск эти упреки отвергает."
    }, {
        id: "10",
        title: "Стань самой спортивной девушкой Onliner.by и выиграй отпуск на Кипре",
        summary: "Да, это Беларусь, страна симпатичных, улыбчивых и физически развитых людей. Ввиду наступившей и даже " +
        "отчасти состоявшейся весны Onliner.by объявляет конкурс красоты, красоты женской.",
        createdAt: new Date("2017-02-28T11:40:00+03:00"),
        author: "42.TUT.BY",
        content: "Девушки, ну вы же не зря хорошели всю зиму от тренажерки, фитнеса и прочих полезных для здоровья и внешности вещей?! " +
        "  Не надо стесняться. Настало время показать себя!"
    }, {
        id: "11",
        title: "В Литве установят сирены на случай чрезвычайных ситуаций на БелАЭС ",
        summary: "Сирены собираются установить в Вильнюсе и Вильнюсском районе, всего в 150 местах," +
        "которые находятся от АЭС примерно в 50 километрах.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Никита Мелкозеров",
        content: "Белорусская АЭС строится по проекту АЭС-2006 с реакторами типа ВВЭР-1200." +
        "Стройплощадка находится в 18 км от Островца в Гродненской области в 50 километрах от столицы Литвы." +
        "АЭС будет состоять из двух энергоблоков суммарной мощностью до 2400 (2×1200) МВт." +
        " Первый энергоблок планируется ввести в эксплуатацию в 2019 году, второй — в 2020-м." +
        "Правительство Литвы утверждает, что БелАЭС возводится с нарушениями стандартов безопасности. Минск эти упреки отвергает."
    }, {
        id: "12",
        title: "Журналист Onliner.by Никита Мелкозеров: почему меня бесят 8 Марта и 23 Февраля ",
        summary: "Никита Мелкозеров — журналист Onliner.by, который искренне считает, что конец февраля и начало марта " +
        " превращаются в фестиваль маразма из-за гендерных праздников.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Дмитрий Корсак",
        content: "Уверен, чтобы дарить женщинам цветы, можно найти три миллиарда поводов, и 8 Марта для этого вообще не нужно." +
        "Жизнь у нас — касается гендерных праздников — такая, что женщины делают тебе какой-то подарок на 23 Февраля и как " +
        "будто принуждают к взаимности." +
        "А все последующие попытки гармонизации связаны с не самым нужным в этой жизни напрягом." +
        "И этот порочный круг никак не получается разорвать аж со школы."
    }, {
        id: "13",
        title: "Стрим из гроба: погребенный заживо британец стримит из могилы",
        summary: "Дублинец Джон Эдвардс решил на три дня заключить себя в гробу, чтобы привлечь внимание к проблемам наркомании" +
        "и самоубийств.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Виталий Олехнович",
        content: "В могилу Джона положили 1 марта, и сегодня его захоронение должно закончиться, однако британец продолжает" +
        "вести онлайн-стрим из гроба, параллельно консультируя наркоманов и близких к суициду особ, которые могут дозвониться" +
        " ему по телефону горячей линии."
    }, {
        id: "14",
        title: "В Минске представили уникальные бриллианты отечественного производства",
        summary: "Презентация состоялась в торговом центре «Галерея Минск», на территории ювелирного магазина «7 карат». " +
        "По словам организаторов, благодаря уникальным технологиям в Беларуси удалось создать идентичные природным условия, " +
        "позволяющие выращивать высококачественные алмазы.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Дмитрий Корсак",
        content: "Отечественные бриллианты по своим характеристикам и свойствам не отличаются от природных, определить разницу возможно" +
        "лишь в специальных лабораторных условиях. В мире есть не более пяти компаний, которым удалось" +
        " вырастить алмазы, сходные с белорусскими."
    }, {
        id: "15",
        title: "В России создали лекарство от всех видов рака",
        summary: "Российские СМИ сообщили о завершении доклинических испытаний лекарства, которой способно совершить революцию в онкологии.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Виталий Олехнович",
        content: "Лекарство удалось получить с помощью биотехнологий и эксперимента на МКС в 2015 году по выращиванию " +
        "сверхчистого кристалла. Лекарство было опробовано на мышах и крысах, у которых развивались меланомы и саркомы." +
        " Пациентам оно станет доступно через три-четыре года, пока пройдут все доклинические испытания." +
        "Впрочем, многое будет зависеть от финансирования программы."
    }, {
        id: "16",
        title: "Самые ожидаемые игры весны 2017 года",
        summary: "Прошедшей зимой вышло не так уж много действительно интересных и громких проектов." +
        "Некоторые из игр вызвали разочарование, другие в целом оправдали ожидания. ",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Onliner.by",
        content: " The Last Guardian оказалась неплохим приключением (хоть и скучным) и привлекла к себе внимание, " +
        "кроме прочего, тем, что в разработке она находилась долгие девять лет. Resident Evil 7: Biohazard " +
        " восприняли кто как: некоторым страшилка показалась неканоничной, другим — свежей и интересной."
    }, {
        id: "17",
        title: "Bloomberg представил топ-500 богатейших людей планеты. Белорусов среди них пока нет",
        summary: " Самый богатый белорус - это 40-летний создатель онлайн-игры World of Tanks Виктор Кислый",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "TUT.BY",
        content: "В феврале 2016-го пополнил список долларовых миллиардеров Bloomberg, но пока «отстает» от замыкающего " +
        "топ-500 96-летнего миллиардера из Саудовской Аравии Сулеймана аль Раджи более чем на 2 млрд долларов." +
        "Возглавил рейтинг основатель Microsoft Билл Гейтс (85,6 млрд долларов), на втором месте — американский бизнесмен " +
        "Уоррен Баффет (78,9 млрд), на третьем — глава Amazon Джефф Безос (73,5 млрд)."
    }, {
        id: "18",
        title: "Российский хоккеист НХЛ хитро реализовал буллит без броска",
        summary: "Российский форвард «Тампы» Никита Кучеров принес победу своей команде в поединке против «Баффало», " +
        "хитро реализовав послематчевый буллит. Ему удалось отправить шайбу в сетку, даже не исполнив броска.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "SPORT.TUT.BY",
        content: "Сблизившись с голкипером, Никита Кучеров сделал обманное движение, как будто собираясь переложить шайбу" +
        "на неудобную сторону крюка, но не стал ее касаться, и снаряд неспешно проскользнул в сетку под " +
        "не ожидавшим такого трюка шведским вратарем Робином Ленером."
    }, {
        id: "19",
        title: "Едим на ночь: 8 продуктов для ужина, которые помогут сбросить вес",
        summary: "Многие до сих пор уверены: для того чтобы похудеть, нельзя есть после 18 00.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Onliner.by",
        content: "Но специалисты в области питания опровергают данное утверждение, ведь это слишком усредненные цифры. " +
        "Правильнее есть примерно за 2 часа до сна. Так вы не успеете проголодаться и легко уснете, " +
        "не совершив в последний момент набег на холодильник."
    }, {
        id: "20",
        title: "Райский сад Импрессионизма",
        summary: "25 февраля 2017 года в ТЦ «Galleria Minsk» открылась лофт-выставка «Райский сад Импрессионизма»," +
        "на которой были представлены точные полноразмерные копии полотен выдающихся художников импрессионизма и постимпрессионизма.",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Дмитрий Корсак",
        content: "Для того чтобы лучше прочувствовать настроение и особое восприятие мира художниками представленных" +
        "картин, организаторы выставки разместили полотна в «райском саду» - среди музыки, живых цветов и тропических птиц."
    },];

    var newArticle = {
        id: "21",
        title: "New article",
        summary: "blablabla",
        createdAt: new Date("2017-02-28T11:55:00+03:00"),
        author: "Tatsiana Ambrozhevich",
        content: "blablabla blablabla blablabla blablabla blablablablablabla."
    };

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        var sortedArticles = [];
        if (filterConfig != null) {
            if (filterConfig.author == null && filterConfig.createdAt == null) {
                for (var i = skip, j = 0; i < top; i++, j++) {
                    sortedArticles[j] = articles[i];
                }
            }
            else if (filterConfig.author == null) {
                for (i = skip, j = 0; i < top; i++, j++)
                    if (filterConfig.createdAt === articles[i].createdAt) {
                        sortedArticles[j] = articles[i];
                    }
            }
            else if (filterConfig.createdAt == null) {
                for (i = skip, j = 0; i < top; i++, j++) {
                    if (filterConfig.author === articles[i].author) {
                        sortedArticles[j] = articles[i];
                    }
                }
            }
        }
        else
            for (i = skip, j = 0; i < top; i++, j++) {
                sortedArticles[j] = articles[i];
            }
        sortedArticles.sort(function (a, b) {
            return a.createdAt - b.createdAt;
        });
        return sortedArticles;
    }

    function getArticle(id) {
        var article = articles.find(function (item) {
            return item.id == id;
        });
        return article;
    }

    function validateArticle(article) {
        if (article.id === '' || article.id === undefined)
            return false;
        if (article.title === '' || article.title == undefined || article.title.length >= 100)
            return false;
        if (article.summary === '' || article.summary == undefined || article.summary.length >= 200)
            return false;
        if (article.createdAt == '' || article.createdAt == undefined)
            return false;
        if (article.author === '' || article.author == undefined)
            return false;
        if (article.content === '' || article.content == undefined)
            return false;
        return true;
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            articles.push(article);
            functionsService.addNewElem(article);
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
        articles.splice(articles.indexOf(getArticle(id)), articles.indexOf(getArticle(id)));
    }

    return {
        getArticles: getArticles,
        getOne: getArticle,
        add: addArticle,
        edit: editArticle,
        remove: removeArticle
    };
}());

var functionsService = (function () {
    var id = 1;

    function addNew() {
        var article = articlesService.getOne(id);
        var elem = document.createElement('div');
        elem.className = "new";
        elem.id = id;
        elem.innerHTML = '<img src="230840.jpg" width="235" height="200">' +
            '<h3>' + article.title + ' </h3>' +
            '<p class="description" > ' + article.summary + '</p>' +
            '<p class="author"> ' + 'Author: ' + article.author + ' </p>' +
            '<a class="link" href="https://www.onliner.by/">Read more...</a>' +
            ' <div class="icons">' +
            '<button id="' + elem.id + '" class="icon1" onclick="functionsService.change(this.id);"> <img src="change1.png" width="15" height="18"></button>' +
            '<button id="' + elem.id + '" class="icon2" onclick="functionsService.delete(this.id);"> <img src="delete1.png" width="15" height="18"></button>' +
            '</div>';
        id++;
        return elem;
    }

    function deleteNew(id) {
        var elem = document.getElementById(id);
        document.getElementsByClassName('news')[0].removeChild(elem);
    }

    function show() {
        var parentElem = document.getElementsByClassName("news")[0];
        var sm = document.getElementById("show-more");

        var elem = articlesService.getArticles();
        for(var i = 0; i < elem.length; i++){
            parentElem.insertBefore(addNew(elem[i]), sm);
        }
    }

    function sign(){
        if(username != null){
            var buton1 = document.getElementsByClassName('sign_up btn');
            var buton2 = document.getElementsByClassName('pink btn');
            buton1[0].style.display = 'inline'
            buton2[0].style.display = 'inline'

            document.getElementById("USERNAME").style.display = 'none'

            var buttons = document.getElementsByClassName("icons");
            for(var i = 0; i < buttons.length; i++){
                buttons.item(i).style.display = "none";
            }

            var add = document.getElementsByClassName("add");
            add[0].style.display = "none";

            username = null;

        }else{
            username='blablabla';
            var buton1 = document.getElementsByClassName('sign_up btn');
            var buton2 = document.getElementsByClassName('pink btn');
            buton1[0].style.display = 'none'
            buton2[0].style.display = 'none'

            var userTemp= document.getElementById('USERNAME');
            userTemp.innerHTML = '<span>'+username+'</span>';

            var buttons = document.getElementsByClassName("icons");
            for(var i = 0; i < buttons.length; i++){
                buttons.item(i).style.display = "inline";
            }

            var add = document.getElementsByClassName("add");
            add[0].style.display = "inline";
        }
    }

    function change(id, article){
        var result = document.getElementById(article.id);
        if(result!=null){
            var temp = addNew(article);
            result.class = temp.class;
            result.innerHTML = temp.innerHTML;}
    }

    var AUTHORS = ['TUT.BY','Дмитрий Корсак','SPORT.TUT.BY','Никита Мелкозеров','Виталий Олехнович','Onliner.by','42.TUT.BY'];

    function formSelection(){
        for(var i =0; i<AUTHORS.length;i++) {
            var select = document.getElementById('by-author');
            var option = document.createElement('option');
            option.innerHTML = AUTHORS[i];
            select.appendChild(option);
        }
    }
    function addSpecificNew(article){
        article.createdAt = new Date();
        var result = document.getElementsByClassName('news');
        result[0].insertBefore(addNew(article), result[0].firstChild);
    }

    return {
        show: show,
        sign: sign,
        add: addNew,
        addNewElem: addSpecificNew,
        select : formSelection,
        delete: deleteNew,
        change: change
    };

}());
var user =
{
    id: "1",
    title: "В БГЭУ выбрали самую красивую студентку",
    summary: "Традиционно женский нархоз разыграл титул своей самой красивой студентки. " +
    "Пятничным вечером девять девушек сноровисто меняли платья, аккуратно вышагивали на шпильках высотой с небоскреб.",
    createdAt: new Date("2017-02-28T08:00:00+03:00"),
    author: "Onliner.by",
    content: " Девушек девять. Они представляют разные факультеты, аббревиатуры которых могут быть понятны только местным." +
    " На сцену выходит Марта Колб с факультета менеджмента. Сразу говорит, что она папина дочка: с 12 лет водит машину " +
    "и умеет забивать гвозди. Все аплодируют ее силе и независимости.В итоге главный приз" +
    " из его рук получила Марта Колб. Девушка настолько не ожидала успеха, что расплакалась прямо как в телевизоре. " +
    "Потом сказала, мол, очень сильно переживала и на репетициях даже лила слезы от перенапряжения." +
    "Девушка родом из Пинска. Пока неизвестно, вернется ли она на Полесье после учебы. Хотя это и неважно."
}



