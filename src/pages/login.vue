<template>
<f7-page no-toolbar no-navbar no-swipeback login-screen>
  <f7-login-screen-title class="title-login">
    <f7-row>
      <f7-col width="100">
        <img src="@/assets/cb_bot.png" class="img-login">
      </f7-col>
      <f7-col width="100">Identifícate</f7-col>
    </f7-row>
    
  </f7-login-screen-title>
  <f7-list form>
    <f7-list-input
      label="Correo UABC"
      type="text"
      placeholder="Tu correo"
      :value="correo"
      @input="correo = $event.target.value"
    ></f7-list-input>
  </f7-list>
  <f7-list>
    <f7-list-button @click="logIn">Ingresar</f7-list-button>
    <f7-block-footer>Ingresa tu correo institucional para<br>poder acceder al servicio.</f7-block-footer>
  </f7-list>
</f7-page>
</template>
<script>
  import { f7 } from 'framework7-vue';

  export default {
    props: {
      f7router: Object,
    },
    data() {
      return {
        correo: '',
      };
    },
    methods: {
      logIn() {
        const self = this;
        f7.dialog.progress('Cargando...');
        setTimeout(function () {
          f7.dialog.close();
        }, 1000);
        self.f7router.navigate('/home/');
      },
    },
  }
</script>
<style>
.img-login{
  width: 300px;
}
.title-login{
  color: #f9b233;
}
</style>