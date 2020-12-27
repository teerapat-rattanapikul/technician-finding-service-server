const technicianValueModel = require("../models").technicianValues;

GetSortOrder = (data) => {
  return function (a, b) {
    if (a[data] < b[data]) {
      return 1;
    } else if (a[data] > b[data]) {
      return -1;
    }
    return 0;
  };
};

module.exports = sortTechnician = (techArr) => {
  var countStar = 0;
  var countAmount = 0;
  // sort by vote star
  var result = techArr.sort(GetSortOrder("star"));
  for (i = 0; i < result.length; i++) {
    result[i]["count"] = countStar;
    if (i !== result.length - 1) {
      if (result[i].star !== result[i + 1].star) {
        countStar++;
      }
    }
  }
  // sort by amount of vote star
  result = techArr.sort(GetSortOrder("amount"));
  for (i = 0; i < result.length; i++) {
    result[i]["count"] += countAmount;
    if (i !== result.length - 1) {
      if (result[i].amount !== result[i + 1].amount) {
        countAmount++;
      }
    }
  }
  console.log(result);
  return result;
};
