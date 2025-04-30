import json #new
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth.models import User
from .services.forecast import generate_forecast
from django.conf import settings
from rest_framework import status
import requests
from django.core.cache import cache  # For response caching
import time #new
from datetime import datetime, timedelta
#from openai import OpenAI  #new
#client = OpenAI(api_key=settings.OPENAI_API_KEY) #new
chutes_key = settings.CHUTES_API_KEY


# class OpenAIPromptView(APIView): BILLING STUK
#     def post(self, request):
#         prompt = request.data.get("prompt")
#         if not prompt:
#             return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             # Use the new client.chat.completions.create() syntax
#             response = client.chat.completions.create(
#                 model="gpt-3.5-turbo",  # or "gpt-4"
#                 messages=[{"role": "user", "content": prompt}]
#             )
            
#             # Correct way to access the response in v1.0.0+
#             message = response.choices[0].message.content
            
#             return Response({"response": message})

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class ChutesPromptView(APIView):
    CHUTES_API_URL = "https://llm.chutes.ai/v1/chat/completions"
    DEFAULT_MODEL = "deepseek-ai/DeepSeek-V3-0324"
    
    def get(self, request):
        return Response({
            "instructions": "Send a POST request with your prompt",
            "example_request": {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": {
                    "prompt": "Your question here"
                }
            }
        })

    def post(self, request):
        try:
            prompt = request.data.get("prompt")
            if not prompt:
                return Response({"error": "Prompt is required"}, status=400)

            # Cache key based on prompt and parameters
            cache_key = f"chutes_{hash(frozenset(request.data.items()))}"
            if cached := cache.get(cache_key):
                return Response(cached)

            headers = {
                "Authorization": f"Bearer {settings.CHUTES_API_KEY}",
                "Content-Type": "application/json"
            }

            payload = {
                "model": request.data.get("model", self.DEFAULT_MODEL),
                "messages": [{
                    "role": "user",
                    "content": prompt
                }],
                "stream": False,  # Django can't handle streaming responses easily
                "max_tokens": request.data.get("max_tokens", 1024),
                "temperature": request.data.get("temperature", 0.7)
            }

            # Debug output
            print("Sending to Chutes API:")
            print(json.dumps(payload, indent=2))

            response = requests.post(
                self.CHUTES_API_URL,
                json=payload,
                headers=headers,
                timeout=15
            )

            if response.status_code == 200:
                data = response.json()
                result = {
                    "response": data["choices"][0]["message"]["content"],
                    "usage": data.get("usage", {})
                }
                # Cache for 10 minutes
                cache.set(cache_key, result, 600)
                return Response(result)
            
            # Handle specific errors
            if response.status_code == 403:
                return Response(
                    {"error": "Authentication failed - check your API key"},
                    status=403
                )
            elif response.status_code == 429:
                return Response(
                    {"error": "Rate limit exceeded - try again later"},
                    status=429
                )
            else:
                return Response(
                    {"error": f"API error {response.status_code}", "details": response.text},
                    status=response.status_code
                )

        except Exception as e:
            return Response(
                {"error": "Processing failed", "details": str(e)},
                status=500
            )





class ProphetForecastView(APIView):
    def post(self, request):
        # Expect data as list of {"ds": date, "y": value}
        time_series_data = request.data.get("data", [])
        forecast_days = request.data.get("periods", 7)

        if not time_series_data:
            return Response({"error": "No time series data provided"}, status=400)

        try:
            forecast = generate_forecast(time_series_data, forecast_days)
            return Response(forecast)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class UserViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(seld, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class RegisterView(APIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=201)
        return Response(serializer.errors, status=400)