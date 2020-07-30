var count=0;

function pySockets(socket){
    socket.on('noPay',function(data){
        console.log('The data is', data)        
       
        console.log("Request to Pay has been made");
        socket.emit("noPayWarning", data);
        
    }); 
    
  
    socket.on('approveEntry',function(data){
        console.log('The data is', data)
        
        socket.emit("entryApproval", data);
        
    }); 

    socket.on('unauthorized',function(data){
        console.log('The data is', data)
        
        socket.emit("entryUnauth", data);
        
    }); 

    socket.on('wrongTable',function(data){
        console.log('The data is', data)
        
        socket.emit("tableWrong", data);
        
    }); 

    socket.on('frontdeskNotice',function(data){
        console.log('The data is', data)                
        count++   
        socket.emit("noticeDesk", count);
        
    }); 

    socket.on('tableReload',function(data){
        console.log('The data is', data)             
          
        socket.emit("reloadTable", data);
        
    }); 

    socket.on('tableOcc',function(data){
        console.log('The data is', data)             
          
        socket.emit("occTable", data);
        
    }); 
    

}

module.exports=pySockets