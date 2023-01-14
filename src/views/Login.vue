<template>
  <div class="outer">
    <p>登录</p>
    <input type="text" v-model="phone" class="username" placeholder="请输入用户名" />
    <input type="password" v-model="password" class="password" placeholder="请输入密码" />
    <button @click="Login">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password
      });
      if (res.data.code == 200) {
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);

        this.$router.push("/infoUser");
      } else {
        alert("手机号或密码错误");
        this.phone = "";
        this.password = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;
}
.username,
.password {
  //   display: inline-block;
  width: 50%;
}
</style>