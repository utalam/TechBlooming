// NASDAQ 100 company data with founding years (as of Feb 24, 2025)
const companies = [
    { name: "Apple Inc.", stock: "AAPL", exchange: "NASDAQ", founded: 1976 },
    { name: "NVIDIA Corporation", stock: "NVDA", exchange: "NASDAQ", founded: 1993 },
    { name: "Microsoft Corporation", stock: "MSFT", exchange: "NASDAQ", founded: 1975 },
    { name: "Amazon.com Inc.", stock: "AMZN", exchange: "NASDAQ", founded: 1994 },
    { name: "Alphabet Inc. (Class A)", stock: "GOOGL", exchange: "NASDAQ", founded: 1998 },
    { name: "Alphabet Inc. (Class C)", stock: "GOOG", exchange: "NASDAQ", founded: 1998 },
    { name: "Meta Platforms Inc.", stock: "META", exchange: "NASDAQ", founded: 2004 },
    { name: "Tesla Inc.", stock: "TSLA", exchange: "NASDAQ", founded: 2003 },
    { name: "Broadcom Inc.", stock: "AVGO", exchange: "NASDAQ", founded: 1961 },
    { name: "Adobe Inc.", stock: "ADBE", exchange: "NASDAQ", founded: 1982 },
    { name: "Cisco Systems Inc.", stock: "CSCO", exchange: "NASDAQ", founded: 1984 },
    { name: "Intel Corporation", stock: "INTC", exchange: "NASDAQ", founded: 1968 },
    { name: "Advanced Micro Devices", stock: "AMD", exchange: "NASDAQ", founded: 1969 },
    { name: "Qualcomm Inc.", stock: "QCOM", exchange: "NASDAQ", founded: 1985 },
    { name: "Applied Materials Inc.", stock: "AMAT", exchange: "NASDAQ", founded: 1967 },
    { name: "Micron Technology Inc.", stock: "MU", exchange: "NASDAQ", founded: 1978 },
    { name: "Texas Instruments Inc.", stock: "TXN", exchange: "NASDAQ", founded: 1930 },
    { name: "Intuit Inc.", stock: "INTU", exchange: "NASDAQ", founded: 1983 },
    { name: "Lam Research Corporation", stock: "LRCX", exchange: "NASDAQ", founded: 1980 },
    { name: "Autodesk Inc.", stock: "ADSK", exchange: "NASDAQ", founded: 1982 },
    { name: "Synopsys Inc.", stock: "SNPS", exchange: "NASDAQ", founded: 1986 },
    { name: "Cadence Design Systems", stock: "CDNS", exchange: "NASDAQ", founded: 1988 },
    { name: "Workday Inc.", stock: "WDAY", exchange: "NASDAQ", founded: 2005 },
    { name: "Fortinet Inc.", stock: "FTNT", exchange: "NASDAQ", founded: 2000 },
    { name: "Crowdstrike Holdings", stock: "CRWD", exchange: "NASDAQ", founded: 2011 },
    { name: "Datadog Inc.", stock: "DDOG", exchange: "NASDAQ", founded: 2010 },
    { name: "Zoom Video Communications", stock: "ZM", exchange: "NASDAQ", founded: 2011 },
    { name: "PayPal Holdings Inc.", stock: "PYPL", exchange: "NASDAQ", founded: 1998 },
    { name: "Okta Inc.", stock: "OKTA", exchange: "NASDAQ", founded: 2009 },
    { name: "MongoDB Inc.", stock: "MDB", exchange: "NASDAQ", founded: 2007 },
    { name: "Splunk Inc.", stock: "SPLK", exchange: "NASDAQ", founded: 2003 },
    { name: "NetApp Inc.", stock: "NTAP", exchange: "NASDAQ", founded: 1992 },
    { name: "Zscaler Inc.", stock: "ZS", exchange: "NASDAQ", founded: 2007 },
    { name: "Super Micro Computer", stock: "SMCI", exchange: "NASDAQ", founded: 1993 },
    { name: "Dropbox Inc.", stock: "DBX", exchange: "NASDAQ", founded: 2007 },
    { name: "DocuSign Inc.", stock: "DOCU", exchange: "NASDAQ", founded: 2003 },
    { name: "PepsiCo Inc.", stock: "PEP", exchange: "NASDAQ", founded: 1898 },
    { name: "Costco Wholesale Corporation", stock: "COST", exchange: "NASDAQ", founded: 1976 },
    { name: "Starbucks Corporation", stock: "SBUX", exchange: "NASDAQ", founded: 1971 },
    { name: "MercadoLibre Inc.", stock: "MELI", exchange: "NASDAQ", founded: 1999 },
    { name: "Booking Holdings Inc.", stock: "BKNG", exchange: "NASDAQ", founded: 1996 },
    { name: "Activision Blizzard Inc.", stock: "ATVI", exchange: "NASDAQ", founded: 2008 },
    { name: "Kraft Heinz Company", stock: "KHC", exchange: "NASDAQ", founded: 2015 },
    { name: "Biogen Inc.", stock: "BIIB", exchange: "NASDAQ", founded: 1978 },
    { name: "Gilead Sciences Inc.", stock: "GILD", exchange: "NASDAQ", founded: 1987 },
    { name: "Amgen Inc.", stock: "AMGN", exchange: "NASDAQ", founded: 1980 },
    { name: "Verisk Analytics Inc.", stock: "VRSK", exchange: "NASDAQ", founded: 1971 },
    { name: "PACCAR Inc.", stock: "PCAR", exchange: "NASDAQ", founded: 1905 },
    { name: "KLA Corporation", stock: "KLAC", exchange: "NASDAQ", founded: 1975 },
    { name: "Ross Stores Inc.", stock: "ROST", exchange: "NASDAQ", founded: 1982 },
    { name: "Netflix Inc.", stock: "NFLX", exchange: "NASDAQ", founded: 1997 },
    { name: "T-Mobile US Inc.", stock: "TMUS", exchange: "NASDAQ", founded: 1994 },
    { name: "Comcast Corporation", stock: "CMCSA", exchange: "NASDAQ", founded: 1963 },
    { name: "Marriott International", stock: "MAR", exchange: "NASDAQ", founded: 1927 },
    { name: "O'Reilly Automotive Inc.", stock: "ORLY", exchange: "NASDAQ", founded: 1957 },
    { name: "Automatic Data Processing", stock: "ADP", exchange: "NASDAQ", founded: 1949 },
    { name: "Mondelez International", stock: "MDLZ", exchange: "NASDAQ", founded: 1923 },
    { name: "Regeneron Pharmaceuticals", stock: "REGN", exchange: "NASDAQ", founded: 1988 },
    { name: "Vertex Pharmaceuticals", stock: "VRTX", exchange: "NASDAQ", founded: 1989 },
    { name: "Moderna Inc.", stock: "MRNA", exchange: "NASDAQ", founded: 2010 },
    { name: "CSX Corporation", stock: "CSX", exchange: "NASDAQ", founded: 1980 },
    { name: "Paychex Inc.", stock: "PAYX", exchange: "NASDAQ", founded: 1971 },
    { name: "Dollar Tree Inc.", stock: "DLTR", exchange: "NASDAQ", founded: 1986 },
    { name: "Electronic Arts Inc.", stock: "EA", exchange: "NASDAQ", founded: 1982 },
    { name: "Illumina Inc.", stock: "ILMN", exchange: "NASDAQ", founded: 1998 },
    { name: "Walgreens Boots Alliance", stock: "WBA", exchange: "NASDAQ", founded: 1901 },
    { name: "Fastenal Company", stock: "FAST", exchange: "NASDAQ", founded: 1967 },
    { name: "Cintas Corporation", stock: "CTAS", exchange: "NASDAQ", founded: 1929 },
    { name: "Exelon Corporation", stock: "EXC", exchange: "NASDAQ", founded: 2000 },
    { name: "Cognizant Tech Solutions", stock: "CTSH", exchange: "NASDAQ", founded: 1994 },
    { name: "Keurig Dr Pepper Inc.", stock: "KDP", exchange: "NASDAQ", founded: 1981 },
    { name: "Baidu Inc.", stock: "BIDU", exchange: "NASDAQ", founded: 2000 },
    { name: "Xcel Energy Inc.", stock: "XEL", exchange: "NASDAQ", founded: 1909 },
    { name: "American Electric Power", stock: "AEP", exchange: "NASDAQ", founded: 1906 },
    { name: "Constellation Energy", stock: "CEG", exchange: "NASDAQ", founded: 1999 },
    { name: "Lululemon Athletica", stock: "LULU", exchange: "NASDAQ", founded: 1998 },
    { name: "Microchip Technology", stock: "MCHP", exchange: "NASDAQ", founded: 1989 },
    { name: "ON Semiconductor", stock: "ON", exchange: "NASDAQ", founded: 1999 },
    { name: "DexCom Inc.", stock: "DXCM", exchange: "NASDAQ", founded: 1999 },
    { name: "IDEXX Laboratories", stock: "IDXX", exchange: "NASDAQ", founded: 1983 },
    { name: "CoStar Group Inc.", stock: "CSGP", exchange: "NASDAQ", founded: 1987 },
    { name: "Baker Hughes Company", stock: "BKR", exchange: "NASDAQ", founded: 1987 },
    { name: "Diamondback Energy", stock: "FANG", exchange: "NASDAQ", founded: 2007 },
    { name: "Warner Bros. Discovery", stock: "WBD", exchange: "NASDAQ", founded: 2005 },
    { name: "GlobalFoundries Inc.", stock: "GFS", exchange: "NASDAQ", founded: 2009 },
    { name: "Take-Two Interactive", stock: "TTWO", exchange: "NASDAQ", founded: 1993 },
    { name: "NXP Semiconductors", stock: "NXPI", exchange: "NASDAQ", founded: 2006 },
    { name: "Ansys Inc.", stock: "ANSS", exchange: "NASDAQ", founded: 1970 },
    { name: "Copart Inc.", stock: "CPRT", exchange: "NASDAQ", founded: 1982 },
    { name: "Trade Desk Inc.", stock: "TTD", exchange: "NASDAQ", founded: 2009 },
    { name: "Verisign Inc.", stock: "VRSN", exchange: "NASDAQ", founded: 1995 },
    { name: "AppLovin Corporation", stock: "APP", exchange: "NASDAQ", founded: 2012 },
    { name: "AstraZeneca PLC", stock: "AZN", exchange: "NASDAQ", founded: 1999 },
    { name: "Atlassian Corporation", stock: "TEAM", exchange: "NASDAQ", founded: 2002 },
    { name: "CDW Corporation", stock: "CDW", exchange: "NASDAQ", founded: 1984 },
    { name: "Check Point Software", stock: "CHKP", exchange: "NASDAQ", founded: 1993 },
    { name: "Old Dominion Freight", stock: "ODFL", exchange: "NASDAQ", founded: 1934 },
    { name: "GE HealthCare Tech", stock: "GEHC", exchange: "NASDAQ", founded: 1994 },
    { name: "Seagen Inc.", stock: "SGEN", exchange: "NASDAQ", founded: 1997 }
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