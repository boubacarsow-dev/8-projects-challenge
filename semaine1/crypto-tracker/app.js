// 1. SÉLECTEURS
const loader = document.getElementById('donnes-crypto');

// URL de l'API
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

// 2. FORMATAGE ARGENT (USD)
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

// ma FONCTION ASYNCHRONE
async function fetchCrypto() {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        affichage(data);

    } catch (error) {
        loader.innerHTML = `<p style="text-align:center; color:red"> Erreur: ${error.message}</p>`;
    }
}

// 4. FONCTION D'AFFICHAGE
function affichage(data) {
    loader.innerHTML = ''; 

    data.forEach((crypto, index) => {
        
        const isPositive = crypto.price_change_percentage_24h > 0;
        
        const couleur = isPositive ? "positive" : "negative";
        const fleche = isPositive ? '⬆️' : '⬇️';

        const ligne = document.createElement('div');
        ligne.className = "crypto-row"; 

        ligne.innerHTML = `
            <div class="col rank">${index + 1}</div>
            
            <div class="col coin-info">
                <img src="${crypto.image}" alt="${crypto.name}" style="width:25px; height:25px; margin-right:10px;">
                <span>${crypto.name}</span>
                <span class="symbol" style="color:#888; margin-left:5px;">${crypto.symbol.toUpperCase()}</span>
            </div>
            
            <div class="col price">
                ${formatter.format(crypto.current_price)}
            </div>
            
            <div class="col change ${couleur}">
                ${fleche} ${crypto.price_change_percentage_24h.toFixed(2)}%
            </div>
            
            <div class="col marketcap">
                ${formatter.format(crypto.market_cap)}
            </div>
        `;

        loader.appendChild(ligne);
    });
}

// Lancement
fetchCrypto();

setInterval(fetchCrypto, 60000);