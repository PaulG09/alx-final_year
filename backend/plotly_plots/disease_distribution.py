import pandas as pd
import plotly.express as px
import plotly
import json

def disease_distribution():
    df = pd.read_excel('cleaned_health_data.xlsx')
    df.dropna(inplace=True)
    disease_totals = df.drop(columns=['YEAR', 'REGION']).sum().reset_index()
    disease_totals.columns = ['Disease', 'Cases']

    fig = px.pie(
        disease_totals,
        names='Disease',
        values='Cases',
        title="Disease Distribution in Ghana",
        template="plotly_dark"
    )
    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
