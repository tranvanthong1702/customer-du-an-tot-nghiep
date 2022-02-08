
var buttonShowMenu = $('.show-menu__header1')
var closeMenu = $('.over-lay');
if (typeof buttonShowMenu != 'undefined') {
    buttonShowMenu.click(function () {
        console.log('hi')
        $('.menu-mobile').addClass('active');
        $('.over-lay').addClass('show');
        $('body').addClass('show-menu');
    })
}
if (typeof closeMenu != 'undefined') {
    closeMenu.click(function () {
        console.log('hi')
        $('.menu-mobile').removeClass('active');
        $('.over-lay').removeClass('show');
        $('body').removeClass('show-menu');
    })
}