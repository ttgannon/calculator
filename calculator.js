const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Mean
app.get('/mean', (req, res, next) => {
    try {
        const numsString = req.query.nums;
        if (!numsString) throw new ExpressError("You didn't put in any numbers", 400);
        const nums = numsString.split(',').map(num => {
            coercedNum = parseInt(num, 10);
            if (isNaN(coercedNum)) throw new ExpressError (`${num} is not a number`, 400)
            return coercedNum;
        });
        
        let total = 0;
        let counter = 0;
        
        for (let num of nums) {
            if (typeof num === 'number') {
                total += num;
                counter += 1;
            }
        }

        if (counter === 0) {
            return 0;
        }

        let mean = total/counter;

        const responseJSON = {
            response: {
                operation: "mean",
                value: mean
            }
        } 
        return res.json(responseJSON);
    } catch(err) {
        return next(err);
    }

})

//Median
app.get('/median', (req, res, next) => {
    try{
        const numsString = req.query.nums;
        if (!numsString) throw new ExpressError("You didn't put in any numbers", 400);
        const nums = numsString.split(',').map(num => {
            coercedNum = parseInt(num, 10);
            if (isNaN(coercedNum)) throw new ExpressError (`${num} is not a number`, 400)
            return coercedNum;
        });
        let median = 0;

        if (nums.length % 2) {
            median = nums[Math.floor(nums.length/2)]
        } else {
            let middleRight = nums[nums.length/2];
            let middleLeft = nums[(nums.length/2)-1];
            median = (middleRight + middleLeft) / 2;
        }
        
        const responseJSON = {
            response: {
                operation: "median",
                value: median
            }
        }
        return res.json(responseJSON);
    } catch (err) {
        next(err);
    }
    
})

//Mode
app.get('/mode', (req, res, next) => {
    try {
        const numsString = req.query.nums;
        if (!numsString) throw new ExpressError("You didn't put in any numbers", 400);
        const nums = numsString.split(',').map(num => {
            coercedNum = parseInt(num, 10);
            if (isNaN(coercedNum)) throw new ExpressError (`${num} is not a number`, 400)
            return coercedNum;
        });
        let countingDict = {};
        let maxFrequency = 0;
        let mode = [];

        for (let num of nums) {
            countingDict[num] = (countingDict[num] || 0) + 1;
            if (countingDict[num] > maxFrequency) {
                maxFrequency = countingDict[num];
                mode = [num];
            } else if (countingDict[num] === maxFrequency && mode.indexOf(num) === -1) {
                mode.push(num);
            }
        }

        if (mode.length === 0) {
            throw new ExpressError("There are no numbers entered", 404);
        }

        const responseJSON = {
            response: {
                operation: "mode",
                value: mode
            }
        }
        return res.json(responseJSON);
    } catch (err) {
        next(err);
    }
    
})

class ExpressError extends Error {
    constructor(msg, status){
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack)  
    }
}


app.use((error, req, res, next) => {
    let msg = error.msg;
    let status = error.status;
    return res.status(status).json({error: {msg, status}});
})

// Run the server
app.listen(3000, function() {
    console.log("Server started on port 3000");
})

module.exports = app;