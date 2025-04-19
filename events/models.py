from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Event(models.Model):
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")  # Optional field
    startDate = models.DateField()
    endDate = models.DateField()
    order = models.IntegerField(default=0)
    progress = models.IntegerField(
            default=0,
            validators=[
                MinValueValidator(0),
                MaxValueValidator(100)
            ]
        )
    def __str__(self):
        return self.title

class EventType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name