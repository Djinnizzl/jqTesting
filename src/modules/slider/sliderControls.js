import $ from 'jquery'

import sliderSelectors from '../constants/slider.js'
import { sliderSize, handleSlideSelect, getSliderItemWithSlideNumber } from './sliderFunctions'



function sliderSlideMultiple(direction, options = {}) {
    if (!direction) return null

    let sliderSlideMultipleItem = $('<div>', {
        text: direction,
        class: 'sliderControl sliderControl' + direction.charAt(0).toUpperCase() + direction.slice(1),
        'data-direction': direction
    })

    sliderSlideMultipleItem.click(function() {
        slideMultiple(direction)
    })

    return sliderSlideMultipleItem
}



function sliderSlideSingle(direction) {
    if (!direction) return null;

    let sliderSlideSingleItem = $('<div>', {
        text: direction == 'right' ? 'next' : 'prev',
        'data-direction': direction
    })

    sliderSlideSingleItem.click(function() {
        slideOne(direction)
    })

    return sliderSlideSingleItem
}



function slideOne(direction) {

    if (!direction || !window.ac || !window.ac.slider || !window.ac.slider.bindings.sliderScroll || !window.ac.slider.state.currentSlide && window.ac.slider.state.currentSlide != 0) {
        console.error('direction or sliderScrollObject missing')
        return null
    };

    let slideToSlide = 0
    
    const { sliderScroll } = window.ac.slider.bindings
    const { currentSlide, lastSlide } = window.ac.slider.state

    switch (direction) {
        case 'left':
            slideToSlide = (+currentSlide - +1 < 0) ? lastSlide : +currentSlide - +1 
            handleSlideSelect(getSliderItemWithSlideNumber(currentSlide), getSliderItemWithSlideNumber(slideToSlide))
            break;
            
            case 'right':
            slideToSlide = (+currentSlide + +1 > lastSlide) ? 0 : +currentSlide + +1 
            handleSlideSelect(getSliderItemWithSlideNumber(currentSlide), getSliderItemWithSlideNumber(slideToSlide))
            break;
    }

    const sliderSelector = '.' + sliderSelectors.sliderItem + '[data-nr="' + slideToSlide + '"]';

    sliderScroll.scrollToElement(sliderSelector, 300, (sliderSize() / 2 - $(sliderSelector).outerWidth() / 2) * (-1))
}



function slideMultiple(direction) {

    if (!direction || !window.ac || !window.ac.slider || !window.ac.slider.bindings.sliderScroll) {
        console.error('direction or sliderScrollObject missing')
        return null
    };

    const { sliderScroll } = window.ac.slider.bindings
    
    const sliderWidth = sliderSize()
    let sliderRange = 0
    
    const currentSlidePosition = sliderScroll.x
    switch (direction) {
        case 'left':
        sliderRange = sliderWidth * 0.9
        if (sliderRange + sliderScroll.x > 0) {
            sliderRange = sliderScroll.x * (-1)
        }
        break;
        
        case 'right':
        sliderRange = sliderWidth * 0.9 * (-1)
        if (sliderRange + sliderScroll.x < sliderScroll.maxScrollX) {
            sliderRange = sliderScroll.maxScrollX - sliderScroll.x
        }
        break;
    }
    
    sliderScroll.scrollBy(sliderRange, 0, 600);
}



export {
    sliderSlideMultiple,
    sliderSlideSingle,
    slideOne,
    slideMultiple,
}