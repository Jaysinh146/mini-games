class GameProgress {
    constructor() {
        this.storageKey = 'miniGamesProgress';
        this.progress = this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            completedGames: [],
            totalGames: 8
        };
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        this.updateUI();
    }

    markGameComplete(gameId) {
        if (!this.progress.completedGames.includes(gameId)) {
            this.progress.completedGames.push(gameId);
            this.saveProgress();
        }
    }

    isGameCompleted(gameId) {
        return this.progress.completedGames.includes(gameId);
    }

    updateUI() {
        const completed = this.progress.completedGames.length;
        const total = this.progress.totalGames;
        
        // Update progress counter
        document.getElementById('gamesCompleted').textContent = completed;
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${(completed / total) * 100}%`;

        // Update game cards
        this.progress.completedGames.forEach(gameId => {
            const card = document.querySelector(`.game-card[data-game="${gameId}"]`);
            if (card) card.classList.add('completed');
        });

        // Check if all games are completed
        if (completed === total) {
            this.showCertificatePrompt();
        }
    }

    showCertificatePrompt() {
        // Update to redirect to certificate page
        if (this.progress.completedGames.length === this.progress.totalGames) {
            window.location.href = 'certificate.html';
        }
    }
}

// Initialize progress tracking
const gameProgress = new GameProgress();
document.addEventListener('DOMContentLoaded', () => gameProgress.updateUI()); 