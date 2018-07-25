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

  // függvények helye
  sortByName(userDatas);
  displayCharacters(userDatas);
  document.getElementById('search-button').addEventListener('click', function search() {
    searchForCharacter(userDatas);
  });
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


// szereplők megjelenítése a character-list divben
function displayCharacters(input) {
  var target = document.querySelector('.character-list');
  for (var i = 0; i < input.length; i++) {
    if (input[i].dead !== 'true') {
      var div = document.createElement('div');
      div.className = 'oneCharacter';
      div.id = input[i].name;
      var result = '';
      result += '<img src=' + input[i].portrait + ' class = "portraitOfCharacter" alt = "portrait"><br>' + input[i].name;
    }
    div.innerHTML = result;
    target.appendChild(div);
  }
}


// keresés eredményének megjelenítése
function displayResult(result) {
  var oldDiv = document.querySelector('.resultOfSearch');
  if (oldDiv !== null) {
    oldDiv.remove();
  }
  var div = document.createElement('div');
  div.className = 'resultOfSearch';
  var target = document.querySelector('.one-character');
  div.innerHTML = result;
  target.appendChild(div);
}


// keresés funkció
function searchForCharacter(userDatas) {
  var search = document.querySelector('#search-text').value.toLowerCase();
  var result = '';
  var found = false;
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].name.toLowerCase().indexOf(search) > -1 && search !== '') {
      result = userDatas[i].name + '<br><br>' + '<img src=' + userDatas[i].picture + ' class="found" alt=imgOfFound><br>' +
        userDatas[i].bio;
      found = true;
      if (userDatas[i].house !== '') {
        result += '<br><br><img src=/assets/houses/' + userDatas[i].house + '.png alt = house>';
      }
    } if (found === false) {
      result = 'Character not found';
    }
  }
  displayResult(result);
}

