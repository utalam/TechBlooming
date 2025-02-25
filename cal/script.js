// Company data with founding years and exchanges
const companies = [
    { name: "Apple Inc.", stock: "AAPL", exchange: "NASDAQ", founded: 1976 },
    { name: "NVIDIA Corporation", stock: "NVDA", exchange: "NASDAQ", founded: 1993 },
    { name: "Microsoft Corporation", stock: "MSFT", exchange: "NASDAQ", founded: 1975 },
    { name: "Amazon.com Inc.", stock: "AMZN", exchange: "NASDAQ", founded: 1994 },
    { name: "Alphabet Inc.", stock: "GOOGL", exchange: "NASDAQ", founded: 1998 },
    { name: "Meta Platforms Inc.", stock: "META", exchange: "NASDAQ", founded: 2004 },
    { name: "Tesla Inc.", stock: "TSLA", exchange: "NASDAQ", founded: 2003 },
    { name: "Broadcom Inc.", stock: "AVGO", exchange: "NASDAQ", founded: 1961 },
    { name: "Oracle Corporation", stock: "ORCL", exchange: "NYSE", founded: 1977 },
    { name: "Adobe Inc.", stock: "ADBE", exchange: "NASDAQ", founded: 1982 },
    { name: "Cisco Systems Inc.", stock: "CSCO", exchange: "NASDAQ", founded: 1984 },
    { name: "Salesforce Inc.", stock: "CRM", exchange: "NYSE", founded: 1999 },
    { name: "Intel Corporation", stock: "INTC", exchange: "NASDAQ", founded: 1968 },
    { name: "IBM", stock: "IBM", exchange: "NYSE", founded: 1911 },
    { name: "Advanced Micro Devices", stock: "AMD", exchange: "NASDAQ", founded: 1969 },
    { name: "Qualcomm Inc.", stock: "QCOM", exchange: "NASDAQ", founded: 1985 },
    { name: "Dell Technologies Inc.", stock: "DELL", exchange: "NYSE", founded: 1984 },
    { name: "HP Inc.", stock: "HPQ", exchange: "NYSE", founded: 1939 },
    { name: "Applied Materials Inc.", stock: "AMAT", exchange: "NASDAQ", founded: 1967 },
    { name: "Micron Technology Inc.", stock: "MU", exchange: "NASDAQ", founded: 1978 },
    { name: "Texas Instruments Inc.", stock: "TXN", exchange: "NASDAQ", founded: 1930 },
    { name: "Palantir Technologies", stock: "PLTR", exchange: "NYSE", founded: 2003 },
    { name: "Intuit Inc.", stock: "INTU", exchange: "NASDAQ", founded: 1983 },
    { name: "ServiceNow Inc.", stock: "NOW", exchange: "NYSE", founded: 2004 },
    { name: "Lam Research Corporation", stock: "LRCX", exchange: "NASDAQ", founded: 1980 },
    { name: "Snowflake Inc.", stock: "SNOW", exchange: "NYSE", founded: 2012 },
    { name: "Accenture plc", stock: "ACN", exchange: "NYSE", founded: 1989 },
    { name: "Autodesk Inc.", stock: "ADSK", exchange: "NASDAQ", founded: 1982 },
    { name: "Synopsys Inc.", stock: "SNPS", exchange: "NASDAQ", founded: 1986 },
    { name: "Cadence Design Systems", stock: "CDNS", exchange: "NASDAQ", founded: 1988 },
    { name: "Workday Inc.", stock: "WDAY", exchange: "NASDAQ", founded: 2005 },
    { name: "Fortinet Inc.", stock: "FTNT", exchange: "NASDAQ", founded: 2000 },
    { name: "Crowdstrike Holdings", stock: "CRWD", exchange: "NASDAQ", founded: 2011 },
    { name: "Datadog Inc.", stock: "DDOG", exchange: "NASDAQ", founded: 2010 },
    { name: "Unity Software Inc.", stock: "U", exchange: "NYSE", founded: 2004 },
    { name: "Zoom Video Communications", stock: "ZM", exchange: "NASDAQ", founded: 2011 },
    { name: "PayPal Holdings Inc.", stock: "PYPL", exchange: "NASDAQ", founded: 1998 },
    { name: "Juniper Networks Inc.", stock: "JNPR", exchange: "NYSE", founded: 1996 },
    { name: "Okta Inc.", stock: "OKTA", exchange: "NASDAQ", founded: 2009 },
    { name: "MongoDB Inc.", stock: "MDB", exchange: "NASDAQ", founded: 2007 },
    { name: "Splunk Inc.", stock: "SPLK", exchange: "NASDAQ", founded: 2003 },
    { name: "Twilio Inc.", stock: "TWLO", exchange: "NYSE", founded: 2008 },
    { name: "NetApp Inc.", stock: "NTAP", exchange: "NASDAQ", founded: 1992 },
    { name: "Zscaler Inc.", stock: "ZS", exchange: "NASDAQ", founded: 2007 },
    { name: "Red Hat (IBM)", stock: "IBM", exchange: "NYSE", founded: 1993 },
    { name: "Super Micro Computer", stock: "SMCI", exchange: "NASDAQ", founded: 1993 },
    { name: "Dropbox Inc.", stock: "DBX", exchange: "NASDAQ", founded: 2007 },
    { name: "DocuSign Inc.", stock: "DOCU", exchange: "NASDAQ", founded: 2003 },
    { name: "RingCentral Inc.", stock: "RNG", exchange: "NYSE", founded: 1999 },
    { name: "C3.ai Inc.", stock: "AI", exchange: "NYSE", founded: 2009 }
];

// DOM elements
const companySelect = document.getElementById('company-select');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');
const tableBody = document.getElementById('table-body');
const headers = document.querySelectorAll('th');

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

// Function to populate table
function populateTable(data) {
    tableBody.innerHTML = '';
    data.forEach(company => {
        const age = calculateAge(company.founded);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${company.name}</td>
            <td><a href="https://www.google.com/search?q=${company.stock}+stock" target="_blank">${company.stock} (${company.exchange})</a></td>
            <td>${company.founded}</td>
            <td>${age}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Initial table population
populateTable(companies);

// Calculate age on button click
calculateBtn.addEventListener('click', () => {
    const foundedYear = parseInt(companySelect.value);
    if (!foundedYear) {
        resultDiv.textContent = 'Please select a company!';
        return;
    }
    const age = calculateAge(foundedYear);
    const companyName = companySelect.options[companySelect.selectedIndex].text;
    resultDiv.textContent = `${companyName} is ${age} years old as of ${currentYear}.`;
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
            }
            if (sortDirection[sortKey] === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
        
        populateTable(sortedCompanies);
    });
});