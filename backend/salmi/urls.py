from django.urls import include, path
from .views import WordViewSet, ContextViewSet, get_context, post_context, update_word, post_word
from rest_framework import routers

router = routers.DefaultRouter()
router.register('words', WordViewSet)
router.register('contexts', ContextViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get_context/', get_context, name="get_context"),
    path('post_context/', post_context, name="post_context"),
    path('update_word/', update_word, name="update_word" ),
    path('post_word/', post_word, name="post_word" ),
]