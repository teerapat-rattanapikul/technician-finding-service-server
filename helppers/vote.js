module.exports = vote = (technicianInfo, aptitude, voteStar) => {
  var amountStar = 0;
  var oldAmountStar = 0;
  technicianInfo.aptitude.forEach((element) => {
    if (element.aptitude === aptitude) {
      oldAmountStar = element.star;
      element.star =
        (element.star * element.amountOfvoteStar + voteStar) /
        (element.amountOfvoteStar + 1);
      element.amountOfvoteStar += 1;
      amountStar = element.star;
      technicianInfo.amount += 1;
      return;
    }
  });

  technicianInfo.star =
    (technicianInfo.star * technicianInfo.aptitude.length +
      (amountStar - oldAmountStar)) /
    technicianInfo.aptitude.length;
  console.log(technicianInfo);
  return technicianInfo;
};
