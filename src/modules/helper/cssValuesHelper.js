


function extractTransformDataFromJqueryObject(jQElement) {
    
    let transformMatrix = 
        jQElement.css("-webkit-transform") ||
        jQElement.css("-moz-transform")    ||
        jQElement.css("-ms-transform")     ||
        jQElement.css("-o-transform")      ||
        jQElement.css("transform")

        
    transformMatrix = transformMatrix.replace(/^matrix\(|\)$/g, '')

    let transformMatrixArr = transformMatrix.split(',').map(item => item.trim()); 

    transformMatrixArr = transformMatrixArr.length < 6 ? [0,0,0,0,0,0] : transformMatrixArr

    return {
        scaleX: transformMatrixArr[0],
        skewY: transformMatrixArr[1],
        skewX: transformMatrixArr[2],
        scaleY: transformMatrixArr[3],
        translateX: transformMatrixArr[4],
        translateY: transformMatrixArr[5],
    }
}




export {
    extractTransformDataFromJqueryObject,
}