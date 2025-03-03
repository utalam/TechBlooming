let stockCount = 1;

function showPriceButton(stockNameId, buttonId) {
  const stockName = document.getElementById(stockNameId).value.trim();
  const button = document.getElementById(buttonId);
  if (stockName) {
    button.style.display = 'inline-block'; // Show button when stock name is entered
  } else {
    button.style.display = 'none'; // Hide button if stock name is empty
  }
}

function searchStockPrice(stockNameId) {
  const stockName = document.getElementById(stockNameId).value.trim().toUpperCase();
  if (stockName) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(stockName)}+stock+price`;
    window.open(url, '_blank'); // Open Google search in a new tab
  } else {
    alert("Please enter a stock name first.");
  }
}

function addStockRow() {
  if (stockCount < 5) {
    stockCount++;
    document.getElementById(`stockRow${stockCount}`).style.display = 'block';
    document.getElementById(`resultItem${stockCount}`).style.display = 'flex';
    if (stockCount === 5) {
      document.getElementById('addStockBtn').style.display = 'none'; // Hide button when max reached
    }
  }
}

function calculate() {
  // Get base stock inputs
  let baseName = document.getElementById("baseName").value || "Base Stock";
  let basePrice = parseFloat(document.getElementById("basePrice").value);
  let baseUnits = parseInt(document.getElementById("baseUnits").value);
  
  // Check if inputs are valid
  if (!basePrice || !baseUnits || basePrice <= 0 || baseUnits <= 0) {
    alert("Please enter a valid base stock price and units.");
    return;
  }
  
  let total = basePrice * baseUnits;

  // Get comparison stock inputs dynamically (up to stockCount)
  let stockNames = [];
  let stockPrices = [];
  let stockUnits = []; // To store calculated units for display
  for (let i = 1; i <= stockCount; i++) {
    let name = document.getElementById(`stockName${i}`).value || `Stock ${i}`;
    let price = parseFloat(document.getElementById(`stock${i}`).value);
    if (price && price > 0) {
      stockNames.push(name);
      stockPrices.push(price);
      stockUnits.push(total / price); // Calculate units for each valid stock
    }
  }

  // Check if any comparison stocks are valid
  if (stockPrices.length === 0) {
    alert("Please enter at least one comparison stock price.");
    return;
  }

  // Display results
  document.getElementById("baseStockDisplay").innerText = `${baseName} ($${basePrice} × ${baseUnits} units)`;
  document.getElementById("total").innerText = "$" + total.toFixed(2);
  
  // Hide all result items first
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`resultItem${i}`).style.display = 'none';
  }

  // Show and update only the relevant result items with calculation details
  for (let i = 0; i < stockNames.length; i++) {
    const units = stockUnits[i];
    document.getElementById(`stockNameDisplay${i + 1}`).innerText = stockNames[i];
    document.getElementById(`result${i + 1}`).innerText = `$${stockPrices[i]} × ${Math.floor(units)} units (or ${units.toFixed(2)} with fractions)`;
    document.getElementById(`resultItem${i + 1}`).style.display = 'flex';
  }
}

function exportReport() {
  const resultsSection = document.getElementById("resultsSection");
  if (!resultsSection.innerText.includes("$")) {
    alert("Please calculate the results before exporting.");
    return;
  }

  html2canvas(resultsSection).then(canvas => {
    // Export as JPG
    const imgData = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'stock_unit_comparison_report.jpg';
    link.click();
  }).catch(error => {
    alert("Error exporting report: " + error);
  });
}