// NASDAQ 100 company data with founding years and approximate market values (as of Feb 24, 2025)
const companies = [
    { name: "Apple Inc.", stock: "AAPL", exchange: "NASDAQ", founded: 1976, marketValue: 3600000 }, // $3.6T
    { name: "NVIDIA Corporation", stock: "NVDA", exchange: "NASDAQ", founded: 1993, marketValue: 3570000 }, // $3.57T
    { name: "Microsoft Corporation", stock: "MSFT", exchange: "NASDAQ", founded: 1975, marketValue: 3080000 }, // $3.08T
    { name: "Amazon.com Inc.", stock: "AMZN", exchange: "NASDAQ", founded: 1994, marketValue: 2180000 }, // $2.18T
    { name: "Alphabet Inc. (Class A)", stock: "GOOGL", exchange: "NASDAQ", founded: 1998, marketValue: 2170000 }, // $2.17T (combined)
    { name: "Alphabet Inc. (Class C)", stock: "GOOG", exchange: "NASDAQ", founded: 1998, marketValue: 2170000 }, // $2.17T (combined)
    { name: "Meta Platforms Inc.", stock: "META", exchange: "NASDAQ", founded: 2004, marketValue: 1440000 }, // $1.44T
    { name: "Tesla Inc.", stock: "TSLA", exchange: "NASDAQ", founded: 2003, marketValue: 926000 }, // $926B
    { name: "Broadcom Inc.", stock: "AVGO", exchange: "NASDAQ", founded: 1961, marketValue: 616000 }, // $616B
    { name: "Adobe Inc.", stock: "ADBE", exchange: "NASDAQ", founded: 1982, marketValue: 300000 }, // $300B
    { name: "Cisco Systems Inc.", stock: "CSCO", exchange: "NASDAQ", founded: 1984, marketValue: 250000 }, // $250B
    { name: "Intel Corporation", stock: "INTC", exchange: "NASDAQ", founded: 1968, marketValue: 200000 }, // $200B
    { name: "Advanced Micro Devices", stock: "AMD", exchange: "NASDAQ", founded: 1969, marketValue: 180000 }, // $180B
    { name: "Qualcomm Inc.", stock: "QCOM", exchange: "NASDAQ", founded: 1985, marketValue: 170000 }, // $170B
    { name: "Applied Materials Inc.", stock: "AMAT", exchange: "NASDAQ", founded: 1967, marketValue: 75000 }, // $75B
    { name: "Micron Technology Inc.", stock: "MU", exchange: "NASDAQ", founded: 1978, marketValue: 70000 }, // $70B
    { name: "Texas Instruments Inc.", stock: "TXN", exchange: "NASDAQ", founded: 1930, marketValue: 65000 }, // $65B
    { name: "Intuit Inc.", stock: "INTU", exchange: "NASDAQ", founded: 1983, marketValue: 55000 }, // $55B
    { name: "Lam Research Corporation", stock: "LRCX", exchange: "NASDAQ", founded: 1980, marketValue: 45000 }, // $45B
    { name: "Autodesk Inc.", stock: "ADSK", exchange: "NASDAQ", founded: 1982, marketValue: 35000 }, // $35B
    { name: "Synopsys Inc.", stock: "SNPS", exchange: "NASDAQ", founded: 1986, marketValue: 32000 }, // $32B
    { name: "Cadence Design Systems", stock: "CDNS", exchange: "NASDAQ", founded: 1988, marketValue: 30000 }, // $30B
    { name: "Workday Inc.", stock: "WDAY", exchange: "NASDAQ", founded: 2005, marketValue: 28000 }, // $28B
    { name: "Fortinet Inc.", stock: "FTNT", exchange: "NASDAQ", founded: 2000, marketValue: 25000 }, // $25B
    { name: "Crowdstrike Holdings", stock: "CRWD", exchange: "NASDAQ", founded: 2011, marketValue: 23000 }, // $23B
    { name: "Datadog Inc.", stock: "DDOG", exchange: "NASDAQ", founded: 2010, marketValue: 20000 }, // $20B
    { name: "Zoom Video Communications", stock: "ZM", exchange: "NASDAQ", founded: 2011, marketValue: 17000 }, // $17B
    { name: "PayPal Holdings Inc.", stock: "PYPL", exchange: "NASDAQ", founded: 1998, marketValue: 16000 }, // $16B
    { name: "Okta Inc.", stock: "OKTA", exchange: "NASDAQ", founded: 2009, marketValue: 14000 }, // $14B
    { name: "MongoDB Inc.", stock: "MDB", exchange: "NASDAQ", founded: 2007, marketValue: 13000 }, // $13B
    { name: "Splunk Inc.", stock: "SPLK", exchange: "NASDAQ", founded: 2003, marketValue: 12000 }, // $12B
    { name: "NetApp Inc.", stock: "NTAP", exchange: "NASDAQ", founded: 1992, marketValue: 10000 }, // $10B
    { name: "Zscaler Inc.", stock: "ZS", exchange: "NASDAQ", founded: 2007, marketValue: 9000 }, // $9B
    { name: "Super Micro Computer", stock: "SMCI", exchange: "NASDAQ", founded: 1993, marketValue: 8000 }, // $8B
    { name: "Dropbox Inc.", stock: "DBX", exchange: "NASDAQ", founded: 2007, marketValue: 7000 }, // $7B
    { name: "DocuSign Inc.", stock: "DOCU", exchange: "NASDAQ", founded: 2003, marketValue: 6000 }, // $6B
    { name: "PepsiCo Inc.", stock: "PEP", exchange: "NASDAQ", founded: 1898, marketValue: 230000 }, // $230B
    { name: "Costco Wholesale Corporation", stock: "COST", exchange: "NASDAQ", founded: 1976, marketValue: 420000 }, // $420B
    { name: "Starbucks Corporation", stock: "SBUX", exchange: "NASDAQ", founded: 1971, marketValue: 115000 }, // $115B
    { name: "MercadoLibre Inc.", stock: "MELI", exchange: "NASDAQ", founded: 1999, marketValue: 90000 }, // $90B
    { name: "Booking Holdings Inc.", stock: "BKNG", exchange: "NASDAQ", founded: 1996, marketValue: 140000 }, // $140B
    { name: "Activision Blizzard Inc.", stock: "ATVI", exchange: "NASDAQ", founded: 2008, marketValue: 74000 }, // $74B (pre-MSFT acquisition value)
    { name: "Kraft Heinz Company", stock: "KHC", exchange: "NASDAQ", founded: 2015, marketValue: 45000 }, // $45B
    { name: "Biogen Inc.", stock: "BIIB", exchange: "NASDAQ", founded: 1978, marketValue: 35000 }, // $35B
    { name: "Gilead Sciences Inc.", stock: "GILD", exchange: "NASDAQ", founded: 1987, marketValue: 95000 }, // $95B
    { name: "Amgen Inc.", stock: "AMGN", exchange: "NASDAQ", founded: 1980, marketValue: 170000 }, // $170B
    { name: "Verisk Analytics Inc.", stock: "VRSK", exchange: "NASDAQ", founded: 1971, marketValue: 40000 }, // $40B
    { name: "PACCAR Inc.", stock: "PCAR", exchange: "NASDAQ", founded: 1905, marketValue: 55000 }, // $55B
    { name: "KLA Corporation", stock: "KLAC", exchange: "NASDAQ", founded: 1975, marketValue: 90000 }, // $90B
    { name: "Ross Stores Inc.", stock: "ROST", exchange: "NASDAQ", founded: 1982, marketValue: 50000 }, // $50B
    { name: "Netflix Inc.", stock: "NFLX", exchange: "NASDAQ", founded: 1997, marketValue: 300000 }, // $300B
    { name: "T-Mobile US Inc.", stock: "TMUS", exchange: "NASDAQ", founded: 1994, marketValue: 240000 }, // $240B
    { name: "Comcast Corporation", stock: "CMCSA", exchange: "NASDAQ", founded: 1963, marketValue: 160000 }, // $160B
    { name: "Marriott International", stock: "MAR", exchange: "NASDAQ", founded: 1927, marketValue: 75000 }, // $75B
    { name: "O'Reilly Automotive Inc.", stock: "ORLY", exchange: "NASDAQ", founded: 1957, marketValue: 65000 }, // $65B
    { name: "Automatic Data Processing", stock: "ADP", exchange: "NASDAQ", founded: 1949, marketValue: 120000 }, // $120B
    { name: "Mondelez International", stock: "MDLZ", exchange: "NASDAQ", founded: 1923, marketValue: 90000 }, // $90B
    { name: "Regeneron Pharmaceuticals", stock: "REGN", exchange: "NASDAQ", founded: 1988, marketValue: 110000 }, // $110B
    { name: "Vertex Pharmaceuticals", stock: "VRTX", exchange: "NASDAQ", founded: 1989, marketValue: 120000 }, // $120B
    { name: "Moderna Inc.", stock: "MRNA", exchange: "NASDAQ", founded: 2010, marketValue: 35000 }, // $35B
    { name: "CSX Corporation", stock: "CSX", exchange: "NASDAQ", founded: 1980, marketValue: 70000 }, // $70B
    { name: "Paychex Inc.", stock: "PAYX", exchange: "NASDAQ", founded: 1971, marketValue: 45000 }, // $45B
    { name: "Dollar Tree Inc.", stock: "DLTR", exchange: "NASDAQ", founded: 1986, marketValue: 25000 }, // $25B
    { name: "Electronic Arts Inc.", stock: "EA", exchange: "NASDAQ", founded: 1982, marketValue: 40000 }, // $40B
    { name: "Illumina Inc.", stock: "ILMN", exchange: "NASDAQ", founded: 1998, marketValue: 25000 }, // $25B
    { name: "Walgreens Boots Alliance", stock: "WBA", exchange: "NASDAQ", founded: 1901, marketValue: 20000 }, // $20B
    { name: "Fastenal Company", stock: "FAST", exchange: "NASDAQ", founded: 1967, marketValue: 40000 }, // $40B
    { name: "Cintas Corporation", stock: "CTAS", exchange: "NASDAQ", founded: 1929, marketValue: 75000 }, // $75B
    { name: "Exelon Corporation", stock: "EXC", exchange: "NASDAQ", founded: 2000, marketValue: 40000 }, // $40B
    { name: "Cognizant Tech Solutions", stock: "CTSH", exchange: "NASDAQ", founded: 1994, marketValue: 35000 }, // $35B
    { name: "Keurig Dr Pepper Inc.", stock: "KDP", exchange: "NASDAQ", founded: 1981, marketValue: 50000 }, // $50B
    { name: "Baidu Inc.", stock: "BIDU", exchange: "NASDAQ", founded: 2000, marketValue: 30000 }, // $30B
    { name: "Xcel Energy Inc.", stock: "XEL", exchange: "NASDAQ", founded: 1909, marketValue: 35000 }, // $35B
    { name: "American Electric Power", stock: "AEP", exchange: "NASDAQ", founded: 1906, marketValue: 50000 }, // $50B
    { name: "Constellation Energy", stock: "CEG", exchange: "NASDAQ", founded: 1999, marketValue: 60000 }, // $60B
    { name: "Lululemon Athletica", stock: "LULU", exchange: "NASDAQ", founded: 1998, marketValue: 45000 }, // $45B
    { name: "Microchip Technology", stock: "MCHP", exchange: "NASDAQ", founded: 1989, marketValue: 45000 }, // $45B
    { name: "ON Semiconductor", stock: "ON", exchange: "NASDAQ", founded: 1999, marketValue: 35000 }, // $35B
    { name: "DexCom Inc.", stock: "DXCM", exchange: "NASDAQ", founded: 1999, marketValue: 45000 }, // $45B
    { name: "IDEXX Laboratories", stock: "IDXX", exchange: "NASDAQ", founded: 1983, marketValue: 40000 }, // $40B
    { name: "CoStar Group Inc.", stock: "CSGP", exchange: "NASDAQ", founded: 1987, marketValue: 35000 }, // $35B
    { name: "Baker Hughes Company", stock: "BKR", exchange: "NASDAQ", founded: 1987, marketValue: 35000 }, // $35B
    { name: "Diamondback Energy", stock: "FANG", exchange: "NASDAQ", founded: 2007, marketValue: 30000 }, // $30B
    { name: "Warner Bros. Discovery", stock: "WBD", exchange: "NASDAQ", founded: 2005, marketValue: 25000 }, // $25B
    { name: "GlobalFoundries Inc.", stock: "GFS", exchange: "NASDAQ", founded: 2009, marketValue: 20000 }, // $20B
    { name: "Take-Two Interactive", stock: "TTWO", exchange: "NASDAQ", founded: 1993, marketValue: 30000 }, // $30B
    { name: "NXP Semiconductors", stock: "NXPI", exchange: "NASDAQ", founded: 2006, marketValue: 65000 }, // $65B
    { name: "Ansys Inc.", stock: "ANSS", exchange: "NASDAQ", founded: 1970, marketValue: 30000 }, // $30B
    { name: "Copart Inc.", stock: "CPRT", exchange: "NASDAQ", founded: 1982, marketValue: 50000 }, // $50B
    { name: "Trade Desk Inc.", stock: "TTD", exchange: "NASDAQ", founded: 2009, marketValue: 50000 }, // $50B
    { name: "Verisign Inc.", stock: "VRSN", exchange: "NASDAQ", founded: 1995, marketValue: 20000 }, // $20B
    { name: "AppLovin Corporation", stock: "APP", exchange: "NASDAQ", founded: 2012, marketValue: 25000 }, // $25B
    { name: "AstraZeneca PLC", stock: "AZN", exchange: "NASDAQ", founded: 1999, marketValue: 250000 }, // $250B
    { name: "Atlassian Corporation", stock: "TEAM", exchange: "NASDAQ", founded: 2002, marketValue: 45000 }, // $45B
    { name: "CDW Corporation", stock: "CDW", exchange: "NASDAQ", founded: 1984, marketValue: 30000 }, // $30B
    { name: "Check Point Software", stock: "CHKP", exchange: "NASDAQ", founded: 1993, marketValue: 20000 }, // $20B
    { name: "Old Dominion Freight", stock: "ODFL", exchange: "NASDAQ", founded: 1934, marketValue: 40000 }, // $40B
    { name: "GE HealthCare Tech", stock: "GEHC", exchange: "NASDAQ", founded: 1994, marketValue: 45000 }, // $45B
    { name: "Seagen Inc.", stock: "SGEN", exchange: "NASDAQ", founded: 1997, marketValue: 40000 } // $40B (pre-Pfizer acquisition value)
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
    resultDiv.textContent = `${companyName} is ${age} years old as of ${currentYear} with an approximate market value of ${marketValue}.`;
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