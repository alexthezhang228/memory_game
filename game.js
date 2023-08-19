var errors=0
var cardsList=[
  'double','darkness','fighting','fire','grass','lightning','psychic','water'
]

var cardSet;
var board=[];
var rows=4;
var cols=4;

window.onload=function(){
  shuffleCards()
  setGame()
}


function shuffleCards(){
  allCards=cardsList.concat(cardsList)
  // shuffle
  for (let i=0;i<allCards.length;i++){
    let j=Math.floor(Math.random()*allCards.length)
    let temp=allCards[i]
    allCards[i]=allCards[j]
    allCards[j]=temp
  }
}

function setGame(){
  for (let r=0;r<rows;r++){
    let row=[]
    for (let c=0;c<cols;c++){
      let cardImg=allCards.pop()
      row.push(cardImg)

      let card=document.createElement('img')
      card.id=r.toString()+'-'+c.toString()
      card.src='../pics/'+cardImg+'.jpg'
      card.classList.add('card')
      document.getElementById('board').append(card)
      card.addEventListener('click',selectCard)
    }
    board.push(row)
  }
  setTimeout(hideCards,2000)
  
}


function hideCards(){
  for (let i=0;i<rows;i++){
    for (let j=0;j<cols;j++){
      let card=document.getElementById(i.toString()+'-'+j.toString())
      card.src='../pics/back.jpg'
    }
  }

}

var selectedCard1;
var selectedCard2;
function selectCard(){
  console.log(this)
  if (this.src.includes('back')){
    if (!selectedCard1){
      selectedCard1=this
      let coords=selectedCard1.id.split('-')
      let r=parseInt(coords[0])
      let c=parseInt(coords[1])

      selectedCard1.src='../pics/'+board[r][c]+'.jpg'
    }else if(!selectedCard2 && this!=selectedCard1){
      selectedCard2=this
      let coords=selectedCard2.id.split('-')
      let r=parseInt(coords[0])
      let c=parseInt(coords[1])

      selectedCard2.src='../pics/'+board[r][c]+'.jpg'
      console.log(selectedCard2.src)
      setTimeout(update,1000)
    }
  }
}
function update(){
  if (selectedCard1.src!=selectedCard2.src){
    selectedCard1.src='../pics/back.jpg'
    selectedCard2.src='../pics/back.jpg'
    errors+=1
    document.getElementById('errors').innerText=errors
  }
  
  selectedCard1=null
  selectedCard2=null
  
}