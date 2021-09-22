from django.contrib import admin

from .models import Ranges


class RangesAdmin(admin.ModelAdmin):
    empty_value_display = '- - -'
    list_display = ('date', 'name', 'quantity', 'distance',)

    list_filter = ['date', 'name', 'quantity', 'distance', ]


admin.site.register(Ranges, RangesAdmin)
