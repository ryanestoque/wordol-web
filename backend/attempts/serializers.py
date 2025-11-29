from rest_framework import serializers
from .models import UserAttempt

class UserAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAttempt
        fields = [
            "cebuano_word",
            "guessed_words",
            "attempts",
            "has_won",
            "played_at"
        ]
