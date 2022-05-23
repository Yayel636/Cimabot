<template>
  <f7-app v-bind="f7params" >

  <!-- Aqui comienzo la seccion principal por class -->
  <f7-view main class="safe-areas" url="/"></f7-view>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Ingresar</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="correo"
              placeholder="Tu correo"
              v-model:value="correo"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Log In" @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Ingresa el correo institucional<br>para poder ingresar a la sección del chatbot.
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';


  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    setup() {

      // Framework7 Parametros
      const f7params = {
        name: 'Cimabot',
        theme: 'auto', // Automatic theme detection



        // App store
        store: store,
        // App routes
        routes: routes,
      };
      // Login view
      const correo = ref('');

      const alertLoginData = () => {
        f7.dialog.alert('Correo: ' + correo.value, () => {
          f7.loginScreen.close();
        });
      }
      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });

      return {
        f7params,
        correo,
        alertLoginData
      }
    }
  }
</script>