import $ from 'jquery';

function clickNoSwipe (element, callback) {

    let xBefore;
    let yBefore;
    let tollerance = 5;

    $(element).on('mousedown', ev => {
        xBefore = ev.clientX
        yBefore = ev.clientY
    })

    $(element).on('mouseup', ev => {
        if(Math.abs(xBefore) - Math.abs(ev.clientX) < tollerance && Math.abs(ev.clientY) - Math.abs(yBefore) < tollerance) {
            callback()
        }
    })

    return $(element);
}


export {
    clickNoSwipe
}
