<template>

    <div class="view-container">

        <div class="container">
            <h1> Mot de passe oublié </h1>
            <form @submit="onSubmit">
                <h3>Vous recevrez un mail afin de réinitialiser votre mot de passe</h3>
                <label for="email">Adresse email</label>
                <input type="email" name="email" v-model="form.email" placeholder="Adresse email" required>
                <span id="errorSpan" v-show="error" class="error-span"> {{error}} </span>
                <div>
                    <!--<Back-button/>-->
                    <button type="submit">Valider</button>
                </div>
            </form>  
        </div>  
    </div>

</template>

<style scoped>

    .error-span {
        display: block;
        color: red;
        font-weight:bold;
    }

    a {
        color:inherit;
        text-decoration: none;
    }

    p {
        margin: 5% 0;
    }

        p span {
            padding: 1%;
            border-radius: 3px;
            border: 1px solid rgb(175, 175, 175)
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
    
        h1 {
            margin: 7% 0;
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
//import BackButton from '@/components/BackButton.vue'
export default {
    data() {
        return {
            error:'',
            form: {
                email: ''
            }
        }
    },
    components: {
        //BackButton
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
            var data = {
                        form : this.form
                    }
            axios.post(process.env.VUE_APP_SERVER_HOST+'/user/send-mail-forgotten-password', data) 
            .then(function(response) {
                console.log(response.data.message)
                if(response.data.message == "email sent")
                {
                    vm.$router.push('/confirmation-compte/send-mail-forgotten-password')
                }
            })
            .catch(function(e) {
                if (e.response) {
                    if(e.response.data.error == 'email not find')
                    vm.animateError('errorSpan', 'shakeX')
                    vm.error = 'Email non trouvé'
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
    }
}
</script>