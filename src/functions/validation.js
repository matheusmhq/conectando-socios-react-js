export const validationFields = (setErrors) => {
  setErrors("");
  var errors = "";

  //Inputs
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; ++i) {
    var input = inputs[i];
    if (
      input.hasAttribute("required") &&
      input.classList.contains("validation-here") &&
      (input.value == "" || input.value == null)
    ) {
      errors += ` ${input.name}`;
    }
  }

  //Selects
  var selects = document.getElementsByTagName("select");
  for (var i = 0; i < selects.length; ++i) {
    var select = selects[i];
    if (
      select.hasAttribute("required") &&
      select.classList.contains("validation-here") &&
      (select.value == 0 || select.value == null)
    ) {
      errors += ` ${select.name}`;
    }
  }

  //Textarea's
  var textareas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; ++i) {
    var textarea = textareas[i];
    if (
      textarea.hasAttribute("required") &&
      textarea.classList.contains("validation-here") &&
      (textarea.value == 0 || textarea.value == null)
    ) {
      errors += ` ${textarea.name}`;
    }
  }

  //Check's
  var checksAll = document.querySelectorAll(".validation-here-check");
  for (var i = 0; i < checksAll.length; ++i) {
    var check = checksAll[i];

    var ch = false;
    var name = check.children[0].name;
    for (var j = 0; j < check.children.length; ++j) {
      var checkChildren = check.children[j];
      if (checkChildren.checked) ch = true;
    }

    if (!ch) errors += ` ${name}`;
  }

  if (errors != "") {
    setErrors(errors);
    return false;
  } else return true;
};
