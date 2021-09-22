from django.db import models

# Create your models here.


class Ranges(models.Model):
    date = models.DateField(auto_now_add=False,
                            verbose_name='Дата')
    name = models.CharField(max_length=100, verbose_name='Название')
    quantity = models.PositiveIntegerField(verbose_name='Количество')
    distance = models.FloatField(verbose_name='Расстояние')

    class Meta:
        verbose_name = 'Таблица количества и расстояний'
        verbose_name_plural = "Таблица количества и расстояний"
        ordering = ["date"]

    def __str__(self):
        return f'{self.name}'
