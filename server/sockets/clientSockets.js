
function frontSockets(socket){
    socket.on('fromClient', function(data){
        console.log('The data is', data)
        
        if(data==true){
            console.log("Reserve has been updated");
            socket.emit("newReserveList", data);
            
        }
    }); 

    socket.on('foodUpdate', function(data){
        console.log('The data is', data)               
        socket.emit("customerFoodUpdate", data)
        
    }); 

    
    socket.on('callWaiter', function(data){
        console.log('The data is', data)
        
        if(data.status=='true'){
            console.log("Waiter has been called");
            socket.broadcast.emit("waiterCall", data);
        }
    });        

    socket.on('reloadRes', function(data){
        console.log('The data is', data)
        
        if(data.onSite=='true'){
            console.log("Reserve has been updated");
            socket.broadcast.emit("reserveUpdate", data);
        }
    }); 

    socket.on('reloadCustomer', function(data){
        console.log('The data is', data)
        
        if(data=='true'){
            console.log("Customer records has been updated");
            socket.broadcast.emit("customerReload", data);
        }
    }); 


    socket.on('rgbTrigger', function(data){
        console.log('The data is', data)
                
        console.log("RGB wil lbe triggered");
        socket.broadcast.emit("triggerRgb", data);
        
    }); 

    socket.on('openCustomer', function(data){
        console.log('The data is', data)
                
        console.log("Customer page Loading at Table");
        socket.broadcast.emit("customerOpen", data);
        
    }); 
}

module.exports=frontSockets
