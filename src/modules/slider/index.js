import $ from 'jquery'
import IScroll from 'vendor/iScroll/iscroll'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import sliderItem from './sliderItem'
import sliderBar from './sliderBar'
import { sliderSlideMultiple, sliderSlideSingle } from './sliderControls'
import sliderSelectors from '../constants/slider.js'

let sliderScroll



// slider index file - > evtl aufbohren, dass das targetelement angegeben werden kann
function sliderContainer(items = []) {

    // in der main index.js erwähnte spezifische erweiterung des state objekts
    window.ac.slider = {
        state: {
            scrollActive: false,
            currentSlide: 0,
            lastSlide: items.length ? items.length - 1 : 0,
            sliderAtStart: false,
            sliderAtEnd: false
        },
        bindings: {
            sliderScroll: false
        }
    };



    $('#' + sliderSelectors.sliderContainer).append(sliderSlideMultiple('left'))
    let sliderContainerItem = $('#' + sliderSelectors.sliderContainer).append($('<div>', {
        id: sliderSelectors.sliderItemContainer,
        css: {
            overflowX: 'hidden',
            // display: 'inline-block',
            // maxWidth: '800px',
            // transition: '.6s'
        },
        html: sliderBar(items),
    }))

    $('#' + sliderSelectors.sliderContainer).append(sliderSlideMultiple('right'))
    $('#' + sliderSelectors.sliderContainer).append(sliderSlideSingle('left'))
    $('#' + sliderSelectors.sliderContainer).append(sliderSlideSingle('right'))


    // resize"scanner" kann leider nicht über einen css selector ausgewählt werden - es muss ein explizites element angegeben werden
    new ResizeSensor(document.getElementById(sliderSelectors.sliderBar), function() {
        addIScroll()
    })
    addIScroll()

    return sliderContainerItem
}



function addIScroll() {

    // iscroll wird nicht überschrieben sondern zusätzlich hinzugefügt, was dazu führt, dass zb das
    // IScroll.scroll (ob aktiv gescrollt wird) buggy wird (multiples on/off)
    if (sliderScroll) sliderScroll.destroy()
    sliderScroll = new IScroll('#' + sliderSelectors.sliderItemContainer, {
        scrollX: true, scrollY: false, mouseWheel: true,
        // momentum: false
    });

    // c&p von example - scheinbar zum verhindern von mobiledefault behaviour
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    // wichtig, damit beim scrollen kein clickevent der einzelnen slides ausgelöst wird (wenn gescrollt
    // wird bleibt die maus auf dem slideritem (das wandert ja mit), was einen klick auslöst
    sliderScroll.on('scrollStart', function() {
        window.ac.slider.state.scrollActive = true
    })
    sliderScroll.on('scrollEnd', function() {
        window.ac.slider.state.scrollActive = false
    })
    // IScroll pageweit verfügbar machen
    window.ac.slider.bindings.sliderScroll = sliderScroll
}


export default sliderContainer
