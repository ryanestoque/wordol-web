from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserAttempt
from .serializers import UserAttemptSerializer

@api_view(["POST"])
def create_attempt(request):
    serializer = UserAttemptSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(profile=request.user.profile)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["GET"])
def get_attempt_history(request):
    attempts = UserAttempt.objects.filter(profile=request.user.profile).order_by("-played_at")
    serializer = UserAttemptSerializer(attempts, many=True)
    return Response(serializer.data)
