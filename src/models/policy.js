class Policy {
    
    constructor(data) {

        this.id = data.id;
        this.amountInsured = data.amountInsured;
        this.email = data.email;
        this.inceptionDate = data.inceptionDate;
        this.installmentPayment = data.installmentPayment;
        this.client = data.client;

    }

}

module.exports = Policy;