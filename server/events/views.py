from rest_framework import viewsets
from .models import Event,EventType
from .serializers import EventSerializer,EventTypeSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("order")
    serializer_class = EventSerializer


class EventTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer