$icons: (
  {{#shapes}}
      {{base}}: (width: {{width.outer}}px, height: {{height.outer}}px, x: {{position.relative.x}}%, y: {{position.relative.y}}%){{^last}},{{/last}}
  {{/shapes}}
);

$icon-sprite: (width: {{spriteWidth}}px, height: {{spriteHeight}}px, svgPath: '{{{sprite}}}');
