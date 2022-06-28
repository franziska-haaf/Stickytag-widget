// This is a counter widget with buttons to increment and decrement the number.

const {widget} = figma
const {useSyncedState, usePropertyMenu, AutoLayout, Text, useStickable, useEffect} = widget

function Widget() {
    useStickable()
    const [tag, setTag] = useSyncedState('Tag text', 'Enter text for tag')

    const radiusOptions = [{option: '0', label: 'None'}, {option: '8', label: 'Slightly'}, {
        option: '400',
        label: 'Round'
    }]
    const [radius, setRadius] = useSyncedState('Radius', '400')

    const colors = [{option: '#ffffff', tooltip: 'White'}, {option: '#FFC7C2', tooltip: 'Light red'}, {
        option: '#FCD19C',
        tooltip: 'Light orange'
    }, {option: '#FFE8A3', tooltip: 'Light yellow'}, {option: '#AFF4C6', tooltip: 'Light green'}, {
        option: '#BDE3FF',
        tooltip: 'Light blue'
    }, {option: '#E4CCFF', tooltip: 'Light purple'},
        {option: '#F24822', tooltip: 'Red'}, {option: '#FFA629', tooltip: 'Orange'}, {
            option: '#FFCD29',
            tooltip: 'Yellow'
        }, {option: '#14AE5C', tooltip: 'Green'}, {option: '#0D99FF', tooltip: 'Blue'}, {
            option: '#9747FF',
            tooltip: 'Purple'
        }, {option: '#000000', tooltip: 'Black'}]
    const [color, setColor] = useSyncedState('Color', colors[0].option)

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
                itemType: 'action',
                tooltip: 'Edit text',
                propertyName: 'setTagText'
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
                itemType: 'color-selector',
                propertyName: 'colors',
                tooltip: 'Color selector',
                selectedOption: color,
                options: colors,
            },
        ],
        ({propertyName, propertyValue}) => {
            if (propertyName === "setTagText") {
                return new Promise((resolve) => {
                    figma.showUI(__html__);
                    figma.ui.resize(300,104)
                })

            } else if (propertyName == "colors") {
                setColor(propertyValue)
            } else if (propertyName == "radius") {
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
            <Text
                fill={color == '#000000' ? '#ffffff' : '#000000'}
            >
                {tag}
            </Text>
        </AutoLayout>
    )
}

widget.register(Widget)
