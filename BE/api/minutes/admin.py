from django.contrib import admin
from .models import Minute, Participant, Speech, SpeechComment


admin.site.register(Minute)
admin.site.register(Participant)
admin.site.register(Speech)
admin.site.register(SpeechComment)
