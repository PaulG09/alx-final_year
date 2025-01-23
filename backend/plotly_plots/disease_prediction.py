import pandas as pd
import plotly.express as px
import plotly
import json

def disease_prediction():
    df = pd.read_excel('cleaned_health_data.xlsx')
    try:
        # Calculate the yearly difference for each disease to estimate the trend
        diseases = df.columns[2:]  # Assuming the disease data starts from the 3rd column
        avg_increase = {}

        # Calculate average yearly increase for each disease
        for disease in diseases:
            yearly_diff = df.groupby('YEAR')[disease].sum().diff().dropna()
            avg_increase[disease] = yearly_diff.mean()

        # Project future cases for the next 30 years based on the average increase
        last_year = df['YEAR'].max()
        future_years = pd.DataFrame({'YEAR': range(last_year + 1, last_year + 31)})  # Next 30 years
        future_cases = future_years.copy()

        for disease, avg_inc in avg_increase.items():
            last_value = df[df['YEAR'] == last_year][disease].values[0]
            future_cases[disease] = last_value + (avg_inc * range(1, 31))  # Predict for 30 years

        # Melt the future cases DataFrame to long format for Plotly visualization
        future_cases_melted = future_cases.melt(id_vars=['YEAR'], var_name='Disease', value_name='Predicted Cases')

        # Create a Plotly line chart for future predictions
        fig = px.line(
            future_cases_melted,
            x="YEAR",
            y="Predicted Cases",
            color="Disease",
            title="Predicted Disease Cases for the Next 30 Years",
            labels={"YEAR": "Year", "Predicted Cases": "Number of Cases"},
            template="plotly_dark"
        )

        # Convert the figure to JSON for rendering on the frontend
        return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

