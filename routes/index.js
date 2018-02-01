var express = require('express');
var router = express.Router();
var question = require('../model/questions');

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});

router.get('/summary', (req, res, next)=>{
    res.render('summary');
});

router.post('/questions',(req,res,next)=>{
    console.log(req.body);
    var questionNumber = req.body.questionNumber; //Gets the question number form the body.
    console.log(questionNumber);
    question.findOne({qno:questionNumber}).select('qno que options').exec((err,doc)=>{
          if(err){
              console.log(err); //if error, console the error.
          }
          else{
              res.send(doc); //if no error, send the question.
          }
    });
});

router.post('/verify',(req,res,next)=>{
    console.log(req.body);
    var questionNumber = req.body.questionNumber; //gets the question number form the body.
    var answer = req.body.answer ; //gets the user's of the answer
    question.findOne({qno:questionNumber}).select('ans').exec((err,doc)=>{
        if(err){
            console.log(err); //if error, console the error.
        }
        else{
            if(answer === doc.ans){
                res.send({code : 1,ans : doc.ans});
            }
            else{
                res.send({code:0,ans : doc.ans});
            }
        }
    });
});


module.exports = router;
