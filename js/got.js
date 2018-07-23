function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function doNotUseUnnamedFunctions() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText);
  console.log(userDatas);

  // függvények helye
  sortByName(userDatas);
}

getData('/json/characters.json', successAjax);


// A karakterek megjelenítése név szerint rendezve történjen!
function sortByName(input) {
  var i = input.length - 1;
  while (i > 0) {
    var swap = 0;
    for (var j = 0; j < i; j++) {
      if (input[j].name > input[j + 1].name) {
        [input[j], input[j + 1]] = [input[j + 1], input[j]];
        swap = j;
      }
    }
    i = swap;
  }
}
