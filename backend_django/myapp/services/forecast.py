import pandas as pd
from prophet import Prophet
from datetime import timedelta

def generate_forecast(data, periods=7):
    # Convert list of dicts to DataFrame
    df = pd.DataFrame(data)
    df.columns = ['ds', 'y']  # Prophet requires 'ds' (date) and 'y' (value)
    
    # Initialize and fit the model
    model = Prophet()
    model.fit(df)

    # Create future dataframe
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)

    # Return only forecasted periods
    forecast_df = forecast[['ds', 'yhat']].tail(periods)
    return forecast_df.to_dict(orient='records')
