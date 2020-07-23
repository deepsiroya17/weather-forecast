module.exports.getDate = function(date) {
  const today = new Date(date);
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  return today.toLocaleDateString("en-US", options);
}

module.exports.getTime = function() {
  const today = new Date();
  const options = {
     hour: 'numeric',
     minute: 'numeric'
  };

  return today.toLocaleTimeString('en-US', options);
}
