<template>
  <f7-page>
    <f7-navbar title="Error 404" back-link="Back" @click="f7router.back()"></f7-navbar>
    <f7-row>
      <f7-col align="center">
        <img src="@/assets/cb_404.png" class="img-404">
      </f7-col>
      
    </f7-row>
  </f7-page>
</template>
<script>
  export default {};
</script>
<style>
.img-404{
  text-align: center;
  padding-top: 30px;
  width: 400px;
}
</style>