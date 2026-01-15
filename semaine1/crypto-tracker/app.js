// 1. SELECTEURS & VARIABLES
const container = document.getElementById('container-parent');
const loader = document.getElementById('donnes-crypto');
// URL pour récupérer le TOP 50, en USD
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

// 2. FONCTION UTILITAIRE : FORMATAGE ARGENT
// Ça transforme "23000.5" en "$23,000.50" automatiquement
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

// fonction asyncrone
 async function fetchCrypto() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("erreur api");
        const data = await response.json();
        affichage(data)
    } catch (error) {
        loader.innerHTML = `<p style= "text-aligne:center; color:red"> erreur: ${error.message}`
    }

 };
//  affichons les donness
 function affichage(data) {
    loader.innerHTML = '';
     data.foreach((crypto,index)=>{
        const positive = price_change_percentage_24h > 0? true:false;
        const couleur = positive? "positive": "negative"
        const fleche = positive ? '⬆️' : '⬇️';

        // creons notre div
        const ligne = document.createElement('div');
       ligne.className = "crypto-row";


       ligne.innerHTML = `
        <div class="col"> ${index+1} </div>
         <div class="col coin-info"> 
         <img class="coin-info" src="${crypto.image}
         <span> ${crypto.name} <span>
          <span class="coin-symbol"> ${crypto.symbol.toUppercase} <span>
         </div>

         <div class="prix">
         ${formatter.format(crypto.current_price)}
        </div>

        <div class="col change ${couleur}">
                ${fleche} ${crypto.price_change_percentage_24h.toFixed(2)}%
            </div>

            <div class="col marketcap">
                ${formatter.format(crypto.market_cap)}
            </div>
       `;

       loader.appendChild(fleche)
    })
 };

 fetchCrypto();

// Bonus : Rafraîchir toutes les 60 secondes
setInterval(fetchCrypto, 60000)