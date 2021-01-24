$(document).ready(function() {
    rad=Math.floor(Math.random()*bg.length)
    var pho=bg[rad]
    t='<div class="pattern-attachment-img lazyload" style="background: url(\''+ pho +'\') center center / cover no-repeat;overflow:hidden;"></div>'
    $(".pattern-center").append(t)
})