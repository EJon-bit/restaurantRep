var count=0;

function pySockets(socket){
    socket.on('noPay',function(data){
        console.log('The data is', data)        
       
        console.log("Request to Pay has been made");
        socket.broadcast.emit("noPayWarning", data);
        
    }); 
    
  
    socket.on('approveEntry',function(data){
        console.log('The data is', data)
        
        socket.broadcast.emit("entryApproval", data);
        
    }); 

    socket.on('unauthorized',function(data){
        console.log('The data is', data)
        
        socket.broadcast.emit("entryUnauth", data);
        
    }); 

    socket.on('wrongTable',function(data){
        console.log('The data is', data)
        
        socket.broadcast.emit("tableWrong", data);
        
    }); 

    socket.on('frontdeskNotice',function(data){
        console.log('The data is', data)                
        count++   
        socket.broadcast.emit("noticeDesk", count);
        
    }); 

    socket.on('tableReload',function(data){
        console.log('The data is', data)             
          
        socket.broadcast.emit("reloadTable", data);
        
    }); 

    socket.on('tableOcc',function(data){
        console.log('The data is', data)             
          
        socket.broadcast.emit("occTable", data);
        
    }); 
    

}

module.exports=pySockets