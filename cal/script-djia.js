// DJIA company data with founding years and approximate market values (as of Mar 03, 2025)
const companies = [
    { name: "3M Company", stock: "MMM", exchange: "NYSE", founded: 1902, marketValue: 55000 }, // ~$55B
    { name: "American Express", stock: "AXP", exchange: "NYSE", founded: 1850, marketValue: 160000 }, // ~$160B
    { name: "Amgen", stock: "AMGN", exchange: "NASDAQ", founded: 1980, marketValue: 150000 }, // ~$150B
    { name: "Apple Inc.", stock: "AAPL", exchange: "NASDAQ", founded: 1976, marketValue: 3400000 }, // ~$3.4T
    { name: "Boeing", stock: "BA", exchange: "NYSE", founded: 1916, marketValue: 120000 }, // ~$120B
    { name: "Caterpillar", stock: "CAT", exchange: "NYSE", founded: 1925, marketValue: 150000 }, // ~$150B
    { name: "Chevron", stock: "CVX", exchange: "NYSE", founded: 1879, marketValue: 310000 }, // ~$310B
    { name: "Cisco Systems", stock: "CSCO", exchange: "NASDAQ", founded: 1984, marketValue: 220000 }, // ~$220B
    { name: "Coca-Cola", stock: "KO", exchange: "NYSE", founded: 1892, marketValue: 290000 }, // ~$290B
    { name: "Dow Inc.", stock: "DOW", exchange: "NYSE", founded: 2019, marketValue: 40000 }, // ~$40B
    { name: "Goldman Sachs", stock: "GS", exchange: "NYSE", founded: 1869, marketValue: 150000 }, // ~$150B
    { name: "Home Depot", stock: "HD", exchange: "NYSE", founded: 1978, marketValue: 410000 }, // ~$410B
    { name: "Honeywell International", stock: "HON", exchange: "NASDAQ", founded: 1906, marketValue: 140000 }, // ~$140B
    { name: "IBM", stock: "IBM", exchange: "NYSE", founded: 1911, marketValue: 190000 }, // ~$190B
    { name: "Intel", stock: "INTC", exchange: "NASDAQ", founded: 1968, marketValue: 100000 }, // ~$100B
    { name: "Johnson & Johnson", stock: "JNJ", exchange: "NYSE", founded: 1886, marketValue: 390000 }, // ~$390B
    { name: "JPMorgan Chase", stock: "JPM", exchange: "NYSE", founded: 1799, marketValue: 610000 }, // ~$610B
    { name: "McDonald's", stock: "MCD", exchange: "NYSE", founded: 1940, marketValue: 220000 }, // ~$220B
    { name: "Merck & Co.", stock: "MRK", exchange: "NYSE", founded: 1891, marketValue: 260000 }, // ~$260B
    { name: "Microsoft", stock: "MSFT", exchange: "NASDAQ", founded: 1975, marketValue: 3150000 }, // ~$3.15T
    { name: "Nike", stock: "NKE", exchange: "NYSE", founded: 1964, marketValue: 120000 }, // ~$120B
    { name: "Procter & Gamble", stock: "PG", exchange: "NYSE", founded: 1837, marketValue: 410000 }, // ~$410B
    { name: "Salesforce", stock: "CRM", exchange: "NYSE", founded: 1999, marketValue: 290000 }, // ~$290B
    { name: "Travelers Companies", stock: "TRV", exchange: "NYSE", founded: 1853, marketValue: 55000 }, // ~$55B
    { name: "UnitedHealth Group", stock: "UNH", exchange: "NYSE", founded: 1977, marketValue: 565000 }, // ~$565B
    { name: "Verizon Communications", stock: "VZ", exchange: "NYSE", founded: 1983, marketValue: 180000 }, // ~$180B
    { name: "Visa", stock: "V", exchange: "NYSE", founded: 1958, marketValue: 565000 }, // ~$565B
    { name: "Walmart", stock: "WMT", exchange: "NYSE", founded: 1962, marketValue: 610000 }, // ~$610B
    { name: "Walt Disney", stock: "DIS", exchange: "NYSE", founded: 1923, marketValue: 190000 } // ~$190B
];

// DOM elements
const companySelect = document.getElementById('company-select');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');
const tableBody = document.getElementById('table-body');
const headers = document.querySelectorAll('th');
const searchBox = document.getElementById('search-box');

// Current year from Date.now()
const now = new Date();
const currentYear = now.getFullYear();

// Populate dropdown
companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company.founded;
    option.textContent = `${company.name} (${company.stock} - ${company.exchange})`;
    companySelect.appendChild(option);
});

// Function to calculate age
function calculateAge(foundedYear) {
    return currentYear - foundedYear;
}

// Function to format market value
function formatMarketValue(value) {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}T`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}B`;
    return `$${value}M`;
}

// Function to populate table
function populateTable(data) {
    tableBody.innerHTML = '';
    data.forEach(company => {
        const age = calculateAge(company.founded);
        const marketValue = formatMarketValue(company.marketValue);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${company.name}</td>
            <td><a href="https://www.google.com/search?q=${company.stock}+stock" target="_blank">${company.stock} (${company.exchange})</a></td>
            <td>${company.founded}</td>
            <td>${age}</td>
            <td>${marketValue}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Initial table population
populateTable(companies);

// Calculate age on button click with market value
calculateBtn.addEventListener('click', () => {
    const foundedYear = parseInt(companySelect.value);
    if (!foundedYear) {
        resultDiv.textContent = 'Please select a company!';
        return;
    }
    const selectedIndex = companySelect.selectedIndex;
    const company = companies[selectedIndex - 1]; // -1 to account for "Select a Company" option
    const age = calculateAge(foundedYear);
    const marketValue = formatMarketValue(company.marketValue);
    const companyName = companySelect.options[selectedIndex].text;
    resultDiv.textContent = `${companyName} is ${age} years old as of ${currentYear} with an approximate market value of ${marketValue} (As of Mar 2025).`;
});

// Sorting functionality
let sortDirection = {};
headers.forEach(header => {
    header.addEventListener('click', () => {
        const sortKey = header.getAttribute('data-sort');
        sortDirection[sortKey] = !sortDirection[sortKey] || sortDirection[sortKey] === 'desc' ? 'asc' : 'desc';
        
        const sortedCompanies = [...companies].sort((a, b) => {
            let valueA, valueB;
            switch (sortKey) {
                case 'name':
                    valueA = a.name;
                    valueB = b.name;
                    break;
                case 'stock':
                    valueA = a.stock;
                    valueB = b.stock;
                    break;
                case 'founded':
                    valueA = a.founded;
                    valueB = b.founded;
                    break;
                case 'age':
                    valueA = calculateAge(a.founded);
                    valueB = calculateAge(b.founded);
                    break;
                case 'marketValue':
                    valueA = a.marketValue;
                    valueB = b.marketValue;
                    break;
            }
            if (sortDirection[sortKey] === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
        
        populateTable(sortedCompanies.filter(company => 
            company.name.toLowerCase().includes(searchBox.value.toLowerCase()) ||
            company.stock.toLowerCase().includes(searchBox.value.toLowerCase())
        ));
    });
});

// Search functionality
searchBox.addEventListener('input', () => {
    const filteredCompanies = companies.filter(company => 
        company.name.toLowerCase().includes(searchBox.value.toLowerCase()) ||
        company.stock.toLowerCase().includes(searchBox.value.toLowerCase())
    );
    populateTable(filteredCompanies);
});
