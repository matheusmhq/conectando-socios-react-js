export function isAuthenticated() {
  var logged = localStorage.getItem("cs_logged");
  if (logged) return true;
  else return false;
}

export function UrlParams() {
  return new URLSearchParams(window.location.search);
}

export function ValidateEmail(email) {
  email = email.trim();
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function FormatOptions(list) {
  var array = [];
  list.map((item) => {
    array.push({
      name: item.nome,
      id: item.id,
    });
  });
  return array;
}

export function FormatOptionsState(list) {
  var array = [];
  list.map((item) => {
    array.push({
      name: item.nome,
      id: item.id,
      uf: item.uf,
    });
  });
  return array;
}

export function FormatOptionsCity(list) {
  var array = [];
  list.map((item) => {
    array.push({
      name: item.nome,
      id: item.id,
      ibge: item.ibge,
    });
  });
  return array;
}

export function EnterPressed(e, handler) {
  var code = e.keyCode || e.which;
  if (code == 13) handler();
}

export function DisablePaste() {
  let inputs = document.getElementsByClassName("disable-paste");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onpaste = (e) => e.preventDefault();
  }
}

export function SetParamsUrl(history, obj) {
  var result = "";
  obj.params.map((item, index) => {
    if (item.value != null && item.value != undefined && item.value != "") {
      result += `${index == 0 ? `${obj.path}?` : "&"}${item.name}=${
        item.value
      }`;
    }
  });
  history.push(result);
}
