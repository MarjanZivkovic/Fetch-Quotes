const quoteContainer = document.querySelector(".quote-container")
const spanQuote = document.querySelector(".quote")
const author = document.querySelector(".author")
const quoteBtn = document.querySelector(".generator")
const tweetBtn = document.querySelector(".twitter")
const facebookBtn = document.querySelector(".facebook")
const loader = document.querySelector(".loader")
let quoteApi = []

function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function loaded(){
    loader.hidden = true
    quoteContainer.hidden = false
}



function newQuote(){
    loading()
    const quote = quoteApi[ Math.floor(Math.random() *  quoteApi.length) ]
    if ( quote.author == null ){
        author.textContent = "Unknown"
    } else {
        author.textContent = quote.author
    }
    spanQuote.textContent = quote.text
    loaded()
}

async function getQuotes(){
    loading()
    const quoteUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(quoteUrl)
        quoteApi = await response.json()
        newQuote()
    } catch (error) {
        loaded()
        quoteContainer.innerHTML = "Whooops, no quotes!"
    }
}

function tweetQuote(){
    const tweetUlr = `https://twitter.com/intent/tweet?text="${spanQuote.textContent}" - ${author.textContent}`
    window.open(tweetUlr, "_blank")
}
function facebookQuote(){
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://quotes-react.netlify.app/&src=sdkpreparse&quote="${spanQuote.textContent}" - ${author.textContent}`
    window.open(facebookUrl, "_blank")
}

quoteBtn.addEventListener("click", newQuote)
tweetBtn.addEventListener("click", tweetQuote)
facebookBtn.addEventListener("click", facebookQuote)

getQuotes()