(function(){
    var canvas = document.getElementById('mycanvas');
    if(!canvas || !canvas.getContext )  return false;
    var ctx = canvas.getContext('2d');

    var startX,startY,x,y,bordtrWidth = 10,isDrawing=false;

    $('#mycanvas').mousedown(function(e){
        isDrawing=true
        startX = e.pageX - $(this).offset().left - bordtrWidth;
        startY = e.pageY - $(this).offset().top - bordtrWidth;

    })
    .mousemove(function(e){
        if(isDrawing===false) return false;
        x = e.pageX - $(this).offset().left - bordtrWidth;
        y = e.pageY - $(this).offset().top - bordtrWidth;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(x,y);
        ctx.stroke();
        startX = x;
        startY = y;

    })
    .mouseup(function(){
        isDrawing = false;
    })
    .mouseleave(function(){
        isDrawing = false;
    })

    $('#penColor').change(function(){
        ctx.strokeStyle = $(this).val();
    });

    $('#penWidth').change(function(){
        ctx.lineWidth = $(this).val();
    });

    $('#erase').click(function(){
        if(!confirm('本当に消去しますか?')) return ;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    $('#save').click(function(){
       var img=$('<img>').attr({
           width:100,width:50,
           src:canvas.toDataURL()
       });
       var link = $('<a>').attr({
           href:canvas.toDataURL().replace('image/png','application/octet-stream'),
           download: new Date().getTime()+'.png'
       })
    //    $('#gallery').append(img.addClass('thumbnail'));
        $('#gallery').append(link.append(img.addClass('thumbnail')));
       ctx.clearRect(0, 0, canvas.width, canvas.height);

    });



})