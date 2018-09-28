import * as React from 'react'
import { TraficLight } from '../TraficLight';
import { Color } from '../TraficSignal/TraficSignal';

export interface Person {
    id: number,
    name: string,
    color: string,
}

type ComponentProps = {
    data: Person[],
    color: Color[];
}

type ComponentState = {
    data: Person[],
    filterData: Person[],
    isLoadData: boolean,
    colorFilter: Color | undefined,
    textFilter: string,
}

export class App extends React.Component<ComponentProps, ComponentState> {

    state = {
        data: [],
        filterData: [],
        isLoadData: false,
        colorFilter: undefined,
        textFilter: '',
    }

    componentDidMount() {
        if (!this.state.isLoadData) {
            const state = {isLoadData: true, data: this.props.data}
            this.setState(state, this.filteredData)
        }
    }

    handleChangeData(parentId: number, selectedColor: Color){
        const data = this.state.data
        const personIndex = this.state.data.indexOf(this.state.data.filter((item)=>item.id===parentId)[0])
        data[personIndex].color = selectedColor
        this.setState({data: data}, this.filteredData)
    }

    handleFilterColor(parentId: number, selectedColor: Color){
        this.setState({colorFilter: selectedColor}, this.filteredData)
    }

    handleFilterText(e){
        this.setState({textFilter: e.target.value}, this.filteredData)
    }

    filteredData(){
        let data = this.state.data
        if (this.state.colorFilter){
            data = data.filter((item)=>item.color===this.state.colorFilter)
        }
        if (this.state.textFilter.length){
            data = data.filter(i=>(~i.name.toLowerCase().indexOf(this.state.textFilter.toLowerCase())))
        }
        this.setState({filterData: data}) 
    }
 
    render(){
        return ( <>
            <div className='app app-row'>
                <input 
                    placeholder="Поиск" 
                    className='disable-border'
                    onChange={(e)=>{this.handleFilterText(e)}}
                />
                <TraficLight
                    selectedColor={this.state.colorFilter}  
                    listColor={this.props.color}
                    parentId={1}
                    onChangeData={this.handleFilterColor.bind(this)}
                />
            </div>
            <div style={{ width: '300px', textAlign: 'right'}}>
                Найдено: {this.state.filterData.length} из {this.state.data.length}
            </div>
            <div style={{display: 'flex'}}>
                <div className='app app-scroll'>
                    {this.state.filterData.map((item, i)=> { 
                        return(
                        <div key={i} className='app-row'>
                            {item.name}
                            <TraficLight 
                                selectedColor={item.color} 
                                listColor={this.props.color}
                                parentId={item.id}
                                onChangeData={this.handleChangeData.bind(this)}
                            />
                        </div>)
                    })}
                </div>
                <div style={{margin: '10px'}}>
                    <div>Всего красных: {this.renderStatColor('red')}</div>
                    <div>Всего желтых: {this.renderStatColor('yellow')}</div>
                    <div>Всего зеленых: {this.renderStatColor('green')}</div>
                </div>
            </div>
            </>)
    }

    renderStatColor(color: string){
        return this.state.data.filter((item)=>item.color===color).length
    }
}