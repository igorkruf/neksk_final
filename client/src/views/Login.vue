<template>
  <div class="row justify-center q-ma-lg">
    <q-card class="login">
      <q-card-section>
        <q-input
          ref="tel"
          mask="+7(###)-###-##-##"
          v-model="tel"
          unmasked-value
          @keyup="est_ili_net_v_base"
          outlined
          label="Ваш номер телефона"
        ></q-input>
      </q-card-section>
      <q-card-section v-if="no_registered">
        <q-card-section class="bg-teal text-white">
          <div class="text-subtitle2">
            Вы не зарегистрированы или неправильно набран номер.
          </div>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn flat @click="do_reg">Продолжить регистрацию</q-btn>
        </q-card-actions>
      </q-card-section>
      <q-card-section v-if="do_registered">
        <q-input
          ref="imya"
          v-model="imya"
          unmasked-value
          outlined
          label="Ваше имя"
          class="q-mb-md"
          @keyup="validation"
        />
        <q-input
          ref="familiya"
          v-model="familiya"
          unmasked-value
          outlined
          label="Ваша фамилия"
          @keyup="validation"
        />
      </q-card-section>
      <div v-if="validate">
        <send-code
          :do-registered="true"
          :tel="tel"
          :imya="imya"
          :familiya="familiya"
        ></send-code>
        <!-- <div class="row q-pa-lg q-gutter-y-md justify-between" onselectstart="return false" onmousedown="return false">   onselectstart="return false" onmousedown="return false"  этот фрагмент для того что-бы при двойном нажатии в этом блоке не выделялся текст
      <div v-if="do_registered" class=" col-12 col-sm-8 "  >Для завершения регистрации необходимо подтвердить номер телефона (4-х значный код)</div>
     
      <q-btn  v-if="sending_code" @click="send_code" class=" col-12 col-sm-3" >Получить SMS код</q-btn>
        <q-btn  v-if ="!sending_code" @click="send_code" class=" col-12 col-sm-3" style="pointer-events:none" >повторно через {{interval_send_code}} </q-btn>
       </div>
      
      
       <div class="row q-pa-lg q-gutter-y-md justify-between" >  
     <q-input 
     
      class=" col-12 col-sm-8 "
      ref="value_retry_code"
      v-model="value_retry_code"
        @keyup="retry_code"
        type="text"
        mask="####"
        unmasked-value
        outlined
        label="SMS код"
        
        />
        
     
      <q-btn @click="compare_code" class=" col-12 col-sm-3 retry_btn disabled_btn" >Подтвердить код</q-btn>
      
      </div> -->
      </div>
    </q-card>
  </div>
</template>
<script>
import axios from "axios";
import sendCode from "@/components/Admin/SendCode.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      //sending_code: true,
      //retry_code: false,
      no_registered: false,
      do_registered: false,
      registered: false,
      imya: "",
      familiya: "",
      tel: "",
      validate: false,
      //interval_send_code: null,
      //code: null,
      //value_retry_code: null,
      //input_retry_code:false,
    };
  },
  methods: {
    ...mapActions("auth", { registered: "registered" }),

    est_ili_net_v_base() {
      if (this.tel.length == 10) {
        this.$refs.tel.blur();

        console.log(this.tel);
        console.log(`отправка кода: ${this.sending_code}`);
        axios
          .get("/api/users", { params: { tel: this.tel } })
          .then((response) => {
            if (response.data.length == 0) {
              console.log("номера нет в базе");
              this.no_registered = true;
            }
          });
      }
    },
    do_reg(event) {
      console.log("fff");
      this.do_registered = true;
      this.no_registered = false;
      console.log(event.target);
    },
    validation() {
      if (this.imya == "") {
        this.validate = false;
      } else if (this.familiya == "") {
        this.validate = false;
      } else {
        this.validate = true;
      }
    },
  },
  computed: {
    ...mapGetters("auth", { count: "count" }),
  },
  components: {
    sendCode,
  },
};
</script>



<style lang="scss" scoped>
@import "@/styles/quasar.scss";
.login {
  width: 100%;
  max-width: 600px;
}
.caption {
  font-size: $caption10;
}
.disabled_btn {
  pointer-events: none;
  opacity: 0.5;
}
</style>