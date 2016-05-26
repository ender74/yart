//needed for Android
function polyfillAssign() {
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict'
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object')
                }

                var output = Object(target)
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index]
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey]
                            }
                        }
                    }
                }
                return output
            }
        })()
    }
}

//needed for webkit / safari
function polyfillIntl() {
    if (!global.Intl) {
        require('intl')
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        require('intl/locale-data/jsonp/es.js')
        require('intl/locale-data/jsonp/fr.js')
    }
}

//needed for Edge / Internet Explorer

function polyfillIncludes() {
    if (!Array.prototype.includes) {
        Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
            'use strict';
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) {
                return false;
            }
            var n = parseInt(arguments[1]) || 0;
            var k;
            if (n >= 0) {
                k = n;
            } else {
                k = len + n;
                if (k < 0) {k = 0;}
            }
            var currentElement;
            while (k < len) {
                currentElement = O[k];
                if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                    return true;
                }
                k++;
            }
            return false;
        };
    }
}


function polyfillPromise() {
    require('es6-promise').polyfill()
}

export default () => {
    polyfillPromise()
    polyfillAssign()
    polyfillIntl()
    polyfillIncludes()
}
