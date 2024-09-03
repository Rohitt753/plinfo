const API_KEY = 'AIzaSyBUUDbfZdMgO0fRUnFVY3O_XXiXZHuO93U';
const SPREADSHEET_ID = '14taoRBGS9Sud3DHKdjN947U9nJVy2wYBRJuLO4PCEaw';
const RANGE = 'opponent-data!A1:G'; // Adjust range based on your sheet setup

async function findMatchDetails() {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    const rows = data.values;

    let matchDetails = 'No match found with this name';
    for (const row of rows) {
        if (row[0].toLowerCase() === playerName.toLowerCase()) { // Case-insensitive match
            matchDetails = `
                <h3>Match Details:</h3>
                <p><strong>Opponent's Player Name:</strong> ${row[1]}</p>
                <p><strong>In-Game Name:</strong> ${row[2]}</p>
                <p><strong>Discord ID:</strong> ${row[3]}</p>
                <p><strong>Match Date:</strong> ${row[4]}</p>
                <p><strong>Match Time:</strong> ${row[5]}</p>
                <p><strong>Mode:</strong> ${row[6]}</p>
            `;
            break;
        }
    }
    document.getElementById('result').innerHTML = matchDetails;
}
