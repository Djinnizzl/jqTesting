import $ from 'jquery';
import 'vendor/jqMobile/jquery.mobile.custom.min';

import sliderSelectors from '../constants/slider.js'
import { handleSlideSelect, getSliderItemWithSlideNumber } from './sliderFunctions'

export default function(content, options = {}) {

    let defaultOptions = {
        class: sliderSelectors.sliderItem,
        html: content
    };

    let mergedOptions = { ...defaultOptions, ...options }
    let sliderItem = $('<div>', mergedOptions);
    
    
    sliderItem.click(function(ev) {

        const { currentSlide, scrollActive } = window.ac.slider.state

        if (!scrollActive) {
            handleSlideSelect(getSliderItemWithSlideNumber(currentSlide), getSliderItemWithSlideNumber($(this).data('nr')))
            $('.debug').text('click ' + $(this).data('nr'))
            setTimeout(function() {
                $('.debug').text('')
            }, 200)
        }
    })

    return sliderItem
}