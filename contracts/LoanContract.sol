// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * LoanContract allows users to request and fund micro-loans on-chain.
 */
contract LoanContract {
    address public owner;

    struct Loan {
        address borrower;
        uint amount;
        bool isFunded;
    }

    Loan[] public loans;

    constructor() {
        owner = msg.sender;
    }

    // Borrower requests a loan
    function requestLoan(uint _amount) public {
        loans.push(Loan(msg.sender, _amount, false));
    }

    // Funder funds the first unfunded loan
    function fundLoan(uint loanIndex) public payable {
        Loan storage loan = loans[loanIndex];
        require(!loan.isFunded, "Loan already funded");
        require(msg.value == loan.amount, "Incorrect amount");

        loan.isFunded = true;
        payable(loan.borrower).transfer(msg.value);
    }

    function getLoansCount() public view returns (uint) {
        return loans.length;
    }
}
