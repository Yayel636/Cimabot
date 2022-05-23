<template>
<f7-page>
  <f7-navbar>
    <f7-nav-left>
      <!-- <f7-link icon-md="f7:arrow_left_to_line" href="/login/"> 
      </f7-link>-->
    </f7-nav-left>
    <f7-nav-title>
      <img class="logo_navbar" src="@/assets/cb_logo.png">
    </f7-nav-title>
    <f7-nav-right>
      <f7-link icon-md="f7:square_arrow_right" href="/login/"></f7-link>
    </f7-nav-right>
  </f7-navbar>

  <f7-messagebar
    ref="messagebar"
    v-model:value="messageText"
    :placeholder="placeholder"
    :attachments-visible="attachmentsVisible"
    :sheet-visible="sheetVisible"
  >
    <template #inner-start class="foot-icon" >
      <f7-link icon-md="f7:face_smiling_fill" @click="sheetVisible = !sheetVisible" />
    </template>
    <template #inner-end>
      <f7-link icon-md="f7:paperplane_fill" @click="sendMessage" />
    </template>
    <f7-messagebar-attachments>
      <f7-messagebar-attachment
        v-for="(image, index) in attachments"
        :key="index"
        :image="image"
        @attachment:delete="deleteAttachment(image)"
      ></f7-messagebar-attachment>
    </f7-messagebar-attachments>
    <f7-messagebar-sheet>
      <f7-messagebar-sheet-image
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        :checked="attachments.indexOf(image) >= 0"
        @change="handleAttachment"
      ></f7-messagebar-sheet-image>
    </f7-messagebar-sheet>
  </f7-messagebar>

  <f7-messages>
    <f7-messages-title><b>Martes, May 17,</b> 6:58</f7-messages-title>
    <f7-message
      v-for="(message, index) in messagesData"
      :key="index"
      :type="message.type"
      :image="message.image"
      :name="message.name"
      :avatar="message.avatar"
      :first="isFirstMessage(message, index)"
      :last="isLastMessage(message, index)"
      :tail="isTailMessage(message, index)"
    >
      <template #text>
        <!-- eslint-disable-next-line -->
        <span v-if="message.text" v-html="message.text"></span>
      </template>
    </f7-message>
    <f7-message
      v-if="typingMessage"
      type="received"
      :typing="true"
      :first="true"
      :last="true"
      :tail="true"
      :header="`${typingMessage.name} is typing`"
      :avatar="typingMessage.avatar"
    ></f7-message>
  </f7-messages>
</f7-page>
</template>
<script>
import { f7, f7ready } from 'framework7-vue';
import $ from 'dom7';

export default {
  data() {
    return {
      attachments: [],
      sheetVisible: false,
      typingMessage: null,
      messageText: '',
      messagesData: [
        {
          name: 'Cimabot',
          type: 'received',
          text: 'Hola, soy Cimabot, ¿En qué te puedo ayudar?' +
          '<br> 1.- Seguros <br> 2.- Bajas <br> 3.- Calendario Escolar' +
          '<br> 4.- Becas <br> 5.- Reinscripciones <br> 6.- Tutor' +
          '<br> 7.- Documentos <br> 8.- Acreditación <br> 9.- Ya es todo',
          avatar: 'https://hosting.photobucket.com/images/i/alemarguile/cb_avatar2.png',
        },
      ],
      images: [
        'https://i.ibb.co/rbyTh0Z/sticker00.webp',
        'https://i.ibb.co/jHvNMct/sticker02.webp',
        'https://i.ibb.co/SV1ZqqL/sticker03.webp',
        'https://hosting.photobucket.com/images/i/alemarguile/sticker06.gif?width=1320&height=480&fit=bounds',
        'https://hosting.photobucket.com/images/i/alemarguile/sticker05.gif',
        'https://i.ibb.co/JcqvP6W/sticker01.webp',
        'https://hosting.photobucket.com/images/i/alemarguile/sticker07.gif?width=1920&height=1080&fit=bounds',
        'https://hosting.photobucket.com/images/i/alemarguile/sticker08.gif',
      ],
      people: [
        {
          name: 'Cimabot',
          avatar: 'https://hosting.photobucket.com/images/i/alemarguile/cb_avatar2.png',
        },
        {
          name: 'Unknown Hacker',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6TDZn6YsGxsNlXl1-M8-nm48A_PIgiQ_oUMqFBZI206t6nOTvbbBKElyzSh5D3v6538&usqp=CAU',
        },
      ],
      answers: [
        '¿En qué te puedo ayudar? <br> 1.- Seguros <br> 2.- Bajas <br> 3.- Calendario Escolar<br> 4.- Becas <br> 5.- Reinscripciones <br> 6.- Tutor <br> 7.- Documentos <br> 8.- Acreditación <br> 9.- Ya es todo',
        //SEGUROS '1'
        'Toda la comunidad estudiantil de licenciatura, alumnos en prácticas profesionales y prestadores de servicio social en el área de la salud disponen de este servicio que cubre enfermedades y maternidad',
        //DESPEDIDA
        'Gracias por usar Cimabot. Vuelve pronto'
      ],
      responseInProgress: false,
    };
  },
  computed: {
    attachmentsVisible() {
      const self = this;
      return self.attachments.length > 0;
    },
    placeholder() {
      const self = this;
      return self.attachments.length > 0 ? 'Agrega comentario o envía' : 'Aa';
    },
  },
  mounted() {
    const self = this;
    f7ready(() => {
      self.messagebar = f7.messagebar.get(self.$refs.messagebar.$el);
    });
  },
  methods: {
    isFirstMessage(message, index) {
      const self = this;
      const previousMessage = self.messagesData[index - 1];
      if (message.isTitle) return false;
      if (
        !previousMessage ||
        previousMessage.type !== message.type ||
        previousMessage.name !== message.name
      )
        return true;
      return false;
    },
    isLastMessage(message, index) {
      const self = this;
      const nextMessage = self.messagesData[index + 1];
      if (message.isTitle) return false;
      if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
        return true;
      return false;
    },
    isTailMessage(message, index) {
      const self = this;
      const nextMessage = self.messagesData[index + 1];
      if (message.isTitle) return false;
      if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
        return true;
      return false;
    },
    deleteAttachment(image) {
      const self = this;
      const index = self.attachments.indexOf(image);
      self.attachments.splice(index, 1)[0]; // eslint-disable-line
    },
    handleAttachment(e) {
      const self = this;
      const index = $(e.target).parents('label.checkbox').index();
      const image = self.images[index];
      if (e.target.checked) {
        // Add to attachments
        self.attachments.unshift(image);
      } else {
        // Remove from attachments
        self.attachments.splice(self.attachments.indexOf(image), 1);
      }
    },
    sendMessage() {
      const self = this;
      const text = self.messageText.replace(/\n/g, '<br>').trim();
      const messagesToSend = [];
      self.attachments.forEach((attachment) => {
        messagesToSend.push({
          image: attachment,
        });
      });
      if (text.length) {
        messagesToSend.push({
          text,
        });
      }
      if (messagesToSend.length === 0) {
        return;
      }

      //Mensaje usuario
      self.selecciones = this.messageText;
      // Reset attachments
      self.attachments = [];
      // Ocultar hoja
      self.sheetVisible = false;
      // Borrar mensaje texto
      self.messageText = '';
      // Focus area
      if (text.length) self.messagebar.focus();
      // Send message
      self.messagesData.push(...messagesToSend);

      // RESPUESTAS
      if (self.responseInProgress) return;
      self.responseInProgress = true;
      setTimeout(() => {

        //SOLO PARA INTERACCION CON CIMABOT
        const person = self.people[0];
        //ASIGNAR UNA RESPUESTA AL AZAR USUARIO
        var answer = self.answers[Math.floor(Math.random() * self.answers.length)];
        
        self.typingMessage = {
          name: person.name,
          avatar: person.avatar,
        };
        setTimeout(() => {
          self.messagesData.push({
            text: answer,
            type: 'received',
            name: person.name,
            avatar: person.avatar,
          });
          self.typingMessage = null;
          self.responseInProgress = false;
        }, 4000);
      }, 1000);
    },
  },
};
</script>

<style>
:root{
  --f7-message-bubble-line-height: 1.3;
}
.foot-icons{
  font-size: 30px !important;
}
.logo_navbar{
  margin-top: 10px;
  width: 200px;
}

</style>