<template>
    <div class="view-container">
        <h1> <span> Votre compte </span> </h1>
        <div class="div-account">
            <div class="div-img">
                <img v-if="dataUser.isAdmin==0" src="@/assets/logos/account.svg" alt="Account">
                <img v-if="dataUser.isAdmin==1" src="@/assets/logos/admin-account-black.svg" alt="Account">
                <ul>
                    <li v-if="dataUser.isAdmin==1" style="color:red"> Administrateur</li>
                    <li> Nom : <span> {{dataUser.name}}</span> </li>
                    <li> Prénom : <span> {{dataUser.firstname}}</span> </li>
                    <li v-if="dataUser.isAdmin==1">
                        <router-link to="/admin-page">
                            <button> Accéder à la section administrateurs </button>
                        </router-link>        
                    </li>
                </ul>
            </div>
            <div v-if="dataUser.isConfirmed==0" class="no-confirmation">
                <p>Un email a été envoyé à votre adresse e-mail, afin de confirmer votre compte.</p>
            </div>
            <div class="grid">
                <div class="div-infos">
                    <h2>Informations personnelles</h2>
                    <ul>
                        <li> Civilité : <span> {{dataUser.sex}} </span> </li>
                        <li> Date de naissance : <span> {{dataUser.birthdate}} </span> </li>
                        <li> Email : <span> {{dataUser.email}}</span> </li>
                        <li> Société : <span> {{dataUser.societe}} </span> </li>
                        <li> Membre depuis le : <span> {{dataUser.createdAt}} </span> </li>
                    </ul>
                </div>
                <div class="div-parametres">
                    <h2>Paramètres</h2>
                    <ul>
                        <li>
                            <router-link to="/modifier-e"> <p>Modifier l'adresse mail</p> </router-link>
                        </li>
                        <li>
                            <router-link to="/modifier-m"> <p>Modifier le mot de passe</p> </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        <router-link to="/admin-page">Swipe</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            dataUser:'',
        }
    },
    beforeCreate () {
        var vm = this
        axios.get(process.env.VUE_APP_SERVER_HOST+'/user/account', {
            headers: {
                'Authorization': "Bearer " +sessionStorage.getItem('token')
            },
            params: {
                userId : sessionStorage.getItem('userId')
            } 
        })
            .then(function(response) {
                vm.dataUser =response.data.dataUser
            })
    }
}
</script>

<style scoped>

    .view-container{
        text-align: left;
        font-weight: bold;
    }

    h1 {
        margin: 1.5% 10%;
        font-size: 1.6em;
    }

    h1 span {
        padding: 0.8% 1%;
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0), 0 2px 10px 0 rgba(0, 0, 0, 0.5);
        border-radius: 5px;
    }

    h2 {
        margin: 0;
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0), 0 2px 10px 0 rgba(0, 0, 0, 0.5);
        padding: 0.6em;
        font-size:1.1em;
    }

    a {
        text-decoration: none;
    }

    button {
        border:none;
        border-radius: 3px;
        padding: 1em;
        font-size: 0.8em;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        background-color: rgb(0, 0, 0);
        color: white;
    }

        button:hover {
            background-color: rgb(39, 39, 39);
            transition: 0.2s;
        }

    ul {
        padding:0;
    }

    .no-confirmation {
        text-align: left;
        padding: 1% 8%;
        margin: 3% 0;
    }
        .no-confirmation p {
            color: red;
            background-color: #fff;
            border-radius: 3px;
            padding: 1%;
            width: 70%;
        }

    .div-img {
        margin: 1% 0;
        grid-row: 1/2
    }

        .div-img ul {
            margin: 3% 0;
        }

    .div-img li {
        list-style: none;
        margin: 1% 0;
    }

        .div-img img {
            box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 1);
            width: 20%;
        }

        div h2 {
            margin-bottom: 5%;
        }

        div ul {
            margin: 0% 5%;
        }

        div ul li {
            list-style: square;
            margin: 3% 0;
        }

    .div-infos {
        grid-column: 1/2;
        grid-row: 1/2;
    }

    .div-account {
        margin: 0 10%;
        padding: 3%;
        border-radius: 10px;
        border : 1px solid rgb(197, 197, 197);
    }

    .div-parametres {
        grid-column: 1/2;
        grid-row: 2/3;
    }

    .div-parametres a {
        color: inherit;
        text-decoration: underline;
    }

    .div-parametres p {
        margin: 1% 0;
    }

    .div-formations-list {
        grid-column:2/3;
        grid-row: 1/2;
    }

    .div-formations-button {
        grid-column: 2/3;
        grid-row: 2/3;
    }

        .div-formations-button p {
            color: red;
            background-color: #fff;
            border-radius: 3px;
            padding: 1%;
            margin: 5% 0;
            width: 55%;
        }

    @media (max-width: 641px) {

        h1 {
            margin: 10% 5%;
        }

        .div-account {
            margin: 5% 0;
        }

        .div-img {
            margin: 5% 0;
        }

            .div-img {
                text-align: center;
            }

            .div-img img {
                width: 30%;
            }

            .div-img ul {
                margin: 7% 0;
            }

            .div-img ul li {
                margin: 3% 0;
            }

        .grid {
            display:block;
            text-align: left;
        }

            .grid > div {
                margin: 15% 0;
            }

            .div-infos {
                margin-top: 0;
            }

            .grid > div h2 {
                margin: 7% 0;
            }

    }

</style>