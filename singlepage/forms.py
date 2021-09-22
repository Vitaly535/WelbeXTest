from django import forms
from django.forms.widgets import DateInput

from .models import Ranges


class RangesForm(forms.ModelForm):
    class Meta:
        model = Ranges
        fields = ['date', 'name', 'quantity', 'distance']
        labels = {
            'date': 'Дата',
            'name': 'Название',
            'quantity': 'Количество',
            'distance': 'Расстояние',

        }
        help_texts = {
            'quantity': 'Целое число',
            'distance': 'Дробное'
        }
        widgets = {
            'date': forms.DateInput(
                attrs={'class': 'form-control',
                       'placeholder': 'Select a date',
                       'type': 'date'}

            ),
        }
