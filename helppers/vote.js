module.exports = vote = (technicianInfo, aptitude, voteStar, userID) => {
  var amountStar = 0;
  var oldAmountStar = 0;
  var success = true;
  technicianInfo.aptitude.forEach((element) => {
    if (element.aptitude === aptitude) {
      if (!element.voteID.includes(userID)) {
        element.voteID.push(userID);
        oldAmountStar = element.star;
        element.star =
          (element.star * element.amountOfvoteStar + voteStar) /
          (element.amountOfvoteStar + 1);
        element.amountOfvoteStar += 1;
        amountStar = element.star;
        technicianInfo.amount += 1;
        return;
      } else {
        success = false;
      }
    }
  });
  if (success === false) return false;
  technicianInfo.star =
    (technicianInfo.star * technicianInfo.aptitude.length +
      (amountStar - oldAmountStar)) /
    technicianInfo.aptitude.length;
  console.log(technicianInfo);
  return technicianInfo;
};
