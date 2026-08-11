from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_account_initial_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='status',
            field=models.CharField(
                choices=[
                    ('AVAILABLE', 'AVAILABLE'),
                    ('PARTIAL', 'PARTIAL'),
                    ('UNAVAILABLE', 'UNAVAILABLE'),
                    ('PROCESSING', 'PROCESSING'),
                    ('FAILED', 'FAILED'),
                ],
                default='AVAILABLE',
                max_length=15,
            ),
        ),
    ]
