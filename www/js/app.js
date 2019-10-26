var img_url = 'http://kreaserv.com/askloud/assets/uploads/';
var api_url = 'http://kreaserv.com/askloud/index.php/api/';

var myApp = new Framework7({
    // swipePanel: 'left',
    material: true,
    preloadPreviousPage: false,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    modalTitle: 'Pettato',
    imagesLazyLoadPlaceholder: 'img/lazyload.jpg',
    imagesLazyLoadThreshold: 50,
    statusbar: {
        iosOverlaysWebView: true,
    },
});

var mainView = myApp.addView('.view-main', {});

myApp.onPageInit('index', function(page) {
});

myApp.onPageInit('login', function(page) {
});

myApp.onPageInit('register', function(page) {
});

myApp.onPageInit('dashboard', function(page) {
    load_poll_list();
});

myApp.onPageInit('create-multiple-options', function(page) {
});

myApp.onPageInit('create-a-b', function(page) {
});

myApp.onPageInit('create-rating', function(page) {
});
