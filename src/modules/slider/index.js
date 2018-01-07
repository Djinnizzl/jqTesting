import $ from 'jquery'
import IScroll from 'vendor/iScroll/iscroll'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import sliderItem from './sliderItem'
import sliderBar from './sliderBar'
import { sliderSlideMultiple, sliderSlideSingle } from './sliderControls'
import sliderSelectors from '../constants/slider.js'

let sliderScroll


function sliderContainer(items = []) {

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

    new ResizeSensor(document.getElementById(sliderSelectors.sliderBar), function() {
        addIScroll()
    })
    addIScroll()

    return sliderContainerItem
}



function addIScroll() {
    if (sliderScroll) sliderScroll.destroy()
    sliderScroll = new IScroll('#' + sliderSelectors.sliderItemContainer, {                 
        scrollX: true, scrollY: false, mouseWheel: true,
        // momentum: false
    });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    sliderScroll.on('scrollStart', function() {
        window.ac.slider.state.scrollActive = true
    })
    sliderScroll.on('scrollEnd', function() {
        window.ac.slider.state.scrollActive = false
    })
    window.ac.slider.bindings.sliderScroll = sliderScroll
}


export default sliderContainer