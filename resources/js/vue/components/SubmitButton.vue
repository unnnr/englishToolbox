<template>
    <button 
        type="submit">
        
        <slot> {{ defaultMessage }} </slot>

        <span 
            class="loader"
            :class="{'loader--shown': loading}">
        </span>
       
    </button>
</template>

<script>
export default {
    name: 'submit-button',

    computed: {
        defaultMessage() {
            if (this.loading)
                return 'loading';
            
            return 'confirm';
        }
    },

    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>


<style scoped>
button
{
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    margin-left: 5px;
    height: 20px;
    width: 0;
    transition: width .3s ease-in-out, opacity .3s ease-in-out;

    background: url('http://englishtoolbox/img/svg/91.svg');
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;    
}

.loader--shown {
    width: 20px;
    opacity: 1;
}
</style>