const reqGrowthValues = [12, 15, 20, 27, 36, 47, 60, 75, 92, 111, 132, 155, 180, 207, 236, 267, 300, 335, 372, 0];
const levelUpThreshold = [12, 27, 47, 74, 110, 157, 217, 292, 384, 495, 627, 782, 962, 1169, 1405, 1672, 1972, 2307, 2679];

class Symbol {
    constructor(type, level, in_holds) {
        this.type = type;
        this.level = level;
        this.in_holds = in_holds;
    }

    getTotalReqSymbol() {
        var total = 0;
        for(var i = this.level; i <= 20; i++) {
            console.log("total = " + total + ", i = " + i + ", reqGrowthValues[i - 1] = " + reqGrowthValues[i - 1]);
            total += reqGrowthValues[i - 1];
        }
        total -= this.in_holds;
        return total;
    }

    getTotalReqMeso() {
        var totalReqMeso = 0;
        for(var i = this.level; i < 20; i++) {
            totalReqMeso += this.getReqMeso(i);
        }
        return totalReqMeso;
    }

    getReqMeso(level) {
        if(this.type === "vj") {
            return (3110000 + (level * 3960000));
        } else if (this.type === "cc") {
            return (6220000 + (level * 4620000));
        } else if (this.type === "la") {
            return (9330000 + (level * 5280000));
        } else if (this.type === "ar") {
            return (11196000 + (level * 5940000));
        } else if (this.type === "mo") {
            return (11196000 + (level * 5940000));
        } else if (this.type === "es") {
            return (11196000 + (level * 5940000));
        } else {
            return -1;
        }
    }

    getReqPeriod() {
        var reqSymbol = this.getTotalReqSymbol();
        if(this.type === "vj") {
            return (reqSymbol / 171);
        } else if (this.type === "cc") {
            return (reqSymbol / 157);
        } else if (this.type === "la") {
            return (reqSymbol / 122);
        } else if (this.type === "ar") {
            return (reqSymbol / 108);
        } else if (this.type === "mo") {
            return (reqSymbol / 101);
        } else if (this.type === "es") {
            return (reqSymbol / 101);
        } else {
            return -1;
        }
    }
}


function doCalculate() {

    var getType = document.getElementById("type");
    var type = getType.options[getType.selectedIndex].value;

    var getLevel = document.getElementById("level");
    var level = Number(getLevel.options[getLevel.selectedIndex].value);

    var getNum = document.getElementById("num");
    var in_hold = Number(getNum.value);

    var reqSymbolID = document.getElementById("reqSymbol");
    var reqMesoID = document.getElementById("reqMeso");
    var reqPeriodID = document.getElementById("reqPeriod");

    console.log("type = " + type + ", level = " + level + ", inHold = " + in_hold);

    reqSymbolID.innerHTML = "-";
    reqMesoID.innerHTML = "-";
    reqPeriodID.innerHTML = "-";

    var ValidValue = isValidValue(type, level, in_hold);

    if(ValidValue[6] !== 1) {

        var alertString = "";
        if(ValidValue[0] === 1) {
            alertString += "심볼 종류가 선택되지 않았습니다\n(No symbol type selected)\n\n";
        }
        if (ValidValue[1] === 1) {
            alertString += "심볼 레벨이 선택되지 않았습니다\n(No symbol type selected)\n\n";
        }
        if (ValidValue[2] === 1) {
            alertString += "입력한 개수가 올바르지 않습니다\n(The number entered is not valid)\n\n";
        }
        if (ValidValue[3] === 1) {
            alertString += "보유 중인 개수는 음수가 될 수 없습니다.\n(The number you hold cannot be negative)\n\n";
        }
        if (ValidValue[4] === 1) {
            alertString += "최대 보유량을 초과했습니다.\n(Maximum retention exceeded.)\n\n";
        }
        if (ValidValue[5] === 1) {
            alertString += "심볼이 완성됐고, 더 이상 보유할 수 없습니다\n(The symbol is complete, and can no longer be retained.)";
        }
        alert(alertString);
    } else {
        symbol = new Symbol(type, level, in_hold);
        console.log("reqSymbol : " + symbol.getTotalReqSymbol());
        console.log("reqMeso : " + symbol.getTotalReqMeso());
        console.log("reqPeriod : " + symbol.getReqPeriod());
        
        var reqSymbol = symbol.getTotalReqSymbol();
        var reqMeso = symbol.getTotalReqMeso();
        var formattedReqMeso = reqMeso.toLocaleString();
        var reqPeriod = Math.ceil(symbol.getReqPeriod());

        reqSymbolID.innerHTML = reqSymbol + "개";
        reqMesoID.innerHTML = formattedReqMeso + "메소";
        reqPeriodID.innerHTML = reqPeriod + "주" + "(" + (reqPeriod * 7) + "일)";
    }

}


function isValidValue(type, level, in_hold) {

    var isValidValue = [0, 0, 0, 0, 0, 0, 0];

    var totalInHold = 0;
    for(var i = 0; i < level - 1; i++) {
        totalInHold += reqGrowthValues[i];
    }

    if(type === "0") {
        isValidValue[0] += 1;
    }
    if(level === 0) {
        isValidValue[1] += 1;
    }
    if(isNaN(in_hold)) {
        isValidValue[2] += 1;
    } 
    if(in_hold < 0) {
        isValidValue[3] += 1;
    }
    if(in_hold + totalInHold > 2679) {
        isValidValue[4] += 1;
    }
    if((level === 20 && in_hold !== 0)) {
        isValidValue[5] += 1;
    }
    if(isAllZero(isValidValue)) {
        isValidValue[6] += 1;
    }

    return isValidValue;
}

function isAllZero(arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] != 0) {
            return false;
        }
    }
    return true;
}