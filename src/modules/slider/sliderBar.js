import $ from 'jquery'
import 'vendor/jqMobile/jquery.mobile.custom.min'

import sliderSelectors from '../constants/slider.js'
import sliderItem from './sliderItem.js'


function sliderBar (contentArray, options = {}) {

    contentArray = contentArray.map((item, index) => {
        return sliderItem(item, {'data-nr': index})
    })

    let sliderBarItem = $('<div>', {
        html: contentArray,
        id: sliderSelectors.sliderBar,
        css: {
            whiteSpace: 'nowrap',
            display: 'inline-block'
        }
    })

    return sliderBarItem;
}


function getWidthOfChildren(sliderBar) {
    let width = 0
    sliderBar.children().each(function() {
        width = +width + +getWidthOfChild($(this))
    })
    return width;
}


function getWidthOfChild(child) {
    
    // TODO: fix for em/rem/...
    let width = 0
    width = +width + +child.css('margin-left').replace(/[a-zA-Z]+/, '') 
    width = +width + +child.css('margin-right').replace(/[a-zA-Z]+/, '')
    width = +width + +child.outerWidth()
    return width
}


export default sliderBar