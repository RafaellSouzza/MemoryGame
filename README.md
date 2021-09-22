# *Memory Game*
---
##### Descrição
> Jogo da memória baseado em um jogo da memória  4x4, que visa o aprendizado em JavaScript e JQuery, toda lógica elaborada foi criada a partir de um vídeo.
---
>Botão de iniciar e reiniciar o jogo, esse botão faz com que você inicie o jogo com as cartas em suas posições randômicas 
>>![alt text](https://github.com/RafaellSouzza/MemoryGame/blob/main/imagens/Captura%20de%20tela%202021-09-21%20211734.png)
>> ###### função que fazer a randomização das cartas
>>`function random(imagens) {
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
}`
