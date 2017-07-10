// ==UserScript==
// @name         Asana prokeys
// @namespace    joostdevries
// @version      0.3
// @description  Extra tab-based hotkeys for Asana pros
// @author       Joost de Vries
// @match        https://app.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
            case 'Digit2':
                document.querySelector('input:focus').value='next week';
                break;
            case 'Digit2':
                document.querySelector('input:focus').value='next month';
                break;
            case 'Equal':
                document.querySelector('.Topbar-navButton').click();
                break;
        }
    };
    document.addEventListener('keydown', respondKeyDown);
    document.addEventListener('keyup', respondKeyUp);
})();