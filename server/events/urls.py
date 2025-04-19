from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet,EventTypeViewSet

router = DefaultRouter()

router.register(r"events", EventViewSet)
router.register(r'event-types', EventTypeViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

