mixin {{componentName}}(data, options)
  - options = setOptionsDefaults(options, "{{componentName}}")
  - var classes = getOptionsModifier(options, "{{componentName}}")

  .{{componentName}}
    Your HTML(Jade) code for the component goes here

