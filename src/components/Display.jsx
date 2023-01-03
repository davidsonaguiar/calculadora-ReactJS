import './Display.css'

function Display({ value, children }) {
    return(
        <div className='display'>
            {children}
            {value}
        </div>
    )
}

export default Display