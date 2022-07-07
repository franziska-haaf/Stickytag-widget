// This is a counter widget with buttons to increment and decrement the number.

const {widget} = figma
const {useSyncedState, usePropertyMenu, AutoLayout, Text, useStickable, useEffect, Input} = widget

function Widget() {
    useStickable()

    const [tag, setTag] = useSyncedState('Tag text', 'Stickytag')

    const radiusOptions = [
        {option: '0', label: 'Rectangular'},
        {option: '8', label: 'Rounded'},
        {option: '400', label: 'Round'}
    ]
    const [radius, setRadius] = useSyncedState('Radius', '400')

    const tagLengthOptions = [
        {option: '80', label: 'Short'},
        {option: '140', label: 'Medium'},
        {option: '200', label: 'Long'},
    ]
    const [tagLength, setTagLength] = useSyncedState('Tag length', tagLengthOptions[0].option)

    const colors = [
        {option: '#ffffff', tooltip: 'White'},
        {option: '#FFC7C2', tooltip: 'Light red'},
        {option: '#FCD19C', tooltip: 'Light orange'},
        {option: '#FFE8A3', tooltip: 'Light yellow'},
        {option: '#AFF4C6', tooltip: 'Light green'},
        {option: '#BDE3FF', tooltip: 'Light blue'},
        {option: '#E4CCFF', tooltip: 'Light purple'},
        {option: '#F24822', tooltip: 'Red'},
        {option: '#FFA629', tooltip: 'Orange'},
        {option: '#FFCD29', tooltip: 'Yellow'},
        {option: '#14AE5C', tooltip: 'Green'},
        {option: '#0D99FF', tooltip: 'Blue'},
        {option: '#9747FF', tooltip: 'Purple'},
        {option: '#000000', tooltip: 'Black'}
    ]
    const [color, setColor] = useSyncedState('Color', colors[0].option)

    const fontSizes = [
        {option: '16', label: 'Small text'},
        {option: '24', label: 'Medium text'},
        {option: '40', label: 'Large text'},
    ]
    const [fontSize, setFontSize] = useSyncedState('Font size', fontSizes[0].option)

    /* Colors that are dark and should have white colored text */
    const darkColors = [
        '#000000', '#0D99FF', '#9747FF', '#14AE5C', '#F24822'
    ]

    const emojis = [
        {option: 'None', label: 'None'},
        {option: '👍', label: '👍'},
        {option: '👎', label: '👎'},
        {option: '❤', label: '❤'},
        {option: '💯', label: '💯'},
        {option: '❓', label: '❓'},
        {option: '❗', label: '❗'},
        {option: '✔', label: '✔'},
        {option: '❌', label: '❌'},
        {option: '🆕', label: '🆕'},
        {option: '😀', label: '😀'},
        {option: '🙁', label: '🙁'},
        {option: '😮', label: '😮'},
        {option: '😱', label: '😱'},
        {option: '💀', label: '💀'},
        {option: '💩', label: '💩'},
        {option: '🤖', label: '🤖'},
        {option: '👏', label: '👏'},
    ]
    const [emoji, setEmoji] = useSyncedState('Emoji', emojis[0].option)

    useEffect(() => {
        figma.ui.onmessage = (message) => {
            if (message.type === 'tag') {
                setTag(message.tag)
                figma.closePlugin()
            }
        }
    })

    usePropertyMenu(
        [
            {
                itemType: 'dropdown',
                propertyName: 'emoji',
                tooltip: 'Emoji selector',
                selectedOption: emoji,
                options: emojis,
            },
            {
                itemType: 'separator',
            },
            {
                itemType: 'dropdown',
                propertyName: 'fontSize',
                tooltip: 'Font size selector',
                selectedOption: fontSize,
                options: fontSizes,
            },
            {
                itemType: 'separator',
            },
            {
                itemType: 'dropdown',
                propertyName: 'tagLength',
                tooltip: 'Tag length selector',
                selectedOption: tagLength,
                options: tagLengthOptions,
            },
            {
                itemType: 'separator',
            },
            {
                itemType: 'dropdown',
                propertyName: 'radius',
                tooltip: 'Radius selector',
                selectedOption: radius,
                options: radiusOptions,
            },
            {
                itemType: 'separator',
            },
            {
                itemType: 'color-selector',
                propertyName: 'colors',
                tooltip: 'Color selector',
                selectedOption: color,
                options: colors,
            },
        ],
        ({propertyName, propertyValue}) => {
            if (propertyName === "emoji") {
                setEmoji(propertyValue)
            } else if (propertyName === "fontSize") {
                setFontSize(propertyValue)
            }else if (propertyName === "tagLength") {
                setTagLength(propertyValue)
            }else if (propertyName === "colors") {
                setColor(propertyValue)
            } else if (propertyName === "radius") {
                setRadius(propertyValue)
            }
        },
    )
    return (
        <AutoLayout
            verticalAlignItems={'center'}
            spacing={8}
            padding={parseInt(radius) > 16 ? {vertical: 8, horizontal: 16} : 8}
            cornerRadius={parseInt(radius)}
            fill={color}
        >
            <Text hidden={emoji === 'None'} fontSize={parseInt(fontSize)}>
                {emoji}
            </Text>
            <Input
                value={tag}
                placeholder="Stickytag"
                onTextEditEnd={(e) => {
                    setTag(e.characters);
                }}
                fill={darkColors.includes(color) ? '#ffffff': '#000000'}
                width={parseInt(tagLength)}
                fontSize={parseInt(fontSize)}
            />
        </AutoLayout>
    )
}

widget.register(Widget)
