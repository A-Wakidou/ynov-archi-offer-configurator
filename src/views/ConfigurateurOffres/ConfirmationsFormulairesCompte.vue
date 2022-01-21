<template>
    <div>
        <h1> {{dataConfirmation.title }}</h1>
        <h2> {{dataConfirmation.p}}</h2>
    </div>

</template>

<style scoped>

    h1 {
        margin: 5% 0;
    }

</style>

<script>
export default {
    name: 'ConfirmationsFormulairesCompte',
    props: ['name'],
    data() {
        return {
            dataConfirmation: '',
            dataConfirmationObjects: [
                {
                    slug:'sign-up',
                    title:'Compte confirmé !',
                    p: 'Redirection..'
                },
                {
                    slug: 'change-email',
                    title: 'Changement d\'email effectué',
                    p: 'Redirection..'
                },
                {
                    slug: 'change-password',
                    title: 'Changement de mot de passe effectué',
                    p: 'Redirection..'
                },
                {
                    slug: 'send-email-forgotten-password',
                    title: 'Demande de changement de mot de passe confirmée',
                    p: 'Vous recevrez un email afin de réinitialiser votre mot de passe. Redirection..'
                },
                {
                    slug:'forgotten-password',
                    title: 'Changement de mot de passe effectué !',
                    p: 'Redirection..'
                }
            ]
        }
    },
    methods: {
        redirection(to) {
            var vm = this
            function redirection () {
                vm.$router.push(to)
            }
            setTimeout(redirection, 3000)
        }
    },
    mounted() {
        for( var i=0; i < this.dataConfirmationObjects.length; i++) {
            if(this.dataConfirmationObjects[i].slug == this.name) {
                this.dataConfirmation = this.dataConfirmationObjects[i]
            }
        }
        var to = ''
        if(this.dataConfirmation.slug == 'forgotten-password' || this.dataConfirmation.slug == 'sign-up' || this.dataConfirmation.slug == 'send-mail-forgotten-password')
        {
            to = '/connexion'
        }
        else {
            to = '/compte'
        }
        this.redirection(to)

    }
}
</script>