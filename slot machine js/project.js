// deposit money
// select no of lines to bet at bet amount






const prompt = require("prompt-sync")()


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {


"A" :2,

"B" : 4,

"C" : 6,

"D" :  8 ,
}





const SYMBOL_VALUES ={





    "A" :5,

    "B" : 4,
    
    "C" : 3,
    
    "D" :  2,





}


    const deposit = () => {

    //using while true loop a it is infinite loop
        
        while (true) {
        const depositAmount =prompt("Enter deposit Amount:  ") ;
    const numberDepositAmount = parseFloat(depositAmount) ;


    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){

        console.log("Invalid deposit amount ,please try again")

    }else{
    return numberDepositAmount
    }
    }
    }


    const getNumberOfLines = () => {

  
        while (true) {
            const lines  =prompt("Enter the number of lines you want to bet on (1-3):  ") ;
        const numberOfLines  = parseFloat(lines) ;
    
    
        if(isNaN(numberOfLines) || numberOfLines <= 0  || numberOfLines > 3){
    
            console.log("Invalid number of lines  ,please try again")
    
        }else{
        return numberOfLines
        }
        }


        
    }




    const getBet = (balance,lines) => {


        while (true) {
            const bet  =prompt("Enter the amount you want to bet per line:  ") ;
        const numberBet   = parseFloat(bet) ;
    
    
        if(isNaN(numberBet) || numberBet <= 0  || numberBet > balance / lines){
    
            console.log("Invalid bet amount  ,please try again")
    
        }else{
        return numberBet
        }
        }

    }



    const spin = () => {

     const symbols = []
     for(  const [symbol,count] of Object.entries(SYMBOLS_COUNT)){


      for (let i=0; i<count; i++){

        
         symbols.push(symbol)
      }
    }
 const reels = []

for(let i=0; i<COLS; i++ ){
 reels.push([]);
reelSymbols =  [...symbols]

for(let j=0; j<ROWS; j++){
  
  const randomIndex = Math.floor(Math.random()*reelSymbols.length);
  const selectedSymbol = reelSymbols[randomIndex];

    reels[i].push(selectedSymbol)

    reelSymbols.splice(randomIndex,1);

}

     }
     return(reels)

    };
 const transpose = (reels) => {

const rows = []

for(i=0;i<COLS;i++){
rows.push([])
for(j=0;j<ROWS;j++){
   rows[i].push(reels[j][i])


}

}

return rows


 }



 const printRows = (rows) => {
 for(const row of rows) {

    let rowString = ""

   for(const [i,symbol] of row.entries()){


    rowString+= symbol

    if (i != row.length -1){
       rowString+= " | "
    }
   }

   console.log(rowString)
 }
 }



 const getWinnings =(rows,bet,lines) =>{


let winnings = 0



for(let row=0; row<lines; row++){
const symbols = rows[row];

let allSame = true;

for(const symbol of symbols){

if(symbol != symbols[0]){

   allSame = false

   break;
}
}

if (allSame==true ){

    winnings+= bet*SYMBOL_VALUES[symbols[0]]




}

}
 return winnings;


 };
   
    
const Game = () => {



let balance  = deposit();
while (true){
console.log("You have $," + balance)
const NumberOfLines = getNumberOfLines();

const  Bet = getBet(balance, NumberOfLines)

balance-= Bet*NumberOfLines

const reels = spin()

 const rows = transpose(reels)
printRows(rows)

const winnings = getWinnings(rows,Bet,NumberOfLines)
balance+= winnings
console.log("You Won , $" + winnings.toString());

if(balance<= 0){

console.log("You ran out of money!")
break;

}

const playAgain = prompt("Do you want to play again (y/n)")

if(playAgain!="y")break;

}
}

Game();