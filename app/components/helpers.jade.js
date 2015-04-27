function setOptionsDefaults(options, componentName, component) {
  options = options || {};
  for ( var key in component.options ) {
    options[key] = options[key] || component.options[key].default;
  }

  return options;
}

module.exports.setOptionsDefaults = setOptionsDefaults;

function getOptionsModifier(options, componentName, filters, component) {
  var classes = ["componentName"];
  if (filters) {
    for ( var index in filters) {
      classes.push(getClassModifier(componentName, filters[index], options, component));
    }
  } else {
    for ( var key in component.options ) {
      classes.push(getClassModifier(componentName, key, options, component));
    }
  }

  return classes;
}

module.exports.getOptionsModifier = getOptionsModifier;

function getClassModifier(componentName, key, options, component) {
  var defaultOption = component.options[key].default;
  var option = options[key] || defaultOption;

  if (typeof option === "boolean") {
      return option ?  componentName + "--" + key : "";
  } else {
      return option !== "" ?  componentName + "--" + key + "-" + option : "";
  }
}

module.exports.getClassModifier = getClassModifier;
