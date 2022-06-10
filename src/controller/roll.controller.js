var express = require('express');
// all symbols
const symbols = [{ symbolName: 'C', rewards: 10 }, { symbolName: "L", rewards: 20 }, { symbolName: 'O', rewards: 30 }, { symbolName: 'W', rewards: 40 }];
var session_total = 10;
var bank_total = 0;
var count = 0;
// spin request
exports.doSpin = async (req, res) => {
    try {
        session_total = req.params.credit - 1;
        count++;
        const s1 = symbols[Math.floor(Math.random() * 4)];
        const s2 = symbols[Math.floor(Math.random() * 4)];
        const s3 = symbols[Math.floor(Math.random() * 4)];
        // if session total is less then 40
        if (session_total < 40) {
            const result = await winRoll(s1, s2, s3)
            res.send(result);
        }
        // if session total is greater ther 40 and less then 60
        else if (session_total > 40 && session_total < 60) {
            const randomScore = Math.floor(Math.random() * 100);
            if (s1 == s2 && s2 == s3 && randomScore > 30) {
                const c1 = symbols[Math.floor(Math.random() * 4)];
                const c2 = symbols[Math.floor(Math.random() * 4)];
                const c3 = symbols[Math.floor(Math.random() * 4)];
                const result = await winRoll(c1, c2, c3)
                res.send(result);
            } else {
                const result = await winRoll(s1, s2, s3)
                res.send(result);
            }


        }
        // if session total is greater then 60
        else {
            const randomScore = Math.floor(Math.random() * 100);
            if (s1 == s2 && s2 == s3 && randomScore > 60) {
                const c1 = symbols[Math.floor(Math.random() * 4)];
                const c2 = symbols[Math.floor(Math.random() * 4)];
                const c3 = symbols[Math.floor(Math.random() * 4)];
                const result = await winRoll(c1, c2, c3)
                res.send(result);
            } else {
                const result = await winRoll(s1, s2, s3)
                res.send(result);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// check for winnig roll
function winRoll(item1, item2, item3) {
    if (item1 == item2 && item2 == item3) {
        session_total = session_total + item1.rewards;
        const status = `YOU WIN $${item1.rewards}`;
        return { slot1: item1, slot2: item2, slot3: item3, count: count, status: 200, message: status, session_total: session_total }

    } else {
        const status = `YOU LOSE!`;
        return { slot1: item1, slot2: item2, slot3: item3, count: count, status: 202, message: status, session_total: session_total }
    }

}
// cashout
exports.CashOut = (req, res) => {
    if (session_total > 10) {
        bank_total = bank_total + session_total;
        session_total = 10;
        count = 0;
        res.send({ bank_total: bank_total, session_total: session_total, message: "TRANSFER SUCESSFULLY!", status: 200, })
    } else {
        res.send({ message: `FAILLED! SESSION TOTAL ${session_total} > 10`, status: 202 })
    }
}
// reset all
exports.Reset = (req, res) => {
    bank_total = 0;
    session_total = 10;
    count = 0;
    res.send({ bank_total: bank_total, session_total: session_total, message: "RESET SUCESSFULLY!", status: 200, })
}