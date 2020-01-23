<template>
    
    <div id="app" class="container">
        
        <section>               
        <b-table
            :data="data"
            :columns="columns"
            :checked-rows.sync="checkedRows"
            :is-row-checkable="(row) => row.id !== 3"
            checkable
            :checkbox-position="checkboxPosition">

            <template slot="bottom-left">
                <b>Total checked</b>: {{ checkedRows.length }}
            </template>
            
        </b-table>      
        <button class="button field is-danger" @click="checkedRows = []"
                    >
                    <b-icon icon="delete"></b-icon>
                    <span>Delete</span>
                </button>
        <button class="button field is-link" @click="checkedRows = []"
                    >
                    <b-icon icon="pencil"></b-icon>
                    <span>Update</span>
                </button> 
        <button class="button field is-dark" @click="add" :disabled="!valid">
                    
                    <b-icon icon="plus"></b-icon>
                    <span>Add</span>
                </button> 
        </section>

    </div>
</template>
<script>
export default {
    data() {
        const data = [
            {  },
            {  },
            {  },
            {  },
            {  }
        ]

        return {
            data,
            checkboxPosition: 'left',
            checkedRows: [],
            columns: [
                
                {
                    field: 'name',
                    label: 'Menu Item',
                    searchable: true,
                },
              {
                    field: 'category',
                    label: 'Food Category',
                    searchable: true,
                },
                
                
            ]
        }
    }
}


</script>
