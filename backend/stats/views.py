from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserStats
from .serializers import StatisticsSerializer

@api_view(["GET"])
def get_stats(request):
    stats = UserStats.objects.get(profile=request.user.profile)
    serializer = StatisticsSerializer(stats)
    return Response(serializer.data)

@api_view(["POST"])
def update_stats(request):
    stats = UserStats.objects.get(profile=request.user.profile)
    serializer = StatisticsSerializer(stats, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
