$(document).ready(function() {


    var pho=bg[Math.floor(Math.random()*bg.length)]
    t='<div class="pattern-attachment-img lazyload" style="background: url(\''+ pho +'\') center center / cover no-repeat;overflow:hidden;>"></div>'
    $(".pattern-center").append(t)
})