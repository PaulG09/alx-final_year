import pandas as pd
import plotly.express as px
import plotly
import json

def disease_heatmap():
    df = pd.read_excel('cleaned_health_data.xlsx')
    df.dropna(inplace=True)
    df_grouped = df.groupby(['YEAR']).sum().reset_index()

    fig = px.imshow(
        df_grouped.set_index('YEAR').transpose(),
        title="Heatmap of Disease Cases Over Time",
        labels={'x': 'Year', 'y': 'Disease', 'color': 'Cases'},
        template="plotly_dark"
    )
    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
