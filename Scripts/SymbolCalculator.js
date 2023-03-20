const reqGrowthValues = [12, 15, 20, 27, 36, 47, 60, 75, 92, 111, 132, 155, 180, 207, 236, 267, 300, 335, 372];
const cumulativeGrowthValue = [0, 12, 27, 47, 74, 110, 157, 217, 292, 384, 495, 627, 782, 962, 1169, 1405, 1672, 1972, 2307, 2679];
const levelUpThreshold = [12, 27, 47, 74, 110, 157, 217, 292, 384, 495, 627, 782, 962, 1169, 1405, 1672, 1972, 2307, 2679];

class Symbol {
    constructor(type, level, in_holds) {
        this.type = type;
        this.level = level;
        this.in_holds = in_holds;
    }

    getTotalInHolds() {
        return (cumulativeGrowthValue[this.level - 1] + this.in_holds);
    }

    getTotalReqSymbol() {
        return (2679 - this.getTotalInHolds());
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

    if((type === "0") || (level === 0) || isNaN(in_hold) || (in_hold < 0) || ((in_hold - cumulativeGrowthValue[level - 1] > 2679)) || (level === 20 && in_hold !== 0)) {
        alert("값이 제대로 입력되지 않았습니다. (Value not selected correctly.)")
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