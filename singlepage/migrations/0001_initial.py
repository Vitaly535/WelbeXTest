# Generated by Django 3.2.7 on 2021-09-21 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ranges',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(verbose_name='Дата')),
                ('name', models.CharField(max_length=100, verbose_name='Название')),
                ('quantity', models.PositiveIntegerField(verbose_name='Количество')),
                ('distance', models.FloatField(verbose_name='Расстояние')),
            ],
            options={
                'verbose_name': 'Таблица количества и расстояний',
                'verbose_name_plural': 'Таблица количества и расстояний',
                'ordering': ['date'],
            },
        ),
    ]