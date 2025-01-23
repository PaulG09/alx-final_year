import pandas as pd
import plotly.express as px
import plotly
import json

def disease_trend():
    df = pd.read_excel('cleaned_health_data.xlsx')
    df.dropna(inplace=True)
    diseases = df.columns[2:]  # Exclude 'YEAR' and 'REGION'
    df_filtered = df[['YEAR', 'REGION'] + list(diseases)].melt(id_vars=['YEAR', 'REGION'], var_name='Disease', value_name='Cases')
    fig = px.line(
        df_filtered, x="YEAR", y="Cases", color="Disease",
        title="Disease Trends Over Time", labels={"YEAR": "Year", "Cases": "Number of Cases"}, template="plotly_dark"
    )
    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
