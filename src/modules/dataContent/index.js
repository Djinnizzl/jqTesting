import $ from 'jquery'

import dataContentConstants from '../constants/dataContent.js'


function dataContentWrapper () {

    let dataContentWrapperItem = $('<div>', {
        class: dataContentConstants.dataContentWrapper
    })


    return dataContentWrapperItem
}