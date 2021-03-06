function checkBlurb(d){
		if (d != "") {
			return d;
		}
		else {
			return "N/A";
		}
	}
	
function generateLinks(d){
	var result = ""
	if (typeof d == 'string'){
	d = d.split(',');
	}
	$.each(d, function(key, value){
		if (key == 0){
		result +="<a href='#'>"+ value.trim() +"</a>"
		}
		else
		{
		 result +=", <a href='#'>"+ value.trim() +"</a>"
		}
	});
	return result;
}


	$(document).ready( function(){
		$('body').prepend('<table id="mytable" class="display responsive no-wrap" cellspacing="0" width="100%"></table>');
		var tablehead = $("<thead>" +
			    "<tr>" +
				"<th class='all'>Cover</th>" +
				"<th class='mobile'>Book Information</th>" +
				"<th class='min-tablet'>Name</th>" +
				"<th class='min-tablet'>Author(s)</th>" +
				"<th class='none'>Summary</th>" +
				"<th class='none'>Editor</th>" +
				"<th class='min-desktop'>Tags</th>" +
				"<th class='min-desktop'>Subjects</th>" +
				"<th class='none'>Action</th>" +
			   "</tr>"+
		      "</thead>"+
		      "<tfoot>" +
    		"<tr>"+
      "<td></td>"+
      "<td></td>"+      
      "<td></td>"+
	  "<td></td>"+
      "<td></td>"+
      "<td></td>"+
      "<td></td>"+  
      "<td></td>"+  
      "<td></td>"+       
	  "</tr>"+
	  "</tfoot>"+
	  "<tbody>");
	    var mytable = $('table');
	    mytable.append(tablehead); 
		$.getJSON( "catalog.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	//get authors
		  	var authors = [];
		  	$.each(val.doc.authors, function(index, item)
		  		{
		  			authors.push(item.full_name);
		  		}
		  	)
		  	//get editors
		  	var editors = [];
		  	$.each(val.doc.editor, function(index, item)
		  		{
		  			editors.push(item.name);
		  		}
		  	)
		  	var record = $("<tr>" +
		  	"<td><img src='/thumbnails/"+ key +".jpg' height='100'></td>" +
		  	"<td><br>Title: "+ val.doc.name +"<br><br>Author(s): " + authors.join(", ")+"</td>" +
		  	"<td>"+ val.doc.name +"</td>" +
		  	"<td>"+ generateLinks(authors)+"</a></td>" +		 
		  	"<td>"+ checkBlurb(val.doc.blurb) +"</td>" +
		  	"<td>"+ generateLinks(editors)+"</td>" +
			"<td>"+ generateLinks(val.doc.tags) +"</td>" +
		  	"<td>"+ generateLinks(val.doc.subjects) +"</td>" +
		  	"<td><button type='button'>Read</button></td>" +
		  	"</tr>")
		  	mytable.append(record);
		  });
		  	mytable.append('</tbody>');

		    var oTable = $('#mytable').DataTable( 
		    {
        		sDom: 'T<"clear">lfrtip',
		        tableTools: {
			            "aButtons": [
			                {
			                    "sExtends":     "text",
			                    "sButtonText": "Clear filters"
			                }
			            ]
		        },
		        responsive: true,
		        sPaginationType: "listbox",
		         lengthMenu: [ 5, 10, 15, 20, 25 ],
		         columnDefs: [ { targets: 0, orderable: false }, {className: 'summary', targets: 4} ],
		         order: [[ 7, 'asc' ]],
		        initComplete: function () {
		            var api = this.api();
		            api.columns().indexes().flatten().each( function ( i ) {
		          		if (i ==0 || i==1 || i == 4) {
		          			//do not include image, info, and summary filter
		                 }
		                 else{
		                var column = api.column( i );
		                var select = $('<select><option value=""></option></select>')
		                    .appendTo( $(column.footer()).empty() )
		                    .on( 'change', function () {
		                        var val = $.fn.dataTable.util.escapeRegex(
		                            $(this).val()
		                        );
		 
		                        column
		                            .search( val ? val : '', true, false )
		                            .draw();
		                    } );

						 if (i==3 || i ==5 || i==6 || i==7){
						 	var data = [];
							column.data().unique().sort().each( function ( d, j ) {
								stringArray = $(d).text().split(",");
			                	for (var i=0; i < stringArray.length;	 i++){
			                		if (data.indexOf(stringArray[i])==-1){
			                			data.push(stringArray[i]);
			                		}
			                	}
			                	});
		                	$.each(data.sort(), function () {
		                    select.append( '<option value="'+this.trim()+'">'+this.trim()+'</option>' );
		                	});
		                 }

						else{

			                column.data().unique().sort().each( function ( d, j ) {
			                    select.append( '<option value="'+d.trim()+'">'+d.trim()+'</option>' );
			                });
		            	}
		             }
		          } );  
		        }

		    });


					var myTableAPI = $('#mytable').DataTable();
					 
					$('table').on( 'click', 'a', function (event) {
						event.preventDefault();
						cellIndx = myTableAPI
					   		.cell($(this).parent())
					    	.index();
					    if (cellIndx != undefined){
					    	var colIdx = cellIndx.column;
					    	$('select', $(myTableAPI.column(colIdx).footer())).val($(this).text()).change();
					    }
					    else {
					     myTableAPI
						 .search( $(this).text()).draw();
						 $('input[type="search"]').val($(this).text());
					    }


					} );

					$('span:contains(Clear filters)').on('click', function(){

						$.each(myTableAPI.rows().eq(0), function(index){
						 	var row = myTableAPI.row(index);
							  if ( row.child.isShown() ) {
							  	row.nodes().to$().find('img').click();
							    //row.child.hide();
							    //var rowindex= row.index();
							    //myTableAPI.cell(row, myTableAPI.column(0)).to$().click();
							  }
					});
						 $('select', $(myTableAPI.columns().footer())).val('');
						 $('input[type="search"]').val('');
						myTableAPI
						 .search( '' )
						 .columns().search( '' )
						 .draw();
						 });



					// THIS TRIGGERS SEARCH BOX FUNCTION - OMMITTED IN FOR THE FILTERING OPTION INSTEAD
					// var table = $('#example').DataTable();
					// $('table').on( 'click', 'a', function(event) {
					// 	event.preventDefault();
					// 	$('#mytable').DataTable().search($(this).text()).draw();
					// });
		
	});

 });