class GameMemoria {
  constructor() {
    this.game = $("#tabuleiro");
    this.game.width($(window).width());
    this.game.height($(window).height());
    this.game
      .css("display", "flex")
      .css("flex-direction", "column")
      .css("align-items", "center");
    this.current = [];
    this.cont = 1;
    this.score = 0;
    this.timeInit;
    this.timeEnd;
    this.tempo = $("<p>");
    this.buttonInit = $("<button>");
    this.buttonTemp = $("<button>");
    this.mainGame = $("<div>");
    this.Hanck = $("<div>");
    this.name = "";
    this.onTable = true;
    this.realTimeFunction;
  }

  init() {
    this.game.append(`<p>Jogo da Memoria</p>`);
    this.buttonInit.append("<p>Iniciar/reiniciar<p>");
    this.game.append(this.buttonInit);
    this.buttonTemp.append("<p>Melhor Tempo<p>");
    this.game.append(this.buttonTemp);
    this.tempo.append("Tempo:0");
    this.tempo.addClass('realtime')
    this.game.append(this.tempo);
    this.game.append(this.mainGame);
    let urlListStatus = imagesStatus();
    this.ertutura(urlListStatus, false);
    this.buttonInit.on("click", () => {
      this.score = 0;

      this.timeInit = new Date().getTime();
      this.realTimeFunction = setInterval(() => {
        realTime(this.timeInit);
      }, 1000);
      $(".divImgMain").remove();

      this.tempo.html("");
      let urlListeImage = random(this.imURL());
      this.ertutura(urlListeImage, true);
    });
    this.buttonTemp.on("click", () => {
      this.tabela(this.onTable);
      if (this.onTable) {
        this.onTable = false;
      } else {
        this.onTable = true;
      }
    });
  }

  ertutura(list, mok) {
    let divImgMain = $("<div>");
    divImgMain
      .css("display", "flex")
      .css("flex-direction", "row")
      .css("flex-wrap", "wrap ")
      .css("width", "500");
    divImgMain.addClass("divImgMain");
    list.forEach((element) => {
      let divImg = $("<div>");
      divImg.css("width", "100").css("margin", "10px");

      let img = $("<img>");
      img.attr("src", `img/${element}`);
      img.attr("width", "100");
      img.addClass("Ocultar");
      divImg.append(img);
      img.on("click", () => {
        if (!img.hasClass("Nice") && !img.hasClass("Ocultar")) {
          if (this.cont <= 2) {
            let nameClass = `Activo${this.cont}`;
            img.addClass(nameClass);
            img.attr("src", `img/${element}`);
            img.fadeOut(50);
            img.fadeIn(300);
            this.logicaOculta($(".Activo1"), $(".Activo2"));
            this.cont++;
          } else {
            $(".Activo1").attr("src", "img/cross.png");
            $(".Activo2").attr("src", "img/cross.png");
            $(".Activo1").removeClass("Activo1");
            $(".Activo2").removeClass("Activo2");
            this.cont = 1;
            let nameClass = `Activo${this.cont}`;
            img.addClass(nameClass);
            img.attr("src", `img/${element}`);
            img.fadeOut(50);
            img.fadeIn(300);
            this.cont++;
          }
        }
      });
      divImgMain.append(divImg);
      this.mainGame.append(divImgMain);
    });
  }

  logicaOculta(item1, item2) {
    if (this.cont == 2) {
      let active1 = item1.attr("src");
      let active2 = item2.attr("src");
      if (item1.attr("class") == item2.attr("class"))
        alert("Você selecionou duas vezes o mesmo card !");
      if (active2 == active1 && item1.attr("class") != item2.attr("class")) {
        $(".Activo1").addClass("Nice");
        $(".Activo2").addClass("Nice");
        $(".Activo1").removeClass("Activo1");
        $(".Activo2").removeClass("Activo2");
        this.score++;
        if (this.score >= 8) {
          this.timeEnd = new Date().getTime();
          let x = this.timeEnd - this.timeInit;
          let temp = Mili(x);
          clearInterval(this.realTimeFunction)
          this.tempo.html(`Tempo:${temp.Hora}:
          ${temp.Minuto >= 10 ? temp.Minuto : "0" + temp.Minuto}:
          ${temp.Segundo >= 10 ? temp.Segundo : "0" + temp.Segundo}`);
          this.name = prompt("Qual o nome do Jogador ?");
          let timeObject = {
            nome: this.name,
            Hora: `${temp.Hora}`,
            Minuto: ` ${temp.Minuto >= 10 ? temp.Minuto : "0" + temp.Minuto}`,
            Segundo: `${
              temp.Segundo >= 10 ? temp.Segundo : "0" + temp.Segundo
            }`,
          };
          let sorted = [];
          let object = [x, timeObject];
          if ("BestTime" in localStorage) {
            let listLocalStorege = JSON.parse(localStorage.getItem("BestTime"));
            listLocalStorege.sort();
            sorted.push(...listLocalStorege);
          }
          sorted.push(object);
          localStorage.setItem("BestTime", JSON.stringify(sorted));
          this.tabela(false);
          for (const Y of Array(3).keys()) {
            $(".Nice").fadeOut(50);
            $(".Nice").fadeIn(300);
          }
        }
      } else {
        if (!item1.hasClass("Nice")&&!item2.hasClass("Nice")) {
          setTimeout(() => {
            item1.attr("src", "img/cross.png");
            item2.attr("src", "img/cross.png");
            item1.removeClass("Activo1");
            item2.removeClass("Activo2");
          }, 1500);
        }
      }
    }
  }
  imURL() {
    let imagex = [
      "firefox.png",
      "android.png",
      "chrome.png",
      "facebook.png",
      "googleplus.png",
      "html5.png",
      "twitter.png",
      "windows.png",
    ];
    return imagex;
  }

  tabela(on) {
    $(".tabelatemp").remove();
    this.tabelatemp = $("<table>");
    this.tabelatemp.addClass("tabelatemp");
    this.game.append(this.tabelatemp);
    let tableDesc = `<tr>
    <th>Posição</th>
    <th>Nome</th>
    <th>Hora</th>
    <th>Minuto</th>
    <th>Segundo</th>
  </tr>`;
    $(".tabelatemp").append(tableDesc);
    if ("BestTime" in localStorage) {
      let listLocalStorege = JSON.parse(localStorage.getItem("BestTime"));
      listLocalStorege.sort(function (a, b) {
        return a[0] - b[0];
      });
      listLocalStorege.forEach((element, index) => {
        let tableLine = `</tr>
        <tr>
        <td>${index + 1}º</td>
        <td>${element[1].nome}</td>
        <td>${element[1].Hora}</td>
        <td>${element[1].Minuto}</td>
        <td>${element[1].Segundo}</td>
        </tr>`;
        $(".tabelatemp").append(tableLine);
      });
    }
    if (on) {
      $(".tabelatemp").fadeIn(500);
    } else {
      $(".tabelatemp").fadeOut(1);
    }
  }
}
const app = new GameMemoria();
$(document).ready(function () {
  app.init();
});

async function realTime(timeInit){
    this.timeEnd = new Date().getTime();
    let x = this.timeEnd - timeInit;
    let temp = Mili(x);
    $('.realtime').html(`Tempo:${temp.Hora}:
    ${temp.Minuto >= 10 ? temp.Minuto : "0" + temp.Minuto}:
    ${temp.Segundo >= 10 ? temp.Segundo : "0" + temp.Segundo}`);
}

function initOcult() {
  setTimeout(() => {
    let item = $(".Ocultar");
    item.attr("src", "img/cross.png");
    item.removeClass("Ocultar");
  }, 3000);
}

function Mili(x) {
  let ms = x % 1000;
  x = (x - ms) / 1000;
  let secs = x % 60;
  x = (x - secs) / 60;
  let mins = x % 60;
  let hrs = (x - mins) / 60;
  return { Milimili: ms, Segundo: secs, Minuto: mins, Hora: hrs };
}

function random(imagens) {
  let sebastiao = [];
  let randomList = imagens;
  for (const iterator of Array(2).keys()) {
    let currentIndex = randomList.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [randomList[currentIndex], randomList[randomIndex]] = [
        randomList[randomIndex],
        randomList[currentIndex],
      ];
    }
    randomList.forEach((element) => {
      sebastiao.push(element);
    });
  }
  initOcult();
  return sebastiao;
}

function existIn(lista, item) {
  if (lista.indexOf(item) !== -1) {
    return false;
  }
  return true;
}

function imagesStatus() {
  images = [
    "facebook.png",
    "facebook.png",
    "android.png",
    "android.png",
    "chrome.png",
    "chrome.png",
    "firefox.png",
    "firefox.png",
    "html5.png",
    "html5.png",
    "googleplus.png",
    "googleplus.png",
    "twitter.png",
    "twitter.png",
    "windows.png",
    "windows.png",
  ];
  return images;
}
