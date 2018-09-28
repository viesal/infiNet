import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/style.css';
import {App} from './component/app';
import {Person} from './component/app/app';
import {Color} from './component/TraficSignal/TraficSignal';

const color: Color[] = ['red', 'yellow', 'green'] as any as Color[];

const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
             'l', 'm', 'n', 'o', 'p' ,'q', 'r', 's', 't', 'u', 'v',
             'w', 'x', 'y', 'z']

function randomNum(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getWord(abc, length) {
    const word = [];
    for (let i=0; i<length; i++){
        word.push(abc[randomNum(0, abc.length)])
    }
    return word.join('')
}

console.log(getWord(abc, 8))

function getData(): Person[]{
    let arr = []
    for (let i=0; i< 100; i++){
        arr.push({id: i, name: getWord(abc, randomNum(4, 10)), color: color[randomNum(0, 2)]})
    }
    return arr;
};


ReactDOM.render(
    <App data={getData()} color={color}/>,
    document.getElementById('app')
);