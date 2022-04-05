from django.contrib import admin
from .models import Minute, MinuteFile, Participant, Speech, SpeechFile, SpeechComment


admin.site.register(Minute)
admin.site.register(MinuteFile)
admin.site.register(Participant)
admin.site.register(Speech)
admin.site.register(SpeechFile)
admin.site.register(SpeechComment)
