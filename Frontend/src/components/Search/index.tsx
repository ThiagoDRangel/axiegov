import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Search() {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [isValidAddress, setIsValidAddress] = useState<boolean>(true);
    interface Transaction {
        from: string;
        to: string;
        tokenAddress: string;
        transactionHash: string;
        value: number;
        block: number;
    }
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [transactionsPerPage] = useState<number>(10);

    // Regex para endereço Ethereum válido
    const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(event.target.value);
        setIsValidAddress(true);
    };

    const handleButtonClick = async () => {
        if (!walletAddressRegex.test(walletAddress)) {
            setIsValidAddress(false);
            setTransactions([]);
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:5000/api/search?address=${walletAddress}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactions([]);
        }
    };

    // Paginação das transações
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // Mudança de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container-search">
                <h4>explore the ronin multiverse...</h4>
                <input
                    className="search"
                    placeholder="insert your wallet here..."
                    type="text"
                    value={walletAddress}
                    onChange={handleInputChange}
                />
                <button
                    className="button"
                    onClick={handleButtonClick}
                >
                    start
                </button>
                {!isValidAddress && <p className="error">Invalid address</p>}
            </div>
            
            <div className="container-transactions">
                {currentTransactions.map((transaction: Transaction, index: number) => (
                    <div key={index} className="transaction">
                        <p>From: {transaction.from}</p>
                        <p>To: {transaction.to}</p>
                        <p>Token Address: {transaction.tokenAddress}</p>
                        <p>Transaction Hash: {transaction.transactionHash}</p>
                        <p>Value: {transaction.value}</p>
                        <p>Block: {transaction.block}</p>
                    </div>
                ))}
            
                {/* Paginação */}
                {transactions.length > transactionsPerPage && (
                    <ul className="pagination-ul">
                        {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, index) => (
                            <li key={index} className="pagination-li">
                                <button onClick={() => paginate(index + 1)} className="pagination-btn">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Search;
