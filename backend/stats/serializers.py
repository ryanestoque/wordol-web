from rest_framework import serializers
from .models import UserStats

class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = [
            "games_played",
            "wins",
            "losses",
            "last_played",
        ]