from django.contrib import admin
from .models import Board, BoardFile, BoardComment


admin.site.register(Board)
admin.site.register(BoardFile)
admin.site.register(BoardComment)
