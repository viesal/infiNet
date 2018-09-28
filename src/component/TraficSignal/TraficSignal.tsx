import * as React from 'react';

type ComponentProps = {
    color: Color,
    isSelected: boolean,
    onChangeSelected: (color: Color) => void,
} 

export interface Color {
    color: 'red' | 'yellow' | 'green'
}

export class TraficSignal extends React.Component<ComponentProps> {

    handleClick(){
        this.props.onChangeSelected(this.props.color)
    }

    render() {
        const className = this.props.isSelected? 'trafic-signal-selected': '';
        return(<>
            <div className={`trafic-signal trafic-signal-${this.props.color} ${className}`}
                onClick={this.handleClick.bind(this)}
            ></div>
        </>)
    }
}