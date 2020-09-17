<template>
    <section class="navbar container">
        <div class="navbar-desktop">
            <nav class="navbar-desktop__links">
                <a  
                    class="navbar-desktop__logo"
                    :href="homeUrl">
                    
                    {{ AppName }}
                </a>
                <a 
                    class="navbar-desktop__link"
                    v-for="(link, index) in links"
                    :class="{'navbar-desktop__link--active': link.active}"
                    :key="index"
                    :href="link.url">
                    
                    {{ link.label }}
                </a>
            </nav>
            <div class="navbar-desktop__aside">
                <a v-if="!!!profileShown"
                    class="navbar-desktop__aside-link navbar-desktop__aside-link--login-in"
                    :href="loginUrl">
                    
                    login in
                </a>
                <a v-if="!!!profileShown"
                    class="navbar-desktop__aside-link navbar-desktop__aside-link--sign-up"
                    :href="registerUrl"> 
                    
                    sing up
                </a>
                <a 
                    class="navbar-desktop__account-link"
                    v-if="profileShown"
                    :href="profileUrl">
                    
                    <span class="material-icons-round">account_circle</span>
                </a>
            </div>
        </div>

        <div class="navbar-mobile">
            <button  
                class="navbar-mobile__button navbar-mobile__button--show"
                @click="showMobileNav">
                
                <span class="material-icons-round">menu</span>
            </button>
            <a 
                class="navbar-mobile__logo"
                :href="homeUrl">

                Namehere
            </a>
            <nav 
                class="navbar-mobile__links"
                :class="{'navbar-mobile__links--slide': isMobileNavShown}">

                <div class="navbar-mobile__header">
                    <a 
                        class="navbar-mobile__account-link"
                        v-if="profileShown"
                        :href="profileUrl">

                        <span class="material-icons-round">account_circle</span>
                    </a>
                    <button
                        class="navbar-mobile__button navbar-mobile__button--hide"
                        @click="hideMobileNav">
                        
                        <span class="material-icons-round">clear</span>
                    </button>
                </div>
                <a
                    class="navbar-mobile__link"
                    :href="homeUrl">
                    
                    Name
                </a>
                <a
                    class="navbar-mobile__link"
                    v-for="(link, index) in links"
                    :class="{'navbar-desktop__link--active': link.active}"
                    :key="index"
                    :href="link.url">
                    
                    {{ link.label }}
                </a>
                <div class="navbar-mobile__footer">
                    <a  
                        class="navbar-mobile__footer-link navbar-mobile__footer-link--login-in"
                        v-if="!!!profileShown"
                        :href="loginUrl">
                        
                        login in
                    </a>
                    <a 
                        class="navbar-mobile__footer-link navbar-mobile__footer-link--sign-up"
                        v-if="!!!profileShown"
                        :href="registerUrl">
                       
                        sing up
                    </a>
                </div>
            </nav>
            <div 
                class="navbar-mobile__overlay"
                :class="{'navbar-mobile__overlay--visible': isMobileNavShown}"></div>
        </div>
    </section>
</template>

<script>
import Auth from '@services/Auth';
import Routes from '@services/Routes';

export default {
    name: 'navbar',

    data: function() {
        return {
            isMobileNavShown: false,

            profileShown: true,

            AppName: 'Etoolbox',

            links: []
        }
    },

    computed: {
        homeUrl() {
            return Routes.redirectUrl('home');
        }, 
        
        loginUrl() {
            return Routes.redirectUrl('login');
        }, 

        registerUrl() {
            return Routes.redirectUrl('register');
        },

        profileUrl() {
            return Routes.redirectUrl('profile');
        }
    },

    methods: {
        showMobileNav() {
            this.isMobileNavShown = true;
        },

        hideMobileNav() {
            this.isMobileNavShown = false;
        }
    },

    beforeMount() {
        this.links = Routes.all();

        Auth.onload(() => {
            this.profileShown = Auth.check();
        });
    },

}
</script>