<template>

    <div class="view-container">

        <div class="container">
            <h1> Modifier votre adresse e-mail </h1>
            <form @submit="onSubmit">
                <h3>Saisissez la nouvelle adresse email que vous souhaitez associer à votre compte ci-dessous</h3>
                <p>Votre adresse email actuelle :  <span> {{ $store.state.userEmail }} </span> </p>
                <label for="email">Nouvelle adresse email</label>
                <input type="email" name="email" v-model="form.email" placeholder="Votre nouveau email" required>
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

        h1 {
            font-size: 1.6em;
        }

        p span {
            padding: 3% 0;
        }

        p {
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
            form: {
                email: ''
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
            axios.post(process.env.VUE_APP_SERVER_HOST+'/user/changeEmail', data,{
                headers: {
                    'Authorization': "Bearer " +sessionStorage.getItem('token')
                }
            }) 
            .then(function(response) {
                if(response.status == 200) {
                    sessionStorage.userEmail = response.data.userEmail
                    vm.$store.commit('CHANGE_EMAIL')
                }
                vm.$router.push('/confirmation-compte/change-email')
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }
}
</script>