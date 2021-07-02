export function isAuthenticated() {
  var user = localStorage.getItem("root");
  if (user) return true;
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
  var array = [{ label: "Selecionar", value: 0 }];
  list.map((item) => {
    array.push({
      label: item.nome,
      value: item.id,
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
