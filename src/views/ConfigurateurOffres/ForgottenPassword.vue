<template>

    <div class="view-container">

        <div class="container">
            <h1> Modifier votre mot de passe </h1>
            <form @submit="onSubmit">
                <h3>Remplissez le formulaire ci-dessous pour réinitialiser votre mot de passe</h3>

                <div>
                    <label for="password1">Nouveau mot de passe</label>
                    <input type="password" name="password1" v-model="form.password1" placeholder="Votre nouveau mot de passe" required>
                </div>

                <div>
                    <label for="password2">Répétez votre nouveau mot de passe</label>
                    <input type="password" name="password2" v-model="form.password2" placeholder="Répétez votre nouveau mot de passe" required>
                </div>

                <span v-show="error" id="errorSpan" class="error-span"> {{error }}</span>
                <div>
                    <Back-button/>
                    <button type="submit">Valider</button>
                </div>
            </form>  
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

    h3 {
        margin: 7% 0;
    }

    button {
        display:inline-block;
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

    input {
        margin: 1% 0;
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
    
        h1 {
            margin: 7% 0;
        }

    form div {
        margin: 5% 0;
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
            error: '',
            form: {
                password1: '',
                password2: '',
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
            e.preventDefault()
            var vm = this
            var data = {
                token: this.$router.history.current.params.token,
                form : this.form
            }
            if(this.form.password1 == this.form.password2) {
                axios.post(process.env.VUE_APP_SERVER_HOST+'/user/forgotten-password', data) 
                .then(function(response) {
                    if(response.data.message == "password changed") {
                        vm.$router.push('/confirmation-compte/forgotten-password')
                    }
                })
                .catch(function(e) {
                    if (e.response) {
                        if(e.response.data.error == 'error while changing password')
                        vm.animateError('errorSpan', 'shakeX')
                        vm.error = 'Une erreur est survenue lors du changement de mot de passe'
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
                this.animateError('errorSpan', 'shakeX')
                this.error = 'Mot de passe non identiques'
            }
        }
    }
}
</script>
