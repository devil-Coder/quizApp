/**
 * Created by Raj Chandra on 01-02-2018.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    que: {type:String}, //question
    qno: {type:Number}, //question number
    ans : {type : String}, //correct answer
    options : [{type : String}],// Options
});

var questions = module.exports = mongoose.model( 'questions' , questionSchema );
