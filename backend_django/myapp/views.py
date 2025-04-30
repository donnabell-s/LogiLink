from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth.models import User
from .services.forecast import generate_forecast
from django.conf import settings
from rest_framework import status
import openai

openai.api_key = settings.OPENAI_API_KEY

class OpenAIPromptView(APIView):
    def post(self, request):
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # or "gpt-4"
                messages=[{"role": "user", "content": prompt}]
            )
            message = response["choices"][0]["message"]["content"]
            return Response({"response": message})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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