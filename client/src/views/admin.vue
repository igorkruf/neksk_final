<template>
  <div>
    <!-- <q-drawer v-model="AdminLeftDrawerOpen" :width="400" elevated behavior="mobile">
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-scroll-area>
  </q-drawer> -->
    <q-drawer
      side="right"
      v-model="AdminLeftDrawerOpen"
      bordered
      breakpoint="1040"
      :width="300"
      show-if-above
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm admin-menu">
          <div v-for="n in 50" :key="n">Drawer1 {{ n }} / 50</div>
        </div>
      </q-scroll-area>
      <!-- <div class="absolute-top header-admin-menu" v-if="isAdmin"></div> -->
    </q-drawer>
    <q-page class="page-container">
      <q-page-sticky position="top" expand>
        <q-toolbar class="bg-accent text-white">
          <q-toolbar-title> Здравствуйте, {{ user.nameUser }} </q-toolbar-title>
          <q-btn
            dense
            flat
            round
            icon="menu"
            @click="toggleAdminLeftDrawer"
            class="lt-md"
          />
        </q-toolbar>
      </q-page-sticky>
    </q-page>
  </div>
</template>
<script>
//import { mapGetters } from "vuex";
export default {
  //   console.log("eeeeeeeeeeee");
  //   // if (to.params.id != store.getters.user._id) {
  //   //   next({ path: "/:any(.*)" });
  //   // } else {
  //   //   next();
  //   // }
  // },
  data() {
    return {
      AdminLeftDrawerOpen: false,
      userid: "",
    };
  },
  methods: {
    toggleAdminLeftDrawer() {
      this.AdminLeftDrawerOpen = !this.AdminLeftDrawerOpen;
    },
  },
  // computed: { ...mapGetters("auth", { isAdmin: "isAdmin" }) },
};
</script>
<style lang="scss">
.page-container {
  border: solid 0px red;
}
.admin-menu {
  border: solid 1px red;
  // margin-top: 100px;
}
.header-admin-menu {
  border: solid 1px red;
  height: 100px;
  background-color: chartreuse;
}
</style>