/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.getNum = function (input) {
    // Find unit
    var unitRegex = /[a-z]+$/i;
    var unit = input.match(unitRegex);

    // Check to see if only numeric value has been entered
    if (unit === null) {
      if (isNaN(input)) {
        return 'Invalid Number';
      } else {
        return 'No Unit';
      }
    }

    var firstCharIndex = input.indexOf(unit[0]);

    // Check to see if a number has been entered
    if (firstCharIndex < 1) {
      // No number entered so return 1 as default value
      return 1;
    }

    // Get number string
    var numString = input.slice(0, firstCharIndex);

    // Check to see if fraction has been entered
    var divisionRegex = /\//;
    var divisionRequired = divisionRegex.test(numString);

    if (divisionRequired) {
      var splitString = numString.split('/');

      // Check for NaN fractions or too many fractions
      if (isNaN(splitString[0]) || isNaN(splitString[1]) || splitString.length > 2) {
        return 'Invalid Number';
      } else {
        // Carry out division
        let result = parseFloat(splitString[0]) / parseFloat(splitString[1]);
        return result;
      }
    } else if (isNaN(numString)) {
      // Invalid number entered
      return 'Invalid Number';
    } else {
      // No division required & valid number entered
      let result = parseFloat(numString);
      return result;
    }
  };

  this.getUnit = function (input) {
    var allowableUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    var unitRegex = /[a-zA-Z]+$/;
    var unit = input.match(unitRegex);

    // Check to see if no unit has been entered
    if (unit === null) {
      return 'Invalid Unit';
    }
    var lowerCaseUnit = unit[0].toLowerCase();
    if (allowableUnits.includes(lowerCaseUnit)) {
      return lowerCaseUnit;
    } else {
      return 'Invalid Unit';
    }
  };

  this.getReturnUnit = function (initUnit) {
    var unitPairs = {
      gal: 'l',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    var result = unitPairs[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    var unitPairs = {
      gal: 'gallons',
      l: 'litres',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    var result = unitPairs[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'gal':
        return parseFloat((initNum * galToL).toFixed(5));
        break;
      case 'l':
        return parseFloat((initNum * 1 / galToL).toFixed(5));
        break;
      case 'lbs':
        return parseFloat((initNum * lbsToKg).toFixed(5));
        break;
      case 'kg':
        return parseFloat((initNum * 1 / lbsToKg).toFixed(5));
        break;
      case 'mi':
        return parseFloat((initNum * miToKm).toFixed(5));
        break;
      case 'km':
        return parseFloat((initNum * 1 / miToKm).toFixed(5));
        break;
    }
  };

  this.getString = function (initNum, fullInitUnit, returnNum, fullReturnUnit) {
    var result = `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
    return result;
  };

}

module.exports = ConvertHandler;
