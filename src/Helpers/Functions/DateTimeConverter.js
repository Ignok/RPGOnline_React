
export function DatetimeToLocaleDateString(date){
    let date_result=new Date(date).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    return date_result
}

export function DateToLocaleDateString(date){
    let date_result=new Date(date).toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric'});
    return date_result
}