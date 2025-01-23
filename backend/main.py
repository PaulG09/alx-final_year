import sys
import json
from plotly_plots.disease_trend import disease_trend
from plotly_plots.disease_comparison import disease_comparison
from plotly_plots.disease_distribution import disease_distribution
from plotly_plots.disease_heatmap import disease_heatmap
from plotly_plots.disease_prediction import disease_prediction

def main():
    # Read the endpoint from the command-line argument
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No endpoint specified"}))
        sys.exit(1)

    endpoint = sys.argv[1].lower()

    # Call the appropriate function based on the endpoint
    if endpoint == "disease-trend":
        print(disease_trend())
    elif endpoint == "disease-comparison":
        print(disease_comparison())
    elif endpoint == "disease-distribution":
        print(disease_distribution())
    elif endpoint == "disease-heatmap":
        print(disease_heatmap())
    elif endpoint == "disease-prediction":
        print(disease_prediction())
    else:
        print(json.dumps({"error": "Invalid endpoint"}))

if __name__ == "__main__":
    main()
