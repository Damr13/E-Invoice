$(document).ready(function() {
  setContentEventsCard() 
  // el.find('select').trigger('change')
  // $("#rpp-table-events").trigger('change')
})

var tableEventColumn = {
  'invdate' : 'Invoice Date', 
  'noinv' : 'No. Invoice', 
  'nopo' : 'No. PO', 
  'baseamount' : 'Base Amount', 
  'lastedit' : 'Last Edit', 
  'status' : 'Status', 
  'posisidok' : 'Posisi Dokumen', 
  'statusdok' : 'Status Dokumen', 
  'aksi' : 'Aksi'
}

var filterEventCount = {'all' : 'All', 'approved' : 'Approved', 'rejected' : 'Rejected'}

// SET CONTENT FOR EVENTS CARD --ir
function setContentEventsCard() {
  // SET HEADER AND FOOTER FOR TABLE EVENTS --ir
  setBasicHeaderFooterTable($('#myContent #table-payment thead'), tableEventColumn, 'head')
  // setBasicHeaderFooterTable($('#myContent #table-payment tfoot'), tableEventColumn, 'foot')
  
  // SET FILTER, SEARCH AND ROW PER PAGE --ir
  setButtonFilterCount($('#card-table-events .filter-count-row'), filterEventCount, "event")
  setSearch($("#card-table-events .search-bar"), "table-payment")
  setRowsPerPage($("#card-table-events .row-page"), "table-payment")
}

// SET CONTENT TABLE BODY FOR TABLE EVENTS --ir
function setTableEvents(filterCount) {
  tbodyPayment = $('#myContent #table-payment tbody'); 
  $.ajax({
    async   : false,
    success   : function() {
      // LOAD DATA FOR TABLE BODY CONTENT --ir
      $.getJSON(urlOrigin + "/data/table-payment.json", function(data) {
        // FILTER DATA BASED ON SELECTED BUttON ROW COUnt --ir
        dataEvents = data['data-payment']
        if(filterCount != "all") var dataEvents = dataEvents.filter(a => a.status == filterCount);
        $('#card-table-events .filter-count-row span').empty().append(dataEvents.length + " Total Payment")
        
        $.each(dataEvents, function(i, rowData) {
          tbodyPayment.append('<tr class="eventRow-' + i + '"></tr>');
          $.each(rowData, function(key, value) {
            if(key == "available") value = thousandToK(value)
            tbodyPayment.find('tr:last').append('<td class="col-' + key + '">' + value + '</td>')
          })
        })

        // SET PAGINATION BASED ON SELECTED ROWS PER PAGE OPTION --ir
        $("#rpp-table-events").trigger('change')
      }) 
    },beforeSend  : function() {
      tbodyPayment.empty();
      $('#table-payment').hide()
    },complete  : function() {
      $('#table-payment').show()
    }
  })
  

}