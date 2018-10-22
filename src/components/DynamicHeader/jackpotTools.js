import symbol1 from "../../assets/Header/jackpot-font/1.png";
import symbol2 from "../../assets/Header/jackpot-font/2.png";
import symbol3 from "../../assets/Header/jackpot-font/3.png";
import symbol4 from "../../assets/Header/jackpot-font/4.png";
import symbol5 from "../../assets/Header/jackpot-font/5.png";
import symbol6 from "../../assets/Header/jackpot-font/6.png";
import symbol7 from "../../assets/Header/jackpot-font/7.png";
import symbol8 from "../../assets/Header/jackpot-font/8.png";
import symbol9 from "../../assets/Header/jackpot-font/9.png";
import symbol0 from "../../assets/Header/jackpot-font/0.png";
import symbolM from "../../assets/Header/jackpot-font/M.png";
import symbolI from "../../assets/Header/jackpot-font/I.png";
import symbolL from "../../assets/Header/jackpot-font/L.png";
import symbolO from "../../assets/Header/jackpot-font/O.png";
import symbolN from "../../assets/Header/jackpot-font/N.png";
import symbolS from "../../assets/Header/jackpot-font/S.png";
import symbolE from "../../assets/Header/jackpot-font/E.png";
import symbolB from "../../assets/Header/jackpot-font/B - Lights On.png";
import symbolA from "../../assets/Header/jackpot-font/A - Lights On.png";
import symbolR from "../../assets/Header/jackpot-font/R.png";
import symbolD from "../../assets/Header/jackpot-font/D.png";
import symbolDot from "../../assets/Header/jackpot-font/Dot.png";
import symbolEuro from "../../assets/Header/jackpot-font/Euro.png";
import i18n from "../../tools/i18nextSetup";

const symbols = {
    1: symbol1,
    2: symbol2,
    3: symbol3,
    4: symbol4,
    5: symbol5,
    6: symbol6,
    7: symbol7,
    8: symbol8,
    9: symbol9,
    0: symbol0,
    m: symbolM,
    i: symbolI,
    l: symbolL,
    o: symbolO,
    n: symbolN,
    s: symbolS,
    e: symbolE,
    b: symbolB,
    a: symbolA,
    r: symbolR,
    d: symbolD,
    dot: symbolDot,
    euro: symbolEuro
}

const reverseString = string => string.split("").reverse().join("");

const roundDecimal = decimal => {
    if(Number(decimal.charAt(0)) < 5) {
        return Number(decimal.charAt(1)).toString();
    }

    else {
        return (Number(decimal.charAt(1)) + 1).toString();
    }
}

const roundMillions = (millions, decimal) => {
    let millionsNumber = Number(reverseString(millions));  
    
    if(Number(decimal) >= 5) {
        return reverseString((millionsNumber + 1).toString());
    }
    else {
        return millions;
    }
}

const roundBillions = (billions) => {
    let billionsNumber = Number(reverseString(billions));  

    billionsNumber = billionsNumber / 1000;
    billionsNumber = Math.round(billionsNumber * 100) / 100;

    return reverseString((billionsNumber).toString());
}

const mapStringToImages = (string, count = 'million') => {
    const stringSymbols = string.split("");

    const mappedSymbols = stringSymbols.map((symbol) => {
        let htmlString = "";
      
        if(symbol === ".") {
            symbol = "dot"
        }  

        return htmlString.concat(
            `<img class="header_jackpot_symbol ${symbol === "dot" ? "-dot" : "-number"}" 
            src="${symbols[symbol]}" alt="${symbol}"/>`);
    });
		
    mappedSymbols.push(
        `<img class="header_jackpot_symbol -currency" src="${symbols["euro"]}" alt="euro"/>`
    );
	
    const millionString = i18n.t(`headerDesktopText:${count}`);

    for (let x = 0; x < millionString.length; x++) {
        const letter = millionString.charAt(x);
        mappedSymbols.unshift(
            `<img class="header_jackpot_symbol -number ${x === 0 ? "-first-letter" : ""}" 
          src="${symbols[letter]}" alt="${letter}"/>`
        );
    }
  
    return mappedSymbols.reverse().join("");
};

module.exports = {
    reverseString,
    roundDecimal,
    roundMillions,
    mapStringToImages,
    roundBillions
}