<template>
    <div>
        <div>
            <div class="header"></div>
            <div class="content">
                <div class="signup-form">
                    <div class="signup-form__title">登录账号</div>
                    <div class="inp">
                        <el-input name="username" v-model="username" placeholder="用户名/邮箱" clearable></el-input>
                    </div>
                    <br>
                    <div class="inp">
                        <el-input name="password" v-model="password" placeholder="密码" show-password></el-input>
                    </div>
                    <br>
                    <button name="login" class="signup_button" @click="login">登录</button>
                    <div class="signup-form-nav">
                        <span class="signup-form-nav-left">新用户?
                            <router-link to="/register"><span style="color:#409EFF">注册</span></router-link>
                        </span>
                        <router-link to="/forget"><span class="signup-form-nav-right">忘记密码</span></router-link>
                    </div>
                    <br>
                    <div class="signup-sns">
                        <!--第三方登录-->
                    </div>
                    <br>
                    <div class="terms">@posted sadnesspineapple</div>
                </div>

            </div>
            <BackBanner></BackBanner>

            <div class="footer"></div>
        </div>
    </div>

</template>

<script>
    import '@/assets/css/register.css'
    import BackBanner from "../components/BackBanner";
    import {setToken} from "../utils/auth";
    import {get_user_info} from "../assets/js/api";

    export default {
        name: "Login",
        components: {
            BackBanner
        },
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                // 登录
                // 校验用户名和密码是否正确
                if (!this.username || !this.password) {
                    this.$message({
                        message: "请输入用户名或密码",
                        type: "warning",
                        duration: 1000,
                    });
                } else {
                    // 登录
                    let data = {
                        username: this.username,
                        password: this.password
                    }
                    let res_data = this.$api.login(data)
                    res_data.then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: "登录成功",
                                type: "success",
                                duration: 1000,
                            });

                            setToken(res.data.data.jwt)

                            // 获取用户信息
                            let result = get_user_info()
                            result.then(res=>{
                                this.$store.dispatch('saveUserInfo',res.data.data);//请求回来后，把用户信息存储到VUEX里
                            })

                            this.$router.push('/')
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: "error",
                                duration: 1000
                            })
                        }
                    })
                }
            }
        }
    }

</script>

<style>

</style>
