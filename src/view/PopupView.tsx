
// what types will this prop need to have?
const PopupView = (props:any) => {


    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={props.clickClose}>close</button>
                { props.children }
            </div>
        </div>
    ) : <></>
}

export default PopupView