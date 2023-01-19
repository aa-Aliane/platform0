# Generated by Django 3.2 on 2023-01-19 07:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=50)),
                ('word_fr', models.CharField(max_length=50)),
                ('word_en', models.CharField(max_length=50)),
                ('created_at', models.IntegerField()),
                ('definition', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Context',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('context', models.TextField()),
                ('keywords', models.TextField()),
                ('ref', models.TextField()),
                ('word', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='salmi.word')),
            ],
        ),
    ]
