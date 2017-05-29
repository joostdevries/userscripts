// ==UserScript==
// @name         Asana prokeys
// @namespace    joostdevries
// @version      0.2
// @description  Extra tab-based hotkeys for Asana pros
// @author       Joost de Vries
// @match        https://app.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var simulateKeyUp = function(elem) {
        var keyboardEvent = document.createEvent("KeyboardEvent");
        var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


        keyboardEvent[initMethod](
                           "keydown", // event type : keydown, keyup, keypress
                            true, // bubbles
                            true, // cancelable
                            window, // viewArg: should be window
                            false, // ctrlKeyArg
                            false, // altKeyArg
                            false, // shiftKeyArg
                            false, // metaKeyArg
                            40, // keyCodeArg : unsigned long the virtual key code, else 0
                            0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
        );
        elem.dispatchEvent(keyboardEvent);
    };

    var customAsanaKbdShortcutsTabDown = false;
    var respondKeyDown = function(event) {
        if (event.code == 'Tab') {
            customAsanaKbdShortcutsTabDown = true;
        }
    };
    var respondKeyUp = function(event) {
        if (event.code == 'Tab') {
            customAsanaKbdShortcutsTabDown = false;
        }
        if(!customAsanaKbdShortcutsTabDown) {
            return true;
        }
        console.log(event.code);
        switch (event.code) {
            case 'Digit0':
                document.getElementsByClassName('Topbar-myTasksButton')[0].click();
                break;
            case 'Digit7':
                document.querySelectorAll('[title="Next 7 days"]')[0].click();
                break;
            case 'Minus':
                document.getElementsByClassName('SingleTaskPaneToolbar-closeButton')[0].click();
                break;
            case 'Space':
                prompt('Cmd+C', window.location.href);
                break;
            case 'Digit1':
                document.querySelector('input:focus').value='today';
                break;
            case 'Digit2':
                document.querySelector('input:focus').value='tomorrow';
                break;
            case 'Equal':
                document.querySelector('.Topbar-navButton').click();
                break;
        }
    };
    document.addEventListener('keydown', respondKeyDown);
    document.addEventListener('keyup', respondKeyUp);
})();