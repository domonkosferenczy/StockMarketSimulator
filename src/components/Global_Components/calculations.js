export const formatDate = date =>{
    let parts = date.split("-");
    return (
        formatDoubleNumbers(parts[0]) + 
        ". " + 
        formatDoubleNumbers(parts[1]) + 
        ". " + 
        formatDoubleNumbers(parts[2]) + 
        "."
    )
}

export const formatDoubleNumbers = number => {
    number = parseInt(number)
    if (number > 9){
        return number
    }
    return "0" + number
}

export const formatMoney = money => {

    const match = part => {
        let Integer = part.split("").reverse().join("");
        Integer = Integer.match(/.{1,3}/g);
        Integer = Integer.map((nr) => {
            return nr.split("").reverse().join("")
        })
        return Integer.reverse().join(" ")
    }

    money = parseFloat(money)
    let negative = false;
    if (money < 0){
        money = money * -1
        negative = true
    }
    
    money = money.toString();
    let IntegerParts;
    if(money.includes(".")){
        money = money.split(".");
        IntegerParts = match(money[0])
        return ((negative)?"-":"") + IntegerParts + "." + money[1].substring(0, 2)
    } else {
        IntegerParts = match(money);
        return ((negative)?"-":"") + IntegerParts + ""
    }
    
}

// Not used functions
/*export const DateNextDay = currentDate => {
    let day = new Date(currentDate);
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay.getFullYear() + "-" + formatDoubleNumbers(nextDay.getMonth() + 1) + "-" + formatDoubleNumbers(nextDay.getDate())
}

export const DatePrevDay = currentDate => {
    let day = new Date(currentDate);
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() - 1);
    return nextDay.getFullYear() + "-" + formatDoubleNumbers(nextDay.getMonth() + 1) + "-" + formatDoubleNumbers(nextDay.getDate())
}*/