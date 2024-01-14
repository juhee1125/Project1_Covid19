import pandas as pd

# Load the data into a DataFrame with the detected encoding
data = pd.read_csv('1.csv', delimiter=',', encoding='utf-8')

# Loop through unique country names
unique_countries = data['location'].unique()

for country in unique_countries:
    # Filter the data for each country
    country_data = data[data['location'] == country]
    country = country.replace(" ","_")
    # Save the filtered data to a separate CSV file
    file_name = f'file/{country}_covid_data.csv'
    country_data.to_csv(file_name, index=False,encoding='utf-8')

print("파일 분리 완료")
