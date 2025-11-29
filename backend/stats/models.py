from django.db import models
from django.contrib.auth.models import User

class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    games_played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    last_played = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Stats"