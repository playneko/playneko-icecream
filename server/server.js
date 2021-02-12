const express = require('express');
const bodyParser = require('body-parser');
const trackingRouter = require('./routes/tracking');
const port = process.env.PORT || 3001;

const app = express();

// app.use(cors());

// JSON처리
app.use(bodyParser.json());

// 라우터
app.use('/api', trackingRouter);

// 서버 활성화
app.listen(port, ()=>{
	console.log(`Playneko Express Server v0.1`);
	console.log(`                ┌──────────┐`);
	console.log(`               ┌┤          ├┐`);
	console.log(`               ││ Playneko ││`);
	console.log(`               ││  Express ││`);
	console.log(`               └┤          ├┘`);
	console.log(`                ├──────────┤`);
	console.log(`                │□  □  □  □│`);
	console.log(`        ╔╦╦  ───┤          ├───────┻┳|―-∩`);
	console.log(`        ╠╬╬╬╣ □ │          │ □ □ □ ┳┻|　　ヽ`);
	console.log(`        ╠╬╬╬╣   │□  □  □  □│       ┻┳|　●  |`);
	console.log(`        ╠╬╬╬╣ □ │          │ □ □ □ ┳┻|▼) _ノ`);
	console.log(`        ╠╬╬╬╣   │ ┌──┬──┐  │       ┻┳|￣　)`);
	console.log(`        ╠╬╬╬╣ □ │ │//‖//│  │ □ □ □ ┳ﾐ(￣ ／`);
	console.log(`        ╚╩╩╩╝───┴─┴──┴──┴──┴───────┻┳T￣|`);
	console.log(`          (C) Copyright 2021~ Playneko.`);
	console.log(`------------------------------------------------`);
    console.log(`Playneko Market React Express is running on ${port}`);
});
