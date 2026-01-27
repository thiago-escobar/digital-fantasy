document.addEventListener('DOMContentLoaded', async () => {
    // Check if the user is logged in by retrieving data from sessionStorage
    const name = sessionStorage.getItem('name');
    const role = sessionStorage.getItem('role');

    if (!name) {
        // User is not logged in, redirect to login page
        window.location.href = 'index.html';
        return;
    }

    // Display a welcome message in the main area
    const welcomeSpot = document.querySelector('#welcome-message');
    const welcomeMsg = document.createElement('h2');
    welcomeMsg.textContent = `Welcome, ${name} (${role})`;
    welcomeMsg.style.textAlign = 'center';
    welcomeSpot.appendChild(welcomeMsg);

    // Load character data from JSON
    try {
        const response = await fetch('data/table.json');
        const characters = await response.json();
        const lateralMenu = document.getElementById('lateral-menu');

        // Clear static content
        lateralMenu.innerHTML = '';

        characters.forEach(character => {
            const article = document.createElement('article');
            article.className = 'other-characters-menu';
            if (character.type === 'villain') {
                article.classList.add('villain');
            }else{
                if(character.player === 'NPC')
                    article.classList.add('npc');
            }
            const nameP = document.createElement('p');
            nameP.className = 'character-name';
            nameP.textContent = character.name;
            article.appendChild(nameP);

            const playerP = document.createElement('p');
            playerP.className = 'player-name';
            playerP.textContent = character.player === 'NPC' ? 'NPC' : `Player: ${character.player}`;
            article.appendChild(playerP);

            const initiativeDiv = document.createElement('div');
            initiativeDiv.className = 'initiative';
            initiativeDiv.textContent = character.initiative;
            article.appendChild(initiativeDiv);

            const statsContainer = document.createElement('div');
            statsContainer.className = 'stats-container';
            if(character.type !== 'event'){
                ['life', 'energy'].forEach(statType => {
                    const statData = character.stats[statType];
                    const row = document.createElement('div');
                    row.className = 'stat-row';

                    if (statData.current !== undefined && statData.max !== undefined) {
                        const text = document.createElement('span');
                        text.className = 'stat-text';
                        text.textContent = `${statData.current}/${statData.max}`;
                        row.appendChild(text);
                    }

                    const bar = document.createElement('div');
                    bar.className = 'stat-bar';
                    const value = document.createElement('div');
                    value.className = `stat-value ${statType}`;
                    value.style.width = `${statData.percentage}%`;
                    bar.appendChild(value);
                    row.appendChild(bar);
                    statsContainer.appendChild(row);
                });

                article.appendChild(statsContainer);
            }
            lateralMenu.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading table data:', error);
    }
});