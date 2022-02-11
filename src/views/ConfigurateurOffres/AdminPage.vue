<template>
    <div class="view-container">
        <div class="div-datas">
            <div class="div-products">
                <h2> <span> Produits </span> </h2>
                <table>
                    <thead>
                        <th>Identifiant</th>
                        <th>Nom</th>
                        <th>Coût (€)</th>
                    </thead>
                    <tbody>
                        <tr v-for="(data,i) in datas.products" :key="i">
                            <td>{{data.id}}</td>
                            <td>{{data.name}}</td>
                            <td>{{data.price}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="div-promos">
                <h2> <span> Promos en cours </span> </h2>
                <button @click="modalPromosOpen"> <img src="@/assets/logos/add-white.svg" alt="Add">Ajouter une promo</button>
                <div class="modal" id="modalPromos">
                    <span @click="modalPromosClose" class="close">&times;</span>
                    <h3>Ajouter une promo</h3>
                    <form @submit="onSubmitModalPromos">
                        <label for="productName">Choisir un produit :</label>
                        <select name="productName" v-model="modalPromosForm.productName">
                            <option v-for="(data,i) in datas.products" :key="i" :value="data.name">{{data.name}}</option>
                        </select>
                        <label for="originalPrice">Prix original</label>
                        <input type="number" name="originalPrice" v-model="modalPromosForm.originalPrice" required>
                        <label for="priceWithPromo">Prix avec promotion</label>
                        <input type="number" name="priceWithPromo" v-model="modalPromosForm.priceWithPromo" required>
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <th>Identifiant</th>
                        <th>Nom du produit</th>
                        <th>Prix original (€)</th>
                        <th>Prix avec promo (€)</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </thead>
                    <tbody>
                        <tr v-for="(data,i) in datas.promos" :key="i">
                            <td>{{data.id}}</td>
                            <td>{{data.productName}}</td>
                            <td>{{data.originalPrice}}</td>
                            <td>{{data.priceWithPromo}}</td>
                            <td> <img src="@/assets/logos/edit.svg" alt="Modifier"> </td>
                            <td> <img src="@/assets/logos/delete.svg" alt="Supprimer"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="div-upsell">
                <h2> <span> Produits Upsell </span> </h2>
                <button @click="modalUpsellOpen"> <img src="@/assets/logos/add-white.svg" alt="Add"> Ajouter un produit upsell </button>
                <div class="modal" id="modalUpsell">
                    <span @click="modalUpsellClose" class="close">&times;</span>
                    <h3>Ajouter un produit Upsell</h3>
                    <form @submit="onSubmitModalUpsell">
                        <label for="productName">Choisir un produit cible</label>
                        <select name="productName" v-model="modalUpsellForm.targetProduct">
                            <option v-for="(data,i) in datas.products" :key="i" :value="data.name">{{data.name}}</option>
                        </select>
                        <label for="productName">Choisir le produit Upsell</label>
                        <select name="productName" v-model="modalUpsellForm.upsellProduct">
                            <option v-for="(data,i) in datas.products" :key="i" :value="data.name">{{data.name}}</option>
                        </select>
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <th>Identifiant</th>
                        <th>Produit cible</th>
                        <th>Prix produit cible (€)</th>
                        <th>Produit Upsell</th>
                        <th>Coût Produit Upsell (€)</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </thead>
                    <tbody>
                        <tr v-for="(data,i) in datas.productsUpsell" :key="i">
                            <td>{{data.id}}</td>
                            <td>{{data.targetProduct}}</td>
                            <td>{{data.targetProductPrice}}</td>
                            <td>{{data.upsellProduct}}</td>
                            <td>{{data.upsellProductPrice}}</td>
                            <td> <img src="@/assets/logos/edit.svg" alt="Modifier"> </td>
                            <td> <img src="@/assets/logos/delete.svg" alt="Supprimer"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="div-cross-sell">
                <h2> <span> Produits Cross-sell </span> </h2>
                <button @click="modalCrossSellOpen"> <img src="@/assets/logos/add-white.svg" alt="Add"> Ajouter un produit cross-sell </button>
                <div class="modal" id="modalCrossSell">
                    <span @click="modalCrossSellClose" class="close">&times;</span>
                    <h3>Ajouter une promo</h3>
                    <form @submit="onSubmitModalCrossSell">
                        <label for="productName">Choisir un produit cible</label>
                        <select name="productName" v-model="modalCrossSellForm.targetProduct">
                            <option v-for="(data,i) in datas.products" :key="i" :value="data.name">{{data.name}}</option>
                        </select>
                        <label for="productName">Choisir le produit Cross-Sell</label>
                        <select name="productName" v-model="modalCrossSellForm.crossSellProduct">
                            <option v-for="(data,i) in datas.products" :key="i" :value="data.name">{{data.name}}</option>
                        </select>
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <th>Identifiant</th>
                        <th>Produit cible</th>
                        <th>Prix produit cible (€)</th>
                        <th>Produit Cross-Sell</th>
                        <th>Coût produit Cross-Sell (€)</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </thead>
                    <tbody>
                        <tr v-for="(data,i) in datas.productsCrossSell" :key="i">
                            <td>{{data.id}}</td>
                            <td>{{data.targetProduct}}</td>
                            <td>{{data.targetProductPrice}}</td>
                            <td>{{data.crossSellProduct}}</td>
                            <td>{{data.crossSellProductPrice}}</td>
                            <td> <img src="@/assets/logos/edit.svg" alt="Modifier"> </td>
                            <td> <img src="@/assets/logos/delete.svg" alt="Supprimer"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<style scoped>

    input, select, label {
        display: block;
    }

    label {
        margin: 2%;
    }

    input, select {
        background-color: transparent;
        margin-bottom: 3%;
        background-position: 5% 50%;
        background-size: 5%;
        background-repeat: no-repeat;
        width: 5%;
        height: 2em;
        outline: 0;
        border: none;
        border: 1px solid rgb(214, 214, 214);
        border-radius: 5px;
    }

    select {
        width: 10%;
    }

    button {
        border:none;
        border-radius: 3px;
        background-color: rgb(32, 147, 255);
        color:white;
        margin: 1% 0.5%;
        cursor:pointer;
    }

    button img {
        vertical-align: middle;
    }

    .div-datas div {
        padding: 2%;
        text-align: left;
    }

    .div-products, .div-upsell, .div-cross-sell {
        overflow-x:auto;
        max-width: 96%;
    }

    h2 {
        text-align: left;
        margin: 3% 0;
    }

    span {
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 2);
        padding: 1% 2%;
        border-radius: 5px;
    }

    .div-datas {
        font-size: 0.9em;
    }

    th, td {
        padding: 15px;
        text-align: left;
    }

    th {
        background-color: rgb(27, 27, 27);
        color: white;
        font-weight: bold;
    }

    .modal {
        display: none;
        z-index: 1; /* Sit on top */
        width: 90%; /* Full width */
        border: 2px solid whitesmoke;
        background-color: #fff;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

</style>

<script>
//import axios from 'axios'

export default {
    data() {
        return {
            modalPromosForm: {
                productName:'',
                originalPrice:'',
                priceWithPromo:''
            },
            modalUpsellForm: {
                targetProduct:'',
                upsellProduct:''
            },
            modalCrossSellForm: {
                targetProduct:'',
                crossSellProduct:''
            },
            datas: {
                products: [
                    {
                        id:1,
                        name: 'Produit 1',
                        price: 29.99,
                    },
                    {
                        id:2,
                        name: 'Produit 2',
                        price: 49.99,
                    },
                    {
                        id:3,
                        name: 'Produit 3',
                        price: 49.99
                    }
                ],
                promos: [
                    {
                        id:1,
                        productName: 'Produit 1',
                        originalPrice: 29.99,
                        priceWithPromo: 19.99
                    }
                ],
                productsUpsell: [
                    {
                        id:1,
                        targetProduct: 'Produit 1',
                        targetProductPrice: 29.99,
                        upsellProduct: 'Produit upsell 1',
                        upsellProductPrice: 59.99
                    },
                    {
                        id:2,
                        targetProduct: 'Produit 2',
                        targetProductPrice: 49.99,
                        upsellProduct: 'Produit upsell 2',
                        upsellProductPrice: 99.99,
                    },
                    {
                        id:3,
                        targetProduct: 'Produit 3',
                        targetProductPrice: 49.99,
                        upsellProduct: 'Produit upsell 3',
                        upsellProductPrice: 99.99
                    }
                ],
                productsCrossSell: [
                    {
                        id:1,
                        targetProduct: 'Produit 1',
                        targetProductPrice: 29.99,
                        crossSellProduct: 'Produit upsell 1',
                        crossSellProductPrice: 29.99
                    },
                    {
                        id:2,
                        targetProduct: 'Produit 2',
                        targetProductPrice: 29.99,
                        crossSellProduct: 'Produit upsell 2',
                        crossSellProductPrice: 34.99
                    },
                    {
                        id:3,
                        targetProduct: 'Produit 3',
                        targetProductPrice: 29.99,
                        crossSellProduct: 'Produit upsell 3',
                        crossSellProductPrice: 24.99
                    }
                ],
            },
        }
    },
    methods: {
        modalPromosOpen() {
            var modal = document.getElementById("modalPromos")
            modal.style.display = "block"
        },
        modalPromosClose() {
            var modal = document.getElementById("modalPromos")
            modal.style.display = "none"
        },
        onSubmitModalPromos(e) {
            e.preventDefault()
            console.log(this.modalPromosForm)
        },
        modalUpsellOpen() {
            var modal = document.getElementById("modalUpsell")
            modal.style.display = "block"
        },
        modalUpsellClose() {
            var modal = document.getElementById("modalUpsell")
            modal.style.display = "none"
        },
        onSubmitModalUpsell(e) {
            e.preventDefault()
            console.log(this.modalUpsellForm)
        },
        modalCrossSellOpen() {
            var modal = document.getElementById("modalCrossSell")
            modal.style.display = "block"
        },
        modalCrossSellClose() {
            var modal = document.getElementById("modalCrossSell")
            modal.style.display = "none"
        },
        onSubmitModalCrossSell(e) {
            e.preventDefault()
            console.log(this.modalCrossSellForm)
        }
    },
    mounted () {
        console.log(this.datas)
    //     var vm = this
    //     axios.get(process.env.VUE_APP_SERVER_HOST+'/user/admin-page', {
    //         headers: {
    //             'Authorization': "Bearer " +sessionStorage.getItem('token')
    //         },
    //         params: {
    //             userId : sessionStorage.getItem('userId')
    //         } 
    //     })
    //         .then(function(response) {
    //             vm.datas = response.data.datas
    //             console.log(vm.datas)
    //         })
    }
}
</script>