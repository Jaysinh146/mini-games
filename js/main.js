document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all play buttons
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const gameId = card.dataset.game;
        
        playButton.addEventListener('click', () => {
            // Navigate to the corresponding game page
            window.location.href = `games/game${gameId}.html`;
        });
    });
}); 