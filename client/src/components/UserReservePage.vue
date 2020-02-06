<template>
    <div class="container is-fluid">        
        
        <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" style="margin-top:25px" >  
            <div class="column is-variable is-one-third-desktop is-12-tablet is-12-mobile">
                <div class="box"> 
                </div>
            </div>
            <div class="column is-variable is-two-thirds-desktop is-12-tablet is-12-mobile"> <!--v-for="menu in paginatedItems" :key="menu.name"-->                                     
                <div class="box" >
                    <p class="title is-4">Your Ordered Items</p>
                </div>
                <div class="box" style="margin-top:35px">   
                    <b-card 
                        img-src=""
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 25rem;"
                        class="box">
                        
                        <b-text class="title is-4">Blank</b-text>
                        
                        <b-card-text style="margin-top: 10px">
                            blank <br/>                                            
                        </b-card-text>
                                                                    
                    </b-card>
                </div>
            </div>
        </div>
    </div>    
</template>