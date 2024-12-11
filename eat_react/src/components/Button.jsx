function Button ({children, selected, isActive}) {
    return (
    <button onClick={selected} className= {isActive ? "myBtn:active" : "myBtn"}> {children} </button>
    );

}

export default Button;