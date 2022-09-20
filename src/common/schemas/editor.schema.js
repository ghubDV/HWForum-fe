const controls = {
  activeStates: [
    ['bold'],
    ['italic'],
    ['underline'],
    ['strike'],
    null,
    null,
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
      name: 'setFontSize',
      hasTooltip: 'fontSize',
      tooltip: 'fontPicker',
      sizes: [
        "12px",
        "16px",
        "20px",
        "28px",
        "36px",
      ]
    },
    {
      name: 'setColor',
      hasTooltip: 'color',
      tooltip: 'colorPicker',
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