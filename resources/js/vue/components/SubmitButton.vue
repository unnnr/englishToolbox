<template>
    <button 
        type="submit"
        class="button-second">
        
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
    margin-left: 10px;
    height: 20px;
    width: 20px;
    opacity: 0;
    transition: opacity .6s;

    background: url('http://etoolbox/img/svg/91.svg');
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;    
}

.loader--shown {
    opacity: 1;
}
</style>