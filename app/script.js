document.addEventListener('DOMContentLoaded', () => {
    // Function to simulate updating stock prices
    function updateStockPrices() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const watchlistItems = document.querySelectorAll('.watchlist-item');

        portfolioItems.forEach(item => {
            const priceElement = item.querySelector('.price');
            const changeElement = item.querySelector('.change');
            const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
            const changeAmount = (Math.random() - 0.5) * 5; // Simulate change up to $5
            const newPrice = currentPrice + changeAmount;
            const percentageChange = (changeAmount / currentPrice) * 100;

            priceElement.textContent = `$${newPrice.toFixed(2)}`;
            changeElement.textContent = `${changeAmount.toFixed(2)} (${percentageChange.toFixed(2)}%)`;

            changeElement.classList.remove('positive', 'negative');
            if (changeAmount > 0) {
                changeElement.classList.add('positive');
            } else if (changeAmount < 0) {
                changeElement.classList.add('negative');
            }
        });

        watchlistItems.forEach(item => {
            const priceElement = item.querySelector('.price');
            const changeElement = item.querySelector('.change');
            const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
            const changeAmount = (Math.random() - 0.5) * 10; // Simulate larger change for watchlist
            const newPrice = currentPrice + changeAmount;
            const percentageChange = (changeAmount / currentPrice) * 100;

            priceElement.textContent = `$${newPrice.toFixed(2)}`;
            changeElement.textContent = `${changeAmount.toFixed(2)} (${percentageChange.toFixed(2)}%)`;

            changeElement.classList.remove('positive', 'negative');
            if (changeAmount > 0) {
                changeElement.classList.add('positive');
            } else if (changeAmount < 0) {
                changeElement.classList.add('negative');
            }
        });
    }

    // Simulate updating prices every 3 seconds
    setInterval(updateStockPrices, 3000);

    // Basic "Add to Watchlist" functionality (for demonstration)
    const portfolioStocks = document.querySelectorAll('.portfolio-item .symbol');
    const watchlistSection = document.querySelector('.watchlist');

    portfolioStocks.forEach(symbolElement => {
        symbolElement.style.cursor = 'pointer'; // Indicate it's clickable
        symbolElement.addEventListener('click', function() {
            const symbol = this.textContent;
            const nameElement = this.nextElementSibling;
            const name = nameElement ? nameElement.textContent : '';
            const currentPriceElement = this.closest('.portfolio-item').querySelector('.price');
            const currentPrice = currentPriceElement ? currentPriceElement.textContent : '$0.00';
            const currentChangeElement = this.closest('.portfolio-item').querySelector('.change');
            const currentChange = currentChangeElement ? currentChangeElement.textContent : '+0.00 (0.00%)';

            // Check if the stock is already in the watchlist
            const existingWatchlistItem = watchlistSection.querySelector(`.watchlist-item .symbol[data-symbol="${symbol}"]`).closest('.watchlist-item');
            if (existingWatchlistItem) {
                alert(`${symbol} is already in your watchlist.`);
                return;
            }

            const newWatchlistItem = document.createElement('div');
            newWatchlistItem.classList.add('watchlist-item');
            newWatchlistItem.innerHTML = `
                <span class="symbol" data-symbol="${symbol}">${symbol}</span>
                <span class="price">${currentPrice}</span>
                <span class="change">${currentChange}</span>
            `;
            watchlistSection.appendChild(newWatchlistItem);
            alert(`${symbol} added to watchlist.`);
        });
    });
});