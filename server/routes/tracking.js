const express = require('express');
const connection = require('../sql/mysql');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// 흔적 취득
router.post('/tracking/get', [
    body('lat').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.'),
    body('lng').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " SELECT no, uuid, title, comment, image, latitude, longitude, ";
    sql += " (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance ";
    sql += " FROM icecream_tracking ";
    sql += " HAVING distance < 10 ";
    sql += " ORDER BY no DESC ";
    sql += " LIMIT 0, 20 ";
    let params = [body.lat, body.lng, body.lat];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json(rows)
        }
    });
});

// 흔적 남기기
router.post('/tracking/add', [
    body('uuid').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.'),
    body('title').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.'),
    body('comment').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.'),
    body('lat').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.'),
    body('lng').not().isEmpty().trim().escape().withMessage('데이터에 문제가 있습니다.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " INSERT INTO icecream_tracking ";
    sql += " (no, uuid, title, comment, image, latitude, longitude, regdate) ";
    sql += " VALUES(0, ?, ?, ?, ?, ?, ?, now()) ";
    let params = [
        body.uuid,
        body.title,
        body.comment,
        body.image,
        body.lat,
        body.lng
    ];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "등록중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                success: true,
                insertId: rows.insertId
            })
        }
    });
});

connection.end;

module.exports = router;