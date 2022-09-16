const controls = {
  activeStates: [
    ['bold'],
    ['italic'],
    ['underline'],
    ['strike'],
    null,
    ['heading', { level: 1 }],
    ['heading', { level: 2 }],
    ['heading', { level: 3 }],
    [{ textAlign: 'left' }],
    [{ textAlign: 'center' }],
    [{ textAlign: 'right' }],
    ['orderedList'],
    ['bulletList'],
    ['blockquote'],
    ['codeBlock'],
    ['link'],
    null

  ],
  commands: [
    'toggleBold',
    'toggleItalic',
    'toggleUnderline',
    'toggleStrike',
    {
      name: 'setColor',
      hasTooltip: 'color',
      tooltip: 'picker',
      colors: [
        "#61BD6D",
        "#1ABC9C",
        "#54ACD2",
        "#2C82C9",
        "#9365B8",
        "#CCCCCC",
        "#41A85F",
        "#00A885",
        "#3D8EB9",
        "#2969B0",
        "#553982",
        "#F7DA64",
        "#FBA026",
        "#EB6B56",
        "#E25041",
        "#A38F84",
        "#EFEFEF",
        "#FFFFFF",
        "#FAC51C",
        "#F37934",
        "#D14841",
        "#B8312F",
        "#7C706B",
        "#D1D5D8"
      ]
    },
    {
      name: 'toggleHeading',
      args: { level: 1 } 
    },
    {
      name: 'toggleHeading',
      args: { level: 2 } 
    },
    {
      name: 'toggleHeading',
      args: { level: 3 } 
    },
    {
      name: 'setTextAlign',
      args: 'left'
    },
    {
      name: 'setTextAlign',
      args: 'center'
    },
    {
      name: 'setTextAlign',
      args: 'right' 
    },
    'toggleOrderedList',
    'toggleBulletList',
    'toggleBlockquote',
    'toggleCodeBlock',
    {
      name: 'toggleLink',
      hasTooltip: 'link' ,
      tooltip: 'input'
    },
    'clearFormat'
  ],
}

export {
  controls
}