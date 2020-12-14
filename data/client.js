$(function(){
    /* Inicializace proměnné index, která unikátně identifikuje novou skupinu prvků */
    let index = 0;
    /* Funkce, která přidá skupinu prvků do formuláře */
    function addGroup(index = 0, obj = {time:''}) {
        return `
        <div class="form-group row p-1 group-time" id="group-${index}">
            <label class="col-sm-1">Cas</label>
            <div class="col-sm-2">
                <input action="/get" type="time" class="form-control" required name="time" id="time-${index}" value="${obj.time}">
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-danger delete" id="delete-${index}">Smazat</button>
            </div>
        </div>
        `;
    }
    
    /* Akce po kliknutí na tlačítko Přidat nový čas */
    $('#append').on('click', function() { 
        /* Přidá skupinu prvků jako nový blok do formuláře */
        $('#times').append(addGroup(index));
        /* Ošetření akce kliknutí na tlačítko Smazat - smaže se vybraná skupina prvků */
        $('.delete').on('click', function() { 
            /* Příklad traverzování - vyhledá se a odstraní celý element - 
            předek tlačítka Smazat, který je oddílem s třídou group-time */
            $(this).parents('div.group-time').remove();        
        });   
        /* Index se po přidání prvku zvýší, aby se zajistila jeho unikátnost */ 
        index++;
    });

    /* Pole pro uložení dat z formuláře */
    let data = [];

    /* Validační funkce pro ověření platnosti zadaných údajů */
    function validateData(obj) {
        /* Z obou časových stringů odebere dvojtečku a porovná, zda je konečný údaj větší */
        /* Musí být zadáno také neprázdné datum */
        return (obj.start.replace(':', '') < obj.stop.replace(':', '')) && obj.date; 
    }

    function setCas() {
        var tt = $('#time').val();
          $.post("/settime", { cas: tt });
      }

    $('#send').on('click', function(){
        setCas();
    });



    /*function get() {
       
        $.ajax({
            url: 'http://localhost:3000/api/times',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: (data, textStatus, xhr) => {
                $('#times').html(''); 
                data.forEach(obj => {
                    $('#times').append(addGroup(index, obj));
                    $('.delete').on('click', function() { 
                        $(this).parents('div.group-time').remove();        
                    });   
                    index++;
                });                
            },
            error: (xhr, textStatus, errorThrown) => {
                console.log(errorThrown);
            }
        })

    }*/


    /* Pošle data na server prostřednictvím metody PUT */
    /*function send(data) {
        $.ajax({          
            url: 'http://localhost:3000/api/times',           
            type: 'PUT',
            data: data,
            dataType: 'json',            
            contentType: 'application/json',
            success: (data, textStatus, xhr) => {
                console.log(textStatus);
                console.log(data);
                get();
            },
            error: (xhr, textStatus, errorThrown) => {
                console.log(errorThrown);
            }
        })

    }*/
    

    
})