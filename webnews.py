import pandas as pd
from bs4 import BeautifulSoup
import requests

url = "https://www.ycombinator.com/companies/industry/security"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# This part would need customization based on how the data is structured on the page
companies = soup.find_all('div', class_='company-item')  # Example selector, adjust as needed

data = []
for company in companies:
    name = company.find('h3').text if company.find('h3') else "N/A"
    description = company.find('p').text if company.find('p') else "N/A"
    data.append([name, description])

df = pd.DataFrame(data, columns=["Company Name", "Description"])
df.to_excel('security_companies.xlsx', index=False)