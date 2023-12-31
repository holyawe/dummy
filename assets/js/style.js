(function() {
    "use strict";
    var pnls = document.querySelectorAll('.panel').length,
        scdir, hold = false;

    function _scrollY(obj) {
        var slength, plength, pan, step = 100,
            vh = window.innerHeight / 100,
            vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
        if ((this !== undefined && this.id === 'container') || (obj !== undefined && obj.id === 'container')) {
            pan = this || obj;
            plength = parseInt(pan.offsetHeight / vh);
        }
        if (pan === undefined) {
            return;
        }
        plength = plength || parseInt(pan.offsetHeight / vmin);
        slength = parseInt(pan.style.transform.replace('translateY(', ''));
        if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
            slength = slength - step;
        } else if (scdir === 'down' && slength < 0) {
            slength = slength + step;
        } else if (scdir === 'top') {
            slength = 0;
        }
        if (hold === false) {
            $('.animasi1').removeClass('animate__fadeIn');
            $('.animasi2').removeClass('animate__fadeInUp');
            hold = true;
            pan.style.transform = 'translateY(' + slength + 'vh)';
            setTimeout(function() {
                $('.animasi1').addClass('animate__fadeIn');
                $('.animasi2').addClass('animate__fadeInUp');
            }, 50);
            setTimeout(function() {
                hold = false;
            }, 1000);
        }
    }

    function _swipe(obj) {
        var swdir,
            sX,
            sY,
            dX,
            dY,
            threshold = 100,
            /*[min distance traveled to be considered swipe]*/
            slack = 50,
            /*[max distance allowed at the same time in perpendicular direction]*/
            alT = 500,
            /*[max time allowed to travel that distance]*/
            elT, /*[elapsed time]*/
            stT; /*[start time]*/
        obj.addEventListener('touchstart', function(e) {
            var tchs = e.changedTouches[0];
            swdir = 'none';
            sX = tchs.pageX;
            sY = tchs.pageY;
            stT = new Date().getTime();
        }, false);

        obj.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);

        obj.addEventListener('touchend', function(e) {
            var tchs = e.changedTouches[0];
            dX = tchs.pageX - sX;
            dY = tchs.pageY - sY;
            elT = new Date().getTime() - stT;
            if (elT <= alT) {
                if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
                    swdir = (dX < 0) ? 'left' : 'right';
                } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
                    swdir = (dY < 0) ? 'up' : 'down';
                }
                if (obj.id === 'container') {
                    if (swdir === 'up') {
                        scdir = swdir;
                        _scrollY(obj);
                    } else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
                        scdir = swdir;
                        _scrollY(obj);
                    }
                    e.stopPropagation();
                }
            }
        }, false);
    }
    var container = document.getElementById('container');
    container.style.transform = 'translateY(0)';
    container.addEventListener('wheel', function(e) {
            $('.animasi1').removeClass('animate__fadeIn');
            $('.animasi2').removeClass('animate__fadeInUp');

        if (e.deltaY < 0) {
            scdir = 'down';
        }
        if (e.deltaY > 0) {
            scdir = 'up';

        }
        setTimeout(function(){
            $('.animasi1').addClass('animate__fadeIn');
            $('.animasi2').addClass('animate__fadeInUp');

        }, 50);
        e.stopPropagation();
    });
    container.addEventListener('wheel', _scrollY);
    _swipe(container);

})();
