let Transaction = require('./TransactionImpl.js');

// 我们自己定义的事务
var MyTransaction = function () {
    this.reinitializeTransaction();
};

Object.assign(MyTransaction.prototype, Transaction, {
    getTransactionWrappers: function () {
        return [
            {
                initialize: function () {
                    console.log(this);//this->MyTransaction
                    console.log('initialize 1:' + JSON.stringify(arguments));//{}
                    return "[initialize 1]";
                },
                close: function () {
                    console.log('close 1:' + JSON.stringify(arguments));//{"0":"[initialize 1]"}
                    return "[close 1]";
                }
            },
            {
                initialize: function () {
                    console.log('initialize 2:' + JSON.stringify(arguments));//{}
                    return "[initialize 2]";
                },
                close: function () {
                    /*
                     this.transactionWrappers ->
                     [
                     { initialize: [Function: initialize],
                     close: [Function: close] },
                     { initialize: [Function: initialize],
                     close: [Function: close] }
                     ];
                     */
                    //this.wrapperInitData -> ["[initialize 1]","[initialize 2]"]
                    // console.log(this);
                    console.log('close 2:' + JSON.stringify(arguments));//{"0":"[initialize 2]"}
                    return "[close 2]";
                }
            }
        ];
    }
});

var transaction = new MyTransaction();

var testMethod = function () {
    console.log(this);// {a: 1}
    console.log('test:' + JSON.stringify(arguments));//{"0":2}
}
//perform(method, scope, a, b, c, d, e, f)
transaction.perform(testMethod, {a: 1}, 2);

// 打印的结果如下：
// initialize 1:{}
// initialize 2:{}
// test
// close 1:{"0":"[initialize 1]"}
// close 2:{"0":"[initialize 2]"}