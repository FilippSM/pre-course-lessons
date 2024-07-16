import express from 'express';
import cors from 'cors';
import { getCatchCount, getGameState, getGoogleCoords, getGridSizeSettings, getMissCount, getPlayer1Coords, getPlayer2Coords, movePlayer, playAgain, setGridSize, start, subscribe, unsubscribe } from './data.js';

//запускаем нашу игру
//start();

//создание нового приложения Express
const app = express();

//Определение порта
const port = 3000;

app.use(cors());
app.use(express.json());

subscribe((event) => {
  console.log(event);
})

app.put('/movePlayer', (req, res) => {
  //сделать кого именно может передвигать клиент

  movePlayer(req.body.playerNumber, req.body.direction);
  res.send(200);
});

app.put('/setGridSize', (req, res) => {
  setGridSize(req.body.selectGridSize);
  res.send(200);
});

app.put('/start', (req, res) => {
  start();
  res.send(200); //200 ствтус http кода
});

app.put('/playAgain', (req, res) => {
  playAgain();
  res.send(200);
});

app.get('/events', (req, res) => {
  //todo: 2 игрока если уже есть: третьего не пускать..
  //возвращать 403... на клиенте в браузере можно
  //можно отлавливать 403 и показывать alert("уже два игрока, перезагрузите страницу")  

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  //распределить номер игрока.. и отправить его на клиент ивентом

  //отписка, при закрытии окна - отписка
  res.write(`data: ${JSON.stringify({
    name: "PLAYER_NUMBER_DETECTED",
    payload: 1
  })}\n\n`);


  const handler = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  subscribe(handler)    
  req.on('close', () => {
    //todo: понять какой отвалился (1ый или 2-ой) и когда будет рекконект
    //позволить игрок управлять 1 или 2 персонажем
    unsubscribe(handler);
    res.end();
  });


});


//Определение единственного эндпоинта
app.get('/getCatchCount', (req, res) => {
  res.send(getCatchCount());
});

app.get('/getMissCount', (req, res) => {
  res.send({value: getMissCount()});
});

app.get('/getGoogleCoords', (req, res) => {
  res.send(getGoogleCoords());
});

app.get('/getPlayer1Coords', (req, res) => {
  res.send(getPlayer1Coords());
});

app.get('/getPlayer2Coords', (req, res) => {
  res.send(getPlayer2Coords());
});

app.get('/getGridSizeSettings', (req, res) => {
  res.send(getGridSizeSettings());
});

app.get('/getGameState', (req, res) => {
  res.send({value: getGameState()});
});


//Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
