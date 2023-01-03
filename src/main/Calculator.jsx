import './Calculator.css'
import { useState } from 'react'
import Button from '../components/Button'
import Display from '../components/Display'

const initalState= {
    displayValue: '0',
    clearDisplay: true,
    operation: null,
    values: [0, 0],
    current: 0,
}

const funOperator = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
}

function Calculator() {

    const [ state, setState ] = useState(initalState)
    const {
        displayValue,
        clearDisplay,
        operation,
        values,
        current } = state


    function clearMemory() {
        setState(initalState)
    }

    function setOperation(operator) {
        if(current === 0) {
            setState({...state, current: 1, operation: operator, clearDisplay: true})
        } else {
            const equals = operator === '='
            const saveValues = [...values]

            try {
                saveValues[0] = saveValues.reduce(funOperator[operation])
            } catch (e) {
                saveValues[0] = values[0]
                console.erro(e)
            }

            saveValues[1] = 0
            setState({
                displayValue: saveValues[0],
                operation: equals? null: operator,
                values: saveValues,
                current: equals ? 0: 1,
                clearDisplay: !equals,
            })
        }
    }

    function addDig (dig) {
        if(dig === '.' && displayValue.includes('.')) return ''

        const currentValue = displayValue === '0' || clearDisplay ? '' : displayValue
        const display = currentValue + dig

        if(dig !== '.') {
            const numberValue = parseFloat(display)
            const newValues = [...values]
            newValues[current] = numberValue
            setState({...state, values: newValues, displayValue: display, clearDisplay: false})
        } else {
            setState({...state, displayValue: display, clearDisplay: false})
        }
    }  

    return (
        <div className='calculator'>
            <Display value={displayValue}>
                <Button className='clear'content='AC' click={clearMemory}/>
            </Display>
            <Button content='7' click={addDig}/>
            <Button content='8' click={addDig}/>
            <Button content='9' click={addDig}/>
            <Button className='operation' content='*' click={setOperation}/>
            <Button content='4' click={addDig}/>
            <Button content='5' click={addDig}/>
            <Button content='6' click={addDig}/>
            <Button className='operation' content='/' click={setOperation}/>
            <Button content='1' click={addDig}/>
            <Button content='2' click={addDig}/>
            <Button content='3' click={addDig}/>
            <Button className='operation' content='-' click={setOperation}/>
            <Button content='.' click={addDig}/>
            <Button content='0' click={addDig}/>
            <Button content='=' click={setOperation}/>
            <Button className='operation' content='+' click={setOperation}/>
        </div>
    )
}

export default Calculator