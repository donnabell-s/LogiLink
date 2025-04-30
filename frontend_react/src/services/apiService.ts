// src/services/apiService.ts
export interface ForecastInput {
    ds: string; // date string in YYYY-MM-DD
    y: number;  // observed value
  }
  
  export interface ForecastOutput {
    ds: string;
    yhat: number; // forecasted value
  }
  
  export const fetchForecast = async (
    data: ForecastInput[],
    periods = 7,
    token?: string
  ): Promise<ForecastOutput[] | { error: string }> => {
    try {
      const response = await fetch("http://localhost:8000/api/forecast/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ data, periods })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.error || "Unknown server error" };
      }
  
      const forecast: ForecastOutput[] = await response.json();
      return forecast;
    } catch (err: any) {
      return { error: err.message || "Network error" };
    }
  };
  