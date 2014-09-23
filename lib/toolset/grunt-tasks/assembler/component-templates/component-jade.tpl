mixin {{componentName}}(data, options)
  - setOptionsDefaults(options, "{{componentName}}")
  - var classes = getOptionsModifier(options, "{{componentName}}", ["size"])

  .{{componentName}}(class=classes)
    h1 hello component

