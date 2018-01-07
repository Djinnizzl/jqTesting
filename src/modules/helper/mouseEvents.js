import $ from 'jquery';

function clickNoSwipe (callback) {
    
    let xBefore;
    let yBefore;
    let tollerance = 5;

    this.on('mousedown', ev => {
        xBefore = ev.clientX
        yBefore = ev.clientY
    })
    
    this.on('mouseup', ev => {
        if(Math.abs(xBefore) - Math.abs(ev.clientX) < tollerance && Math.abs(ev.clientY) - Math.abs(yBefore) < tollerance) {
            console.log('test')
            callback(this)
        }
    })

    return this;
}


export {
    clickNoSwipe
}