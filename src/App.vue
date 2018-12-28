<template>
  <v-app id="home">
    <v-toolbar fixed dark class="primary">
      <v-toolbar-side-icon 
        @click="sideNav = !sideNav" 
        class="hidden-md-and-up"
      />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer" >
          PGGD
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-xs-only hidden-sm-only">
        <v-btn 
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar />

    <v-navigation-drawer fixed temporary v-model="sideNav" class="hidden-sm-and-up">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { title: 'Entrar', link: '/' },
          { title: 'Cadastre-se', link: '/cadastro' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { title: 'Perfil', link: '/perfil' },
            { title: 'Dúvidas', link: '/duvidas' }
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    name: 'app'
  }
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(15px);
    opacity: 0;
  }
</style>
