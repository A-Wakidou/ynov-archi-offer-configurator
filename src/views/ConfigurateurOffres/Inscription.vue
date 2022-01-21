<template>

    <div class="view-container">

        <div class="container">
            <h1> S'inscrire </h1>
            <form @submit="onSubmit">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="form.email" placeholder="Votre email" autocomplete="off" required>
            <label for="password">Mot de passe</label>
            <input type="password" name="password" v-model="form.password" placeholder="Votre mot de passe" required>
            <label for="password2">Répétez votre mot de passe</label>
            <input type="password" name="password2" v-model="form.password2" placeholder="Répétez votre mot de passe" required>
            <label for="sex">Civilité</label>
            <select name="sex" v-model="form.sex">
                <option value="" selected disabled></option>
                <option value="m">M</option>
                <option value="f">F</option>
            </select>
            <label for="name">Nom</label>
            <input type="text" name="name" v-model="form.name" placeholder="Votre nom" required>
            <label for="firstname">Prénom</label>
            <input type="text" name="firstname" v-model="form.firstname" placeholder="Votre prénom" required>
            <label for="birthdate">Date de naissance</label>
            <input type="date" name="birthdate" v-model="form.birthdate" required>
            <label for="societe">Société</label>
            <input type="text" name="societe" v-model="form.societe" placeholder="Votre société" required>
            <span class="error-span" id="errorSpan" v-show="error"> {{error}} </span>
            <button type="submit">Valider</button>
            </form>  
        </div>  
    </div>

</template>

<style scoped>

    a {
        color:inherit;
        text-decoration: none;
    }

    span {
        display:block;
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

    label {
        margin-left: 10%;
        display: block;
        text-align: start;
        font-weight: bold;
        font-size: 1.1em;
    }

    input, select {
        margin: 1% 0;
        margin-bottom: 5%;
        width: 80%;
        height: 3em;
        outline: 0;
        border-width: 0 0 2px;
        padding-left: 0.5%;   
    }

    input::placeholder {
        font-weight: bold;
    }

    input:focus {
        transition: .5;
        border-color: rgb(255, 183, 183);
    }

    select {
        width: 6%;
        display: block;
        margin-right: auto;
        margin-left: 10%;
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
            error:'',
            form: {
                email: '',
                password: '',
                password2: '',
                name: '',
                firstname:'',
                sex: '',
                birthdate: '',
                societe:''
            },
            formLogin: {
                email:'',
                password:''
            }
        }
    },  
    methods: {
        animateError(element, animation, prefix = 'animate__') {
            new Promise((resolve) => {
                const animationName = `${prefix}${animation}`
                const node = document.getElementById(element)
                node.classList.add(`${prefix}animated`, animationName);
                // When the animation ends, we clean the classes and resolve the Promise
                function handleAnimationEnd(event) {
                event.stopPropagation()
                node.classList.remove(`${prefix}animated`, animationName)
                resolve('Animation ended')
                }
                node.addEventListener('animationend', handleAnimationEnd, {once: true});
            });
        },
        onSubmit(e) {
            var vm = this
            e.preventDefault()
            if(this.form.password == this.form.password2) {
                axios.post(process.env.VUE_APP_SERVER_HOST+'/user/signup', this.form)
                    .then(function(response) {
                        if (response) {
                            vm.formLogin.email = vm.form.email
                            vm.formLogin.password = vm.form.password 
                            axios.post(process.env.VUE_APP_SERVER_HOST+'/user/login', vm.formLogin)
                                .then(function(response) {
                                    sessionStorage.setItem('token' ,response.data.token)
                                    sessionStorage.setItem('userId',response.data.userId)
                                    sessionStorage.setItem('userEmail', response.data.userEmail)
                                    sessionStorage.setItem('userName', response.data.userName)
                                    sessionStorage.setItem('userFirstName', response.data.userFirstName)
                                    vm.$store.commit('CONNECTION')
                                    vm.$router.push('/compte')
                                }) 
                        }
                    })
                    .catch(function(e) {
                        if (e.response) {
                            if(e.response.data.error == 'user already exist')
                            vm.animateError('errorSpan', 'shakeX')
                            vm.error = 'Email déjà éxistant'
                            //console.log(e.response.status);
                            //console.log(e.response.headers);
                        } else if (e.request) {
                            // The request was made but no response was received
                            vm.error = e.request
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            vm.error =  e.message
                        }
                    })
            }
            else {
                this.error = 'Mot de passe non identiques'
                this.animateError('errorSpan', 'shakeX')
            }
        }
    }
}
</script>