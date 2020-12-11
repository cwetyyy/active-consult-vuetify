<template>
<!-- v-app is route component from Vuetify. All cuetify components should be nested inside. -->
  <v-app> 
   <MainNavigation v-if="!$route.meta.hideNavigation" />
      <v-main class="mx-4 mb-4">
        <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script>
import MainNavigation from  './components/MainNavigation'

export default {
  name: 'App',
  components: { MainNavigation },
  data: () => ({
    
  }),
};
</script>
