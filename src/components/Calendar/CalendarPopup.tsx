
// what types will this prop need to have?
const CalendarPopup = (props:any) => {


    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={props.clickClose}>close</button>
                { props.children }
                <button onClick={props.submitFunction}>Submit Date</button>
            </div>
        </div>
    ) : <></>
}

export default CalendarPopup