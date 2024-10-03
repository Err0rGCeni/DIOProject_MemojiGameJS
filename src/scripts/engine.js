const emojis = ["😍", "😍", "🤬", "🤬", "🤡", "🤡", "😇", "😇", "👽", "👽", "👿", "👿", "🤖", "🤖", "💩", "💩"]
let openCards = []
let isChecking = false;
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1)

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch")
        openCards[1].classList.add("boxMatch")
    } else {
        openCards[0].classList.remove("isOpen")
        openCards[0].addEventListener("click", handleClick)
        openCards[1].classList.remove("isOpen")
        openCards[1].addEventListener("click", handleClick)
    }

    openCards = []

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("WIN!")
    }
}

function handleClick() {
    // Bloqueia cliques durante a verificação de match
    if (isChecking) return;
    // Bloqueia mais de 2 cartas sendo abertas
    if (openCards.length >= 2) return;

    // Impede cliques repetidos na mesma carta
    this.removeEventListener("click", handleClick);
    this.classList.add("isOpen");
    
    openCards.push(this);

    if (openCards.length === 2) {
        // Bloqueia cliques adicionais
        isChecking = true;
        setTimeout(() => {
            checkMatch();
            // Libera para novos cliques após verificação
            isChecking = false;
        }, 500);
    }
}

for (let i = 0; i < emojis.length; i++) {
    setTimeout(() => {
        let box = document.createElement("div")
        box.classList.add("card", "isOpen")
        box.innerHTML = shuffleEmojis[i]
        box.addEventListener("click", handleClick)        
        document.querySelector(".game").appendChild(box)
        
        setTimeout(() => {
            box.classList.remove("isOpen")
        }, 2000)

    }, 100 * i);
}
