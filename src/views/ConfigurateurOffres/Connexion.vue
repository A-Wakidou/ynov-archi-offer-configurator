<template>

    <div class="view-container">

        <div class="container">
            <h2> <span> Se connecter </span> </h2>
            <form @submit="onSubmit">
            <input type="email" name="mail" v-model="form.email" placeholder="Mail" autocomplete="off" required>
            <input type="password" name="password" v-model="form.password" placeholder="Mot de passe" required>
            <span v-show="error" id="errorSpan" class="error-span"> {{ error }}</span>
            <div class="div-span">
                <router-link to="/send-mail-forgotten-password">
                    <span>Mot de passe oublié ?</span>
                </router-link>
                <router-link to='/inscription'>
                    <span>Créer un compte</span>
                </router-link>
            </div>
            <button type="submit">Connexion</button>
            </form>
            <router-link to="/compte">Swipe</router-link>  
        </div>  
    </div>

</template>

<style scoped>

    a {
        color:inherit;
        text-decoration: none;
    }

    .error-span {
        display: block;
        color: red;
        font-weight:bold;
    }

    .div-span {
        margin: 5% 0;
    }

    .div-span span {
        margin-right: 3%;
        cursor: pointer;
    }

        .div-span span:hover{
            text-decoration: underline;
        }

    button {
        display:block;
        border:none;
        background-color: #21252B;
        border: 1px solid white;
        color: white;
        border-radius: 5px;
        padding: 1.5% 2%;
        cursor: pointer;
        margin: 3% auto;
    }

    button:hover {
        background-color: #383f49;
        transition: .4s;
    }

    button:focus {
        outline: none;
    }

    input {
        background-color: transparent;
        margin-bottom: 3%;
        background-position: 5% 50%;
        background-size: 5%;
        padding-left: 13%;
        background-repeat: no-repeat;
        width: 75%;
        height: 3em;
        outline: 0;
        border: none;
        border: 1px solid rgb(214, 214, 214);
        border-radius: 5px;
    }

        input[name="mail"] {
            background-image: url('../../assets/logos/account.svg');
        }

        input[name="password"] {
            background-image: url('../../assets/logos/lock.svg');
        }

        h1 {
            margin: 7% 0;
        }

            h1 span {
                padding: 0.25% 1.5%;
                border-radius: 10px;
            }


    .container{
        width: 50%;
        margin: 0 auto;
        text-align: center;
    }

    @media (max-width: 641px) {
        .container {
            margin-top: 5%;
            width: 100%;
        }
    }

</style>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            error: false,
            form: {
                email: '',
                password: ''
            }
        }
    },  
    methods: {
        animateError(element, animation, prefix = 'animate__') {
            new Promise((resolve) => {
                const animationName = `${prefix}${animation}`;
                const node = document.getElementById(element);
                node.classList.add(`${prefix}animated`, animationName);
                // When the animation ends, we clean the classes and resolve the Promise
                function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
                }
                node.addEventListener('animationend', handleAnimationEnd, {once: true});
            });
        },
        onSubmit(e) {
            e.preventDefault()
            var vm = this
            axios.post(`${process.env.VUE_APP_SERVER_HOST}/user/login`, this.form)
                .then(function(response) {
                    sessionStorage.setItem('token' ,response.data.token)
                    sessionStorage.setItem('userId',response.data.userId)
                    sessionStorage.setItem('userEmail', response.data.userEmail)
                    sessionStorage.setItem('userName', response.data.userName)
                    sessionStorage.setItem('userFirstName', response.data.userFirstName)
                    vm.$store.commit('CONNECTION')
                    vm.$router.push('/compte')
                })
                .catch( function(e) {
                    if (e.response) {
                        if(e.response.data.error == 'wrong password' || e.response.data.error == 'user not find')
                        vm.animateError('errorSpan', 'shakeX')
                        vm.error = 'Identifiants incorrects'
                    } else if (e.request) {
                        // The request was made but no response was received
                        vm.error = e.request
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        vm.error =  e.message
                    }
                })
        }
    }
}
</script>