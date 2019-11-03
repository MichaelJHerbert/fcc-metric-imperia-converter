/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input; //3.1km
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
    
      if(initNum === 'Invalid Number' && initUnit === 'Invalid Unit'){
        res.json({error: 'Invalid Number and Unit'});
      } else if(initNum === 'Invalid Number' && initUnit !== 'Invalid Unit') {
        res.json({error: 'Invalid Number'});
      } else if(initUnit === 'Invalid Unit' && initNum !== 'Invalid Number'){
        res.json({error: 'Invalid Unit'})
      } else{
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var fullInitUnit = convertHandler.spellOutUnit(initUnit);
        var fullReturnUnit = convertHandler.spellOutUnit(returnUnit);
        var toString = convertHandler.getString(initNum, fullInitUnit, returnNum, fullReturnUnit);
        res.json({initNum, initUnit, returnNum, returnUnit, string: toString})
      }
    });
    
};
