function setOptionsDefaults(options, componentName, components) {

  options = options || {};
  for ( var key in components[componentName].options ) {
    options[key] = options[key] || components[componentName].options[key].default;
  }

  return options;
}

module.exports.setOptionsDefaults = setOptionsDefaults;

function getOptionsModifier(options, componentName, filters, components) {
  var classes = "" + componentName;
  if (filters) {
    for ( var key in filters) {
      classes = classes + " " + getClassModifier(componentName, key, options);
    }
  } else {
    for ( var key in components[componentName].options ) {
      classes = classes + " " + getClassModifier(componentName, key, options);
    }
  }
  
  return classes;
}

module.exports.getOptionsModifier = getOptionsModifier;

function getClassModifier(componentName, key, options, components) {
  var defaultOption = components[componentName].options[key].default;
  var option = options[key] || defaultOption;

  console.log(option, componentName)
  if (typeof option === "boolean") {
      return option ?  componentName + "--" + key : "";
  } else {
      return option !== "" ?  componentName + "--" + key + "-" + option : "";
  }
}

module.exports.getClassModifier = getClassModifier;
