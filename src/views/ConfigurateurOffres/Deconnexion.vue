<template>
    <div class="view-container">
        <div class="deconnexion">
            <div class="deconnexion-div">
                <div class="div-p">
                    <p>Vous avez bien été déconnecté(e).</p>
                    <p>Redirection vers l'accueil en cours...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    p {
        font-weight: bold;
        font-size: 1.2em;
    }

    img {
        width: 40%;
    }

    .deconnexion-div {
        background-color:#21252B;
        color: white;
        border-radius: 10px;
        height:500px;
        display:grid;
        align-items: center;
    }


    .deconnexion {
        padding: 5% 15%;
        display: grid;
        align-items: center;
        text-align: center;
        grid-template-columns: 70% 30%;
    }

    
    @media (max-width: 641px) {

        .deconnexion {
            display: block;
        }

        img {
            display: block;
            margin: 0 auto;
        }

        .img-div {
            margin: 5% 0
        }

    }

</style>