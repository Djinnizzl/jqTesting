import $ from 'jquery'
// import ldGet from 'lodash.get';

import sliderSelectors from '../constants/slider.js'
import { setContentFromSlideNumber } from '../dataContent/dataContentFunctions.js'


// generelle funktionen, die von überall genutzt werden können..


function sliderSize() {
    return $('#' + sliderSelectors.sliderItemContainer).outerWidth()
}


// nicht nur bei click - sondern auch bei next / prev
function handleSlideSelect(previousSlide, nextSlide) {

    const { sliderScroll } = window.ac.slider.bindings

    window.ac.slider.state.currentSlide = nextSlide.data('nr')
    $('.' + sliderSelectors.sliderItem).removeClass('active')
    nextSlide.addClass('active')

    const nextSlideSelector = '.' + sliderSelectors.sliderItem + '[data-nr="' + nextSlide.data('nr') + '"]';

    sliderScroll.scrollToElement(nextSlideSelector, 300, (sliderSize() / 2 - nextSlide.outerWidth() / 2) * (-1))

    playerSetSlide(nextSlide.data('nr'))
    setContentFromSlideNumber(nextSlide.data('nr'))
}

// spezifisches sliderelement zurueckgeben
function getSliderItemWithSlideNumber(number) {
    return $('.' + sliderSelectors.sliderItem + '[data-nr="' + number + '"]')
}


// function die bestimmt was im fetten showelement gezeigt werden soll wenn was geklickt wird
function playerSetSlide(slideNumber) {

    const dataObject = window.ac.data

    $('#' + sliderSelectors.sliderShowFrame).html('<img src="./imges/' + dataObject[slideNumber].img + '">')
}


export {
    sliderSize,
    handleSlideSelect,
    getSliderItemWithSlideNumber
}
