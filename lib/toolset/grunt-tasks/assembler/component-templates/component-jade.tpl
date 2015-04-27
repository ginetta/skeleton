mixin {{componentName}}(data, options)
  - options = setOptionsDefaults(options, "{{componentName}}", components.{{componentName}})
  - var classes = getOptionsModifier(options, "{{componentName}}", null, components.{{componentName}})

  .{{componentName}}(class=classes)&attributes(attributes)
    | Your HTML(Jade) code for the component goes here

