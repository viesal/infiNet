import * as React from 'react';
import { TraficSignal } from '../TraficSignal';
import { Color } from '../TraficSignal/TraficSignal';

interface ComponentProps{
    selectedColor?: Color,
    listColor: Color[],
    parentId: number,
    onChangeData: (parentId: number, selectedColor: Color)=>void,
} 

export class TraficLight extends React.Component<ComponentProps> {

    onChangeSelectedColor(color: Color){
        this.props.onChangeData(this.props.parentId, color)
    }

    render() {
        return(<>
            <div className='trafic-light'>
                {this.props.listColor.map((item: any, index)=>{
                    return <TraficSignal 
                                key={index} 
                                color={item} 
                                isSelected={item===this.props.selectedColor}
                                onChangeSelected={this.onChangeSelectedColor.bind(this)}
                            />
                })}
            </div>
        </>)
    }
}