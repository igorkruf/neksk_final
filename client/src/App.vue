<template>
  <q-layout view="hHh lpR fFf" class="row">
    <q-header reveal elevated class="main-header">
      <q-toolbar class="tt">
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          class="bt"
          row
        />

        <q-toolbar-title class="tt"> neksk.ru </q-toolbar-title>

        <q-tabs
          indicator-color="primary"
          v-if="isInput"
          class="tb gt-sm"
          align="right"
          shrink
          inline-label
          no-caps
        >
          <q-route-tab
            icon="o_mail"
            name="lk1"
            content-class="ddd"
            :to="{ path: `/cart` }"
          >
            <q-badge color="red" floating>2</q-badge>
          </q-route-tab>
          <q-route-tab
            icon="o_shopping_cart"
            name="lk1"
            content-class="ddd"
            :to="{ path: `/cart` }"
          >
            <q-badge color="red" floating>2</q-badge>
          </q-route-tab>
          <!-- <q-btn-dropdown auto-close stretch flat label="More...">
            <q-list>
              <q-item clickable @click="tab = 'movies'">
                <q-item-section>Movies</q-item-section>
              </q-item>

              <q-item clickable @click="tab = 'photos'">
                <q-item-section>Photos</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->
          <q-tab
            icon="o_manage_accounts"
            name="lk1"
            label="профиль"
            content-class="ddd"
            @click="toggleRghtDrawer"
          />
        </q-tabs>
        <q-tabs
          v-else
          class="tb gt-sm"
          align="right"
          shrink
          inline-label
          no-caps
        >
          <q-route-tab
            name="login"
            icon="o_login"
            label="вход"
            :to="{ name: 'Login' }"
          />
          <!-- <span> | <a @click="test1">Logout</a></span> -->
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      side="left"
      behavior="mobile"
      :width="300"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-drawer
      class="qqq"
      v-model="rightDrawerOpen"
      overlay
      side="right"
      behavior="mobile"
    >
      <div>
        <q-list bordered>
          <q-item-label header
            >Здравствуйте,
            <span class="text-weight-bold">{{
              user.nameUser
            }}</span></q-item-label
          >

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_account_box" class="q-pr-sm"> </q-icon>
              <!-- <q-badge color="red" class="white_badge"> 33 </q-badge> -->
            </q-item-section>
            <q-item-section>
              <q-item-label>Контактная информация</q-item-label>
              <!-- <q-item-label caption> Адрес, телефон, e-mail ... </q-item-label> -->
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_feedback" class="q-pr-sm"> </q-icon>
              <!-- <q-badge color="red" class="white_badge"> 33 </q-badge> -->
            </q-item-section>
            <q-item-section>
              <q-item-label>Мои объявления</q-item-label>
              <!-- <q-item-label caption> История объявлений ... </q-item-label> -->
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_card_giftcard" class="q-pr-sm"> </q-icon>
              <!-- <q-badge color="red" class="white_badge"> 33 </q-badge> -->
            </q-item-section>
            <q-item-section>
              <q-item-label>Мои заказы</q-item-label>
              <!-- <q-item-label caption> История заказов ... </q-item-label> -->
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_shopping_cart" class="q-pr-sm"> </q-icon>
              <q-badge color="red" class="white_badge"> 33 </q-badge>
            </q-item-section>

            <q-item-section>Моя корзина</q-item-section>
          </q-item>
          <q-separator />
          <q-item-label header> Мой бизнес </q-item-label>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_business" class="q-pr-sm"> </q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Компания 1</q-item-label>
              <q-item-label caption> Администрирование ... </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_business" class="q-pr-sm"> </q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Компания 2</q-item-label>
              <q-item-label caption> Администрирование ... </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="o_mail" class="q-pr-sm"> </q-icon>
              <q-badge color="red" class="white_badge"> 33 </q-badge>
            </q-item-section>

            <q-item-section>Сообщения</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="o_logout" />
            </q-item-section>

            <q-item-section>Выход</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container class="col-12">
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white lt-md">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        v-model="tab"
      >
        <q-route-tab name="images" label="Images" to="{name:Login}" />
        <q-tab name="videos" label="Videos" />
        <q-tab name="articles" label="Articles" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

//import { ref } from 'vue';
// import kskNews from './components/Raznoe/Newsksk66/Newsksk66.vue';
// import popup from '@/components/Popup/Popup_service.vue';
export default {
  data() {
    let leftDrawerOpen = false;
    let rightDrawerOpen = false;
    return {
      leftDrawerOpen,
      token: "",
      rightDrawerOpen,
    };
  },
  methods: {
    ...mapActions("auth", {
      logout: "logout",
      logout2: "logout2",
      chek_token: "chek_token",
    }),
    // chek(www) {
    //   this.chek_token(www);
    // },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRghtDrawer() {
      this.rightDrawerOpen = !this.leftDrawerOpen;
    },
    //   logout() {
    //     console.log('ffffffffffffffff')
    // this.$store.dispatch('logout1')
    // .then(() => {
    //   this.$router.push('/')
    // })
    //}
    // test1() {
    //   this.$store.dispatch("auth/logout2");
    // },
  },

  // setup() {
  //   const leftDrawerOpen = ref(false);
  //   const PopupPrimerShow = ref(false);
  //   const vp = () => {
  //     console.log('откроем модальное окно');
  //   };
  //   const showPopupPrimer1 = () => {
  //     console.log('показать попап');
  //     PopupPrimerShow.value = true;
  //     console.log(PopupPrimerShow.value);
  //   };
  //   const closePopupPrimer1 = () => {
  //     PopupPrimerShow.value = false;
  //     console.log(PopupPrimerShow.value);
  //   };
  //   return {
  //     leftDrawerOpen,
  //     showPopupPrimer1,
  //     closePopupPrimer1,
  //     PopupPrimerShow,
  //     vp,
  //     // toggleLeftDrawer() {
  //     //   leftDrawerOpen.value = !leftDrawerOpen.value;
  //     // },
  //   };
  // },
  computed: {
    ...mapGetters({
      isLogeded: "auth/isLoggedIn",
      isInput: "auth/isInput",
      chek_token1: "auth/token",
      token11: "auth/token11",
      user: "auth/user",
    }),
  },

  components: {
    // kskNews,
    // popup: popup,
  },
  mounted() {
    if (this.isLogeded) {
      //console.log("Проверяем существующий токен(если он есть в локал стораж)");
      let token = localStorage.getItem("neksk_token");
      axios
        .get("/api/check_token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);

          if (response.data == "del_token") {
            console.log("dddddddddddddddddddddddddddddddddd");
            this.logout();
          } else {
            //this.$store.dispatch("auth/chek_token", response.data);
            let payload = { user: response.data, token33: token };
            this.chek_token(payload);
          }
        });
      ////console.log(`Существующий токен некск: ${token}`);
      //this.chek_token(usertoken);
    } else {
      console.log("не залогинен");
    }
  },
};
</script>
<style lang="scss">
$primary: "#000";
.tb {
  border: 0px solid red;
  width: 100%;
}
.bt {
  border: 0px solid red;
}
.tt {
  border: 0px solid red;
}
.main-header {
  background-color: $primary;
}
.ddd {
  font-size: 42px;
}
.qqq {
  width: 600px;
}
.white_badge {
  color: #fff !important;
  position: absolute;
  top: 10px;
  left: 30px;
}
/* анимация переходы */
/* ///////////////////////////// */
/* .prozrachnost-enter-active,
.prozrachnost-leave-active {
  transition: opacity 1s;
}

.prozrachnost-enter-from,
.prozrachnost-leave-to {
  opacity: 0;
}
.prozrachnost-enter-to,
.prozrachnost-leave-from {
  opacity: 1;
} */
/* /////////////////////////// */
/* ///////////////////////////// */
/* .prozrachnost_razmer-enter-active,
.prozrachnost_razmer-leave-active {
  transition: opacity 5s linear;
}

.prozrachnost_razmer-enter-from,
.prozrachnost_razmer-leave-to {
  opacity: 0;
}
.prozrachnost_razmer-enter-to,
.prozrachnost_razmer-leave-from {
  opacity: 1;
} */
/* /////////////////////////// */
/* ///////////////////////////// */
.pr-enter-to,
.pr-leave-from {
  opacity: 1;
}
.pr-enter-active,
.pr-leave-active {
  transition: opacity 0.7s ease;
}

.pr-enter-from,
.pr-leave-to {
  opacity: 0;
}

/* /////////////////////////// */
/* ///////////////////////////// */
.pr1-enter-to {
  opacity: 1;
}
.pr1-leave-from {
  opacity: 1;
}
.pr1-enter-active,
.pr1-leave-active {
  transition: all 1s ease-in-out;
}

.pr1-enter-from {
  opacity: 0;
}

.pr1-leave-to {
  opacity: 0;
}

/* /////////////////////////// */
/*//////////////////////////////*/
/* ///Анимация списка технологий// */
.list_ksknews-enter-to,
.list_ksknews-leave-from {
  opacity: 1;

  /* transform: rotate(360deg); */
}

.list_ksknews-enter-active,
.list_ksknews-leave-active {
  transition: all 300;
}

.list_ksknews-enter-from,
.list_ksknews-leave-to {
  opacity: 0;
}
</style>