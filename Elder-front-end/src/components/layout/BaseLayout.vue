<template>
  <div class="layout">
    <Layout style="minHeight: 100vh;">
      <Header>
        <div class="layout-logo">
          <span>{{ WEBNAME }}</span>
        </div>
        <Icon
          :style="{margin: '0 20px', color: '#FFF', 'font-size': '22px', margin: '0px 30px', 'vertical-align': 'middle'}"
          :class="rotateIcon"
          type="md-menu"
          size="24"
          @click.native="collapsedSider"
        ></Icon>
        <div class="user-avatar-dropdown">
          <Dropdown @on-click="handleClick">
<!--            这里记得要换成管理员名-->
            <span>{{ UserName }}</span>
            <Icon :size="15" type="md-arrow-dropdown" :class="{changed: isChanged}"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu
            ref="leftmenu"
            @on-open-change="isCollapsed=false"
            @on-select="selectmenu"
            :active-name="activeName"
            :theme="themeCus"
            width="auto"
            :class="menuitemClasses"
            :open-names="opennames"
            accordion
          >
            <template v-for="item in menuList">
              <template v-if="item.children.length > 0">
                <Submenu :name="item.meta.index">
                  <template slot="title">
                    <Icon :type="item.icon"></Icon>
                    <span>{{item.meta.title}}</span>
                  </template>
                  <template v-for="child in item.children">
                    <MenuItem :name="child.meta.index" :to="{name: child.name}">{{child.meta.title}}</MenuItem>
                  </template>
                </Submenu>
              </template>
              <template v-else>
                <MenuItem :name="item.meta.index" :to="{name: item.name}">
                  <Icon :type="item.icon" />
                  <span>{{item.meta.title}}</span>
                </MenuItem>
              </template>
            </template>
          </Menu>
        </Sider>
        <Content>
          <header-bread v-if="showHome" :list="breadCrumbList"></header-bread>
          <div :style="{'padding': '20px'}">
            <router-view :key=componentKey></router-view>
          </div>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2022.07-{{ footerTime }} &copy; LongWanzhou</Footer>
    </Layout>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import HeaderBread from "_c/common/BreadCrum.vue";
import routers from "@/router/routers";
import util from "@/util";
import store from "@/store"; //测试环境
// import Login from "@/views/user/Login";

export default {
  name: "home",
  components: {
    HeaderBread,
  },
  data() {
    return {
      UserName:'',
      componentKey: 0,
      themeCus: "dark",
      WEBNAME: this.$config.CONSTANTS.WEBNAME,
      opennames: [],
      activeName: "",
      isCollapsed: false,
      isChanged: false,
      showHome: true,
    };
  },
  watch: {
    isCollapsed(val) {
      if (val) {
        this.opennames = [];
        this.$nextTick(() => {
          this.$refs.leftmenu.updateOpened();
        });
      } else {
        this.opennames = this.$route.meta.index
          ? [this.$route.meta.index.split("-")[0]]
          : [];
        this.$nextTick(() => {
          this.$refs.leftmenu.updateOpened();
        });
      }
    },
    $route(newRoute) {
      if (newRoute.name == this.$config.CONFIG.homeName) {
        this.opennames = [];
        this.activeName = "1";
      }
      this.$nextTick(() => {
        this.isShowName(newRoute);
        this.setBreadCrumb(newRoute);
        this.$refs.leftmenu.updateOpened();
      });
    }
  },
  computed: {
    ...mapGetters(["userInfo", "menuList", "breadCrumbList"]),
    footerTime() {
      const now = `0${new Date().getMonth() + 1}`.slice(-2);
      return `${new Date().getFullYear()}.${now}`;
    },
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  created() {
    if (this.$route.meta && this.$route.meta.index) {
      this.activeName = this.$route.meta.index;
      this.opennames.push(this.$route.meta.index.split("-")[0]);
    }
    this.UserName = store.getters.userInfo.name;
  },
  methods: {
    ...mapMutations(["setBreadCrumb", "setHomeRoute"]),
    ...mapActions(["Logout"]),
    selectmenu(name) {
      this.componentKey = Math.random() + '' + new Date().getTime();
      this.isCollapsed = false;
      this.opennames = [];
      this.activeName = name;
      if (name.split("-")[1]) {
        this.opennames.push(name.split("-")[0]);
      }
      this.$nextTick(() => {
        this.$refs.leftmenu.updateOpened();
      });
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.handleLogout();
          break;
        default:
          break;
      }
    },
    handleLogout() {
      // this.Logout().then(() => {
      //   this.$Message.success("退出成功");
      //   this.$router.replace({ name: "login" });
      // });
      util.storage.clear(); //测试环境
      this.$Message.success("退出成功");
      this.$router.replace({ name: "login" });
    },
    handleChange() {
      this.isChanged = !this.isChanged;
    },
    isShowName(route) {
      if (route.name == this.$config.CONFIG.homeName) {
        this.showHome = false;
      } else {
        this.showHome = true;
      }
    }
  },
  mounted() {
    this.setHomeRoute(routers);
    this.isShowName(this.$route);
    this.setBreadCrumb(this.$route);
  }
};
</script>

<style>
@import "./baseLayout.css";
</style>