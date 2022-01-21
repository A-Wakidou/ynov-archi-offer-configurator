<template>

    <div class="view-container">

        <div class="container">
            <h1> Modifier votre mot de passe </h1>
            <form @submit="onSubmit">
                <h3>Remplissez le formulaire ci-dessous pour modifier votre mot de passe</h3>
                
                <div class="inputs">
                    <div>
                        <label for="oldPassword" >Ancien mot de passe</label>
                        <input type="password" name="oldPassword" v-model="form.oldPassword" placeholder="Votre ancien mot de passe" required>
                    </div>

                    <span v-if="error" class="animate__animated animate__shakeX"> Ancien mot de passe non valide</span>

                    <div>
                        <label for="password1">Nouveau mot de passe</label>
                        <input type="password" name="password1" v-model="form.password1" placeholder="Votre nouveau mot de passe" required>
                    </div>

                    <div>
                        <label for="password2">Répétez votre nouveau mot de passe</label>
                        <input type="password" name="password2" v-model="form.password2" placeholder="Répétez votre nouveau mot de passe" required>
                    </div>
                </div>

                <span v-if="passwordError" class="animate__animated animate__shakeX">Mot de passes non identiques</span>
                <div>
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

    span {
        display: block;
        transition: .4s;
        color: red;
        font-weight:bold;
        margin: 3% 0;
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

        form {
            margin: 10% 0;
        }

        .inputs {
            margin: 10% 0;
        }

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
            passwordError: false,
            error: false,
            form: {
                oldPassword: '',
                password1: '',
                password2: '',
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            var vm = this
            var data = {
                userId : sessionStorage.getItem('userId'),
                form : this.form
            }
            if(this.form.password1 == this.form.password2) {
                this.passwordError = false
                axios.post(process.env.VUE_APP_SERVER_HOST+'/user/changePassword', data,{
                    headers: {
                        'Authorization': "Bearer " +sessionStorage.getItem('token')
                    }
                }) 
                .then(function(response) {
                    console.log(response)
                    vm.$router.push('/confirmation-compte/change-password')
                })
                .catch( () => this.error = true)
            }
            else {
                this.passwordError = true
            }
        }
    }
}
</script>