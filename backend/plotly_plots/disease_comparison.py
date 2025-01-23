import pandas as pd
import plotly.express as px
import plotly
import json

def disease_comparison():
    df = pd.read_excel('cleaned_health_data.xlsx')
    df.dropna(inplace=True)
    df_region_sum = df.groupby('REGION').sum().reset_index()
    df_melted = df_region_sum.melt(id_vars=['REGION'], var_name='Disease', value_name='Cases')

    fig = px.bar(
        df_melted,
        x="REGION",
        y="Cases",
        color="Disease",
        title="Regional Disease Cases",
        labels={"REGION": "Region", "Cases": "Number of Cases"},
        template="plotly_dark"
    )
    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
