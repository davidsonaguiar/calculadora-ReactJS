import './Button.css'

function Button({ content, className, click }) {
    return (
        <button 
        className={'button ' + className}
        onClick={(e) => click(e.target.innerHTML)}>
            {content}
        </button>
    )
}

export default Button