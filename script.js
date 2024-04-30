// Oyun durumunu gösteren metni seç
const statusDisplay = document.querySelector('.game--status');

// Klavye tuşlarına basılmasını dinleyen fonksiyon
document.addEventListener('keydown', function(event) {
    const key = event.keyCode;
    
    // Eğer R tuşuna basıldıysa, oyunu yeniden başlat
    if (key === 82) { // R tuşunun tuş kodu
        handleRestartGame();
    }
    
    // Eğer W tuşuna basıldıysa, emoji'leri 1. oyuncuya dönüştür
    if (key === 87) { // W tuşunun tuş kodu
        currentPlayer = "😀"; // 1. oyuncuya dönüşüm
        statusDisplay.innerHTML = currentPlayerTurn();
    }
    
    // Eğer A tuşuna basıldıysa, emoji'leri 2. oyuncuya dönüştür
    if (key === 65) { // A tuşunun tuş kodu
        currentPlayer = "😎"; // 2. oyuncuya dönüşüm
        statusDisplay.innerHTML = currentPlayerTurn();
    }
});






// Oyunun aktif olup olmadığını kontrol eden değişken
let gameActive = true;

// Oyun sırasını tutan değişken, başlangıçta "😀" olarak ayarlanmış
let currentPlayer = "😀";

// Oyun durumunu temsil eden bir dizi, her hücre için bir öğe
let gameState = ["", "", "", "", "", "", "", "", ""];

// Sıradaki oyuncuyu belirten metni güncelleyen fonksiyon
const currentPlayerTurn = () => `Sıra ${currentPlayer === "😀" ? "😀" : "😎"}'de`;

// Başlangıçta sıranın kimde olduğunu gösteren metni güncelle
statusDisplay.innerHTML = currentPlayerTurn();

// Her hücreye tıklama olayını dinleyen ve handleCellClick fonksiyonunu çağıran bir döngü
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// Oyunu yeniden başlatan düğmeye tıklama olayını dinleyen fonksiyon
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// Her hücreye tıklama işlemini yöneten fonksiyon
function handleCellClick(clickedCellEvent) {   
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Tıklanan hücreye işareti koyan fonksiyon
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Kazanma koşullarını temsil eden bir dizi
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Oyun sonucunu kontrol eden fonksiyon
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = `Oyuncu ${currentPlayer} kazandı!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = `Oyun berabere sonuçlandı!`;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Sıradaki oyuncuyu değiştiren fonksiyon
function handlePlayerChange() {
    currentPlayer = currentPlayer === "😀" ? "😎" : "😀";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Oyunu yeniden başlatan fonksiyon
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "😀";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
