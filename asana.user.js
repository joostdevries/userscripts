// ==UserScript==
// @name         Asana prokeys
// @namespace    joostdevries
// @version      0.5.2
// @description  Extra tab-based hotkeys for Asana pros
// @author       Joost de Vries
// @match        https://app.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        var tabKeyDown = false;

        var respondKeyDown = function(event) {
            if(event.code == 'Tab') {
                tabKeyDown = true;
            }
        }

        var respondKeyPress = function(event) {
        };

        var respondKeyUp = function(event) {

            if(event.code == 'Tab') {
                tabKeyDown = false;
            }

            if(!tabKeyDown) {
                return true;
            }

            switch (event.code) {
                case 'Digit0':
                    document.getElementsByClassName('Topbar-myTasksButton')[0].click();
                    break;
                case 'Digit9':
                    document.getElementsByClassName('Topbar-notificationsButton')[0].click();
                    break;
                case 'Digit7':
                    document.querySelectorAll('[title="Next 7 days"]')[0].click();
                    break;
                case 'Minus':
                    document.getElementsByClassName('closeDetailsPaneX')[0].click();
                    break;
                case 'Equal':
                    document.querySelector('.Topbar-navButton').click();
                    break;
            }

            var focusElement = document.querySelector('input:focus');
            if (focusElement && (focusElement.id == 'property_sheet:details_property_sheet_field:due_date' ||
                                 focusElement.className.indexOf('DueDateInput-input')!==-1)) {
                switch (event.code) {
                    case 'Digit1':
                        focusElement.value='today';
                        event.preventDefault();
                        break;
                    case 'Digit2':
                        focusElement.value='+1 day';
                        event.preventDefault();
                        break;
                    case 'Digit3':
                        focusElement.value='+1 week';
                        event.preventDefault();
                        break;
                    case 'Digit4':
                        focusElement.value='+2 weeks';
                        event.preventDefault();
                        break;
                    case 'Digit5':
                        focusElement.value='+4 weeks';
                        event.preventDefault();
                        break;
                }
                focusElement.dispatchEvent(new Event('change',{bubbles: true}));
            }
        };

        document.addEventListener('keydown', respondKeyDown);
        document.addEventListener('keyup', respondKeyUp);
        document.addEventListener('keypress', respondKeyPress);
})();