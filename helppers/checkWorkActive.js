module.exports = function checkWorkActive(start, end, n_hour, n_minutes) {
  if (n_hour >= start.hour && n_hour <= end.hour) {
    if (n_hour === start.hour) {
      if (n_minutes >= start.minutes) return true;
      else return false;
    } else if (n_hour === end.hour) {
      if (n_minutes <= end.minutes) return true;
      else return false;
    } else return true;
  } else return false;
};
