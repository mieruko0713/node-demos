var express = require('express');
var router = express.Router();
// 导入 redis.js
var redis = require("../models/redis");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 扔瓶子
router.post("/throw",function(req,res,next) {
	// 获取post数据
	var body = req.body;
	var owner = body.owner;
	var type = body.type;
	var content = body.content;

	// owner type content为必填项
	if(!(owner&&type&&content)) {
		return res.join({code:0,msg:"信息不完整"});
	}

	// 类型必须填正确
	if(type&&["male","female"].indexOf(type)==-1) {
		return res.json({code:0,msg:"类型错误"});
	}

	// 调用扔瓶子的方法
	// 返回json数据
	redis.throw(body,function(result) {
		res.json(result);
	});
});

// 捡瓶子
router.get("/pick",function(req,res,next) {
	// 获取get参数
	var user = req.query.user;
	var type = req.query.type;

	// 必须填捞瓶子的人的用户名
	if(!user) {
		return res.json({code:0,msg:"信息不完整"});
	} 

	// 性别必须填
	if(!type || ["male","female"].indexOf(type) === -1) {
		return res.json(result);
	}

	// 捞瓶子
	// 返回json数据
	redis.pick(req.query,function(result){
		res.json(result);
	});
});

module.exports = router;
