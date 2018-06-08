/**
 * calendarDemoApp - 0.1.3
 */

app.controller('FullcalendarCtrl', ['$scope', function($scope) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that pulls from google.com */
    $scope.eventSource = {
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */
    $scope.events = [
      {title:'货币对【0.00%】', start: new Date(y, m, d + 1), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 1), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 1), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 1), allDay: true, className: ['b-l b-3x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 1), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 2), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 2), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 2), allDay: true, className: ['b-l b-3x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 2), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 3), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 3), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 3), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 3), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 4), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 4), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 4), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 4), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 5), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 5), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 5), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 5), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 6), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 6), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 6), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 6), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 7), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 7), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 7), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 7), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 8), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 8), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 8), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 8), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 9), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 9), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 9), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 9), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 10), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 10), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 10), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 10), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'原油【0.00%】', start: new Date(y, m, d + 11), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'美股【0.00%】', start: new Date(y, m, d + 11), allDay: true, className: ['b-l b-2x'], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.00%】', start: new Date(y, m, d + 11), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'★比特币【0.00%】', start: new Date(y, m, d + 11), allDay: true, className: ['b-l b-2x '], backgroundColor: '#edf1f2', textColor: '#000'},
      {title:'货币对【0.32%】', start: new Date(y, m, d - 1), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#fad733'},
      {title:'★比特币【0.22%】', start: new Date(y, m, d - 1), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#23b7e5'},
      {title:'原油【0.42%】', start: new Date(y, m, d - 1), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#7266ba'},
      {title:'美股【0.52%】', start: new Date(y, m, d - 1), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#428bca'},
      {title:'货币对【0.32%】', start: new Date(y, m, d - 2), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#fad733'},
      {title:'★比特币【0.22%】', start: new Date(y, m, d - 2), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#23b7e5'},
      {title:'原油【0.42%】', start: new Date(y, m, d - 2), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#7266ba'},
      {title:'美股【0.52%】', start: new Date(y, m, d - 2), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#428bca'},
      {title:'货币对【0.32%】', start: new Date(y, m, d - 3), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#fad733'},
      {title:'★比特币【0.22%】', start: new Date(y, m, d - 3), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#23b7e5'},
      {title:'原油【0.42%】', start: new Date(y, m, d - 3), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#7266ba'},
      {title:'美股【0.52%】', start: new Date(y, m, d - 3), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#428bca'},
      {title:'货币对【0.32%】', start: new Date(y, m, d), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#fad733'},
      {title:'★比特币【0.22%】', start: new Date(y, m, d), allDay: true, className: ['b-l b-2x '], backgroundColor: 'transparent', textColor: '#23b7e5'},
      {title:'原油【0.42%】', start: new Date(y, m, d), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#7266ba'},
      {title:'美股【0.52%】', start: new Date(y, m, d), allDay: true, className: ['b-l b-2x'], backgroundColor: 'transparent', textColor: '#428bca'}
      // {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location:'Rio', info:'Do not forget to watch.'},
      // {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info:'Family party'},
      // {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location:'HD City', info:'It is a long long event'},
      // {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location:'Tokyo', info:'Tokyo Game Racing'},
      // {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location:'New York', info:'Party all day'},
      // {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location:'Home Town', info:'Repeat every day'},      
      // {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-2x b-primary']},
      // {title:'Feed cat', start: new Date(y, m+1, 6, 18, 0), className: ['b-l b-2x b-info']}
    ];

    /* alert on dayClick */
    // $scope.precision = 400;
    // $scope.lastClickTime = 0;
    // $scope.alertOnEventClick = function( date, jsEvent, view ){
    //   var time = new Date().getTime();
    //   if(time - $scope.lastClickTime <= $scope.precision){
    //       $scope.events.push({
    //         title: 'New Event',
    //         start: date,
    //         className: ['b-l b-2x b-info']
    //       });
    //   }
    //   $scope.lastClickTime = time;
    // };
    /* alert on Drop */
    // $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
    //    $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    // };
    /* alert on Resize */
    // $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
    //    $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    // };

    // $scope.overlay = $('.fc-overlay');
    // $scope.alertOnMouseOver = function( event, jsEvent, view ){
    //   $scope.event = event;
    //   $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
    //   var wrap = $(jsEvent.target).closest('.fc-event');
    //   var cal = wrap.closest('.calendar');
    //   var left = wrap.offset().left - cal.offset().left;
    //   var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
    //   if( right > $scope.overlay.width() ) { 
    //     $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
    //   }else if ( left > $scope.overlay.width() ) {
    //     $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
    //   }else{
    //     $scope.overlay.find('.arrow').addClass('top');
    //   }
    //   (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    // }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 550,
        lang: 'zh-cn',
        editable: false,
        header:{
          left: 'false',
          center: 'title',
          right: 'false'
        }
      }
    };
    
    /* add custom event*/
    // $scope.addEvent = function() {
    //   $scope.events.push({
    //     title: 'New Event',
    //     start: new Date(y, m, d),
    //     className: ['b-l b-2x b-info']
    //   });
    // };

    /* remove event */
    // $scope.remove = function(index) {
    //   $scope.events.splice(index,1);
    // };

    /* Change View */
    // $scope.changeView = function(view, calendar) {
    //   $('.calendar').fullCalendar('changeView', view);
    // };

    // $scope.today = function(calendar) {
    //   $('.calendar').fullCalendar('today');
    // };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);
/* EOF */