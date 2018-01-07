import $ from 'jquery'

import dataContentConstants from '../constants/dataContent.js'


function setContentFromSlideNumber(activeSlideNr) {

    const { data } = window.ac

    $('.' + dataContentConstants.dataContentWrapper).html('<div class="title">' + data[activeSlideNr].title + '</div><div class="description">' + data[activeSlideNr].description + '</div>')
}

export {
    setContentFromSlideNumber
}