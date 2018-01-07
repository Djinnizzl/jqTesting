import $ from 'jquery'
import fe from 'lodash/forEach'

import sliderContainer from './modules/slider/index.js'




// const content = '<img src="http://lorempixel.com/1500/1500/" alt="yolo" />'

window.ac = {}

window.ac.data = {
    0: { img: '1.jpg', title: 'Schwarze Katze', description: 'Extrem Katzig' },
    1: { img: '2.png', title: 'Freakazoid', description: 'Qui a coupé le fromage' },
    2: { img: '3.jpg', title: 'Strand', description: 'Mit Palmen' },
    3: { img: '4.jpg', title: 'Fliegende Katze', description: 'Aus "Catballs"' },
    4: { img: '5.jpg', title: 'Dings', description: 'Ist das Kunst oder kann das weg?' },
    5: { img: '6.jpg', title: 'Auto', description: 'schnittiger roter Dosenöffner' },
    6: { img: '7.jpg', title: 'White Stripes', description: 'Elephant' },
    7: { img: '8.jpg', title: 'Clown', description: 'Geht ein Mann zum Arzt..' },
}

const testData = [];
fe(window.ac.data, data => { testData.push('<img src="./imges/' + data.img + '" alt="' + data.title + '" />') });


$(document).ready(function(){

    sliderContainer(testData)
})
