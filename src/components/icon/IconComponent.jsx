import { createElement } from "react"
import * as FontAwesome from "react-icons/fa"

const IconComponent = ({iconName, color, size}) => {
    const icon = createElement(FontAwesome[iconName])

    return <div style={{fontSize : size, color: color}}>{icon}</div>
}

export default IconComponent