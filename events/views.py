from rest_framework import viewsets
from .models import Event,EventType
from .serializers import EventSerializer,EventTypeSerializer
from django.shortcuts import render

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    

def index(request):
    return render(request, 'index.html')