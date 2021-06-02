$(document).ready(function() {
  setContentEventsCard() 
  // el.find('select').trigger('change')
  // $("#rpp-table-events").trigger('change')
})

var tableEventColumn = {
  'grdoc' : 'GR Document', 
  'grline' : 'GR Line', 
  'grdate' : 'GRs Date', 
  'postdate' : 'Posting Date', 
  'desc' : 'Description', 
  'qty' : 'QTY', 
  'uom' : 'UoM', 
  'value' : 'Value', 
  'curr' : 'Curr', 
  'po' : 'PO', 
  'poline' : 'PO Line', 
  'check' : 'Check' 
}

var filterEventCount = {'all' : 'All', 'available' : '', 'sold' : '', 'refunded' : '', 'canceled' : ''}

// SET CONTENT FOR EVENTS CARD --ir
function setContentEventsCard() {
  // SET HEADER AND FOOTER FOR TABLE EVENTS --ir
  setBasicHeaderFooterTable($('#myContent #table-events thead'), tableEventColumn, 'head')
  // setBasicHeaderFooterTable($('#myContent #table-events tfoot'), tableEventColumn, 'foot')
  
  // SET FILTER, SEARCH AND ROW PER PAGE --ir
  setButtonFilterCount($('#card-table-events .filter-count-row'), filterEventCount, "event")
  setSearch($("#card-table-events .search-bar"), "table-events")
  setRowsPerPage($("#card-table-events .row-page"), "table-events")
}

// SET CONTENT TABLE BODY FOR TABLE EVENTS --ir
function setTableEvents(filterCount) {
  tbodyEvent = $('#myContent #table-events tbody'); 
  $.ajax({
    async   : false,
    success   : function() {
      // LOAD DATA FOR TABLE BODY CONTENT --ir
      $.getJSON(urlOrigin + "/data/table-events.json", function(data) {
        // FILTER DATA BASED ON SELECTED BUttON ROW COUnt --ir
        dataEvents = data['data-events']
        if(filterCount != "all") var dataEvents = dataEvents.filter(a => a.status == filterCount);
        $('#card-table-events .filter-count-row span').empty().append(dataEvents.length + " Total GRN")
        
        $.each(dataEvents, function(i, rowData) {
          tbodyEvent.append('<tr class="eventRow-' + i + '"></tr>');
          $.each(rowData, function(key, value) {
            if(key == "available") value = thousandToK(value)
            tbodyEvent.find('tr:last').append('<td class="col-' + key + '">' + value + '</td>')
          })
        })

        // SET PAGINATION BASED ON SELECTED ROWS PER PAGE OPTION --ir
        $("#rpp-table-events").trigger('change')
      }) 
    },beforeSend  : function() {
      tbodyEvent.empty();
      $('#table-events').hide()
    },complete  : function() {
      $('#table-events').show()
    }
  })
  

}