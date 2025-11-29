from django.db import models
from django.contrib.auth.models import User

class UserAttempt(models.Model):
    profile = models.ForeignKey(User, on_delete=models.CASCADE)

    cebuano_word = models.CharField(max_length=50)
    guessed_words = models.JSONField(default=list)
    attempts = models.IntegerField(default=0)
    has_won = models.BooleanField(default=False)

    played_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.profile.display_name} - {self.cebuano_word}"

