<template>
  <div>
    <div
      class="row q-pa-lg q-gutter-y-md justify-between"
      onselectstart="return false"
      onmousedown="return false"
    >
      <!-- onselectstart="return false" onmousedown="return false"  этот фрагмент для того что-бы при двойном нажатии в этом блоке не выделялся текст-->
      <div v-if="doRegistered" class="col-12 col-sm-8">
        Для завершения регистрации необходимо подтвердить номер телефона (4-х
        значный код)
      </div>
      <div v-else class="col-12 col-sm-8">
        Для входа необходимо подтвердить номер телефона (4-х значный код)
      </div>
      <q-btn v-if="sending_code" @click="send_code" class="col-12 col-sm-3"
        >Получить SMS код</q-btn
      >
      <q-btn
        v-if="!sending_code"
        @click="send_code"
        class="col-12 col-sm-3"
        style="pointer-events: none"
        >повторно через {{ interval_send_code }}
      </q-btn>
    </div>

    <div class="row q-pa-lg q-gutter-y-md justify-between">
      <q-input
        class="col-12 col-sm-8"
        ref="value_retry_code"
        v-model="value_retry_code"
        @keyup="retry_code"
        type="text"
        mask="####"
        unmasked-value
        outlined
        label="SMS код"
      />

      <q-btn
        @click="compare_code"
        class="col-12 col-sm-3 retry_btn disabled_btn"
        >Подтвердить код</q-btn
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useQuasar } from "quasar";
import { mapActions } from "vuex";
export default {
  setup() {
    const $q = useQuasar();
    return {
      showNotif() {
        $q.notify({
          message: "SMS код ошибочный!!!",
          color: "red",
          timeout: 500,
          position: "center",
        });
      },
    };
  },
  props: ["do-registered", "tel", "imya", "familiya"],
  data() {
    return {
      sending_code: true,
      interval_send_code: 0,
      code: null,
      input_retry_code: false,
      value_retry_code: null,
    };
  },
  methods: {
    ...mapActions("auth", { login: "login" }),
    send_code() {
      let sss = document.querySelector(".retry_btn");
      this.sending_code = false;
      this.interval_send_code = 30;
      this.value_retry_code = "";
      let key = setInterval(() => {
        this.interval_send_code = this.interval_send_code - 1;
        if (this.interval_send_code == 0) {
          clearInterval(key);
          this.sending_code = true;
          if (!sss.classList.contains("disabled_btn")) {
            sss.classList.add("disabled_btn");
          }
        }
      }, 1000);
      this.code = Math.floor(Math.random() * 8999) + 1000;
      axios.post("http://192.168.88.229:3000", {
        code: this.code,
        tel: this.tel,
      });
    },
    retry_code() {
      let sss = document.querySelector(".retry_btn");
      if (this.value_retry_code.length == 4) {
        console.log("код подтверждения введён");
        this.input_retry_code = true;
        this.$refs.value_retry_code.blur();

        console.log(sss);
        sss.classList.remove("disabled_btn");
      } else if (!sss.classList.contains("disabled_btn")) {
        sss.classList.add("disabled_btn");
        console.log("ddddd");
      }
    },
    compare_code() {
      if (this.code == this.value_retry_code) {
        console.log("совпадают");
        axios
          .post("/api/adduser", {
            tel: this.tel,
            imya: this.imya,
            familiya: this.familiya,
          })
          .then((response) => {
            localStorage.setItem("neksk_token", response.data.token);
            console.log(`ssssssssssssss:${response.data}`);
            let payload = {
              user: response.data.adduser,
              token: response.data.token,
            };
            this.login(payload);
          })

          .then(() => {
            this.$router.push({ name: "Home" });
          });
      } else {
        console.log("не совпадают");
        this.showNotif();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.disabled_btn {
  pointer-events: none;
  opacity: 0.5;
}
</style>