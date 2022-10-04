from django.urls import include, path
from .views import WordViewSet, get_context, post_context
from rest_framework import routers

router = routers.DefaultRouter()
router.register('words', WordViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get_context/', get_context, name="get_context"),
    path('post_context/', post_context, name="post_context")
]