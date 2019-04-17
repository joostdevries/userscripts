// ==UserScript==
// @name         Asana prokeys
// @namespace    joostdevries
// @version      0.6.0
// @description  Extra tab-based hotkeys for Asana pros
// @author       Joost de Vries
// @match        https://app.asana.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        var TIME_EST_CLS = 'time-est';
        var DUR_REGEX = / ?\[([0-9]+m?h?)\]/;
        var START_REGEX = /^\[([0-9]+:[0-9]+)\] ?/;

        function clearTimeEstimates() {
          document.querySelectorAll('.' + TIME_EST_CLS).forEach(function(timeEstElement) {
            timeEstElement.remove();
          });
        }

        function pad(n) {
          return n<10 ? '0'+n : n;
        }

        function addTimeEstimates() {
          var allTaskRows = document.querySelectorAll('.TaskRow');
          var currentStartTime = new Date();
          allTaskRows.forEach(function(taskRow) {
            var durationSeconds = 20 * 60;
            var taskName = taskRow.querySelector('.TaskName textarea').value;
            if (taskName == ' ') {
              return;
            }
            var durationData = taskName.match(DUR_REGEX);
            var startTimeData = taskName.match(START_REGEX);
            if(durationData) {
              var durationModifier = durationData[1][durationData[1].length-1];
              var durationSeconds = parseInt(durationData[1].replace(durationModifier, ''), 10) * ((durationModifier=='m') ? 60 : 3600);
              taskName = taskName.replace(durationData[0], '');
            }
            if(startTimeData) {
              var startHours = parseInt(startTimeData[1].split(':')[0], 10);
              var startMinutes = parseInt(startTimeData[1].split(':')[1], 10);
              currentStartTime.setHours(startHours);
              currentStartTime.setMinutes(startMinutes);
              taskName = taskName.replace(startTimeData[0], '');
            }
            var endTime = new Date(currentStartTime.getTime() + durationSeconds * 1000);
            var startTimeString = pad(currentStartTime.getHours()) + ':' + pad(currentStartTime.getMinutes());
            var endTimeString = pad(endTime.getHours()) + ':' + pad(endTime.getMinutes());
            currentStartTime = endTime
            console.log(taskName, startTimeString, endTimeString);

            var timeEstimateElement = document.createElement('div');
            timeEstimateElement.style = 'postition: absolute; font-size:10px;';
            timeEstimateElement.innerText = startTimeString + ' - ' + endTimeString;
            timeEstimateElement.className = TIME_EST_CLS;
            taskRow.appendChild(timeEstimateElement);
          });
        }


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
                case 'Digit8':
                    document.querySelector('.MyTasksGridHeader-settingsMenu').click();
                    document.querySelector('.GridSortSection-button').click();
                    document.querySelector('.GridSortSection-option.GridViewDropdownContents-sortSectionSortByDueDate').click();
                    break;
                case 'Digit7':
                    clearTimeEstimates();
                    addTimeEstimates();
                    break;
                case 'Minus':
                    document.getElementsByClassName('closeDetailsPaneX')[0].click();
                    break;
                case 'Equal':
                    try {document.querySelector('.ExpandSidebarButton-toggleIcon').dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));}catch(e){}
                    try {document.querySelector('.Topbar-navButton').click();}catch(e){}
                    break;
                case 'Digit6':
                    prompt('Hit Cmd + C', location.href.replace(location.href.split('/')[4],'0'));
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
