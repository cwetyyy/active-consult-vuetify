<template>
<!-- v-app is route component from Vuetify. All cuetify components should be nested inside. -->
  <v-app> 
   <MainNavigation v-if="!$route.meta.hideNavigation" />
      <v-snackbar
      v-if="toast"
      v-model="toast.show"
      :color="toast.color"
      top
      right
    >
      {{ toast.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="toast.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
      <v-main class="mx-4 mb-4">
        <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import MainNavigation from  './components/MainNavigation'

export default {
  name: 'App',
  components: { MainNavigation },
  computed: {
    ...mapGetters(['getToast'])
  },
  data: () => ({
    toast: null,
  }),
  watch: {
    getToast(val) {
      if(val && val.show) {
        this.toast = val
      }
    }
  }
};
</script>

<style>
.theme--light.v-icon {
  color: #4D97F3 !important;
}
body{
  background-color: #f4f5f8;
}
</style>
