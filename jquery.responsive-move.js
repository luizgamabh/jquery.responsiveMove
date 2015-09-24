$.fn.responsiveMove = function (options, goAheadCallback, goBackCallback) {
    if (typeof goAheadCallback === 'undefined') goAheadCallback = false;
    if (typeof goBackCallback === 'undefined') goBackCallback = false;
    options = $.extend({
        target: null,
        wrapper: null,
        mode: 'prepend', //prepend, append, after w/ prevElement, placeholder w/ placeholderElement
        prevElement: null,
        placeholderElement: null,
        break: 768 // default break :)
    }, options);
    var uid = function (digits) {
        //var args = arguments;
        var args = [].slice.call(arguments).splice(1);

        function repeatAndEval(zeros) {
            var value = "0x1";
            while (zeros--) value += "0";
            return eval(value);
        }

        function rand(x) {
            var concat = "";
            while (x--)
                concat += Math.floor((1 + Math.random()) * repeatAndEval(digits)).toString(16).substring(1);
            return concat;
        }

        return (function () {
            var reply = new Array();
            for (var i = 1; i < args.length; i++)
                reply.push(rand(args[i]));
            return reply.join("-");
        })();
    };
    var broken = false,
            lastW = 0;
    var moveTo = function (elem, target, wrapper, mode, callback) {
        var el;
        if (wrapper) {
            el = $(wrapper);
            elem.detach().appendTo(el);
            if (mode == 'prepend') el.prependTo(target);
            else if (mode == 'append') el.appendTo(target);
            else if (mode == 'after') el.insertAfter(target);
        } else if (!wrapper && options.wrapper) { //voltando para a posição original, removendo o wrapper :)
            el = elem;
            el.unwrap();
            if (mode == 'prepend') el.detach().prependTo(target);
            else if (mode == 'append') el.detach().appendTo(target);
            else if (mode == 'after') el.detach().insertAfter(target);
        } else {
            el = elem;
            if (mode == 'prepend') el.prependTo(target);
            else if (mode == 'append') el.appendTo(target);
            else if (mode == 'after') el.insertAfter(target);
        }
        callback && callback();
    };
    return this.each(function () {
        var _this = this,
                $this = $(_this),
                _window = window,
                $window = $(_window),
                _innerWidth = _window.innerWidth,
                elementParent = $this.parent(),
                elementSiblingLeft = $this.prev().length ? $this.prev().addClass("placeholder-" + uid(4, 2, 1, 1, 2)) : null;
        if ((lastW = _innerWidth) <= options.break) broken = true;
        $(document).ready(function () {
            if (broken) {
                //move o elemento
                moveTo($this, options.target, options.wrapper, options.mode, goAheadCallback);
            }
        });
        $window.on("resize", function () {
            if (broken && (lastW = _window.innerWidth) > options.break) {
                broken = false;
                //retorna o elemento para o local inicial
                //console.log('mover para cima');
                if (elementSiblingLeft) moveTo($this, elementSiblingLeft, null, 'after', goBackCallback);
                else moveTo($this, elementParent, null, 'prepend', goBackCallback);
            } else if (!broken && (lastW = _window.innerWidth) <= options.break) {
                broken = true;
                //move o elemento
                moveTo($this, options.target, options.wrapper, options.mode, goAheadCallback);
            }
        });
    });
};