<template>
    <div class="container is-fluid">
        <div class="box">
                <p class="title is-4">Your Ordered Items</p>
        </div><br/><br/>
        <div class="columns is-multiline is-variable is-0-mobile is-2-tablet is-2-desktop is-2-widescreen" >  
            <div class="column is-variable is-one-third-desktop is-12-tablet is-12-mobile"> <!--v-for="menu in paginatedItems" :key="menu.name"-->                                     -->
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
</template>