$(document).ready(function(){

  $('#cel').click(function(){
      var temp = $('#temp').text();
      var degree = temp.replace(/[^a-z]/gi, '');
      if (degree === "F") {
          var num = Math.round((temp.match(/\d+/)-32) * 5 / 9);
          $('#temp').text(num + "°");
          $('#temp').append("<span>C</span>");
      }
  });

  $('#far').click(function(){
      var temp = $('#temp').text();
      var degree = temp.replace(/[^a-z]/gi, '');
      if (degree === "C") {
          var num = Math.round(temp.match(/\d+/) * 9 / 5 + 32);
          $('#temp').text(num + "°");
          $('#temp').append("<span>F</span>");
      }
  });
  
});
