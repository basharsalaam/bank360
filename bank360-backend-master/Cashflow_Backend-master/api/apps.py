from django.apps import AppConfig

import joblib

channel_model = None
category_model = None

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        global channel_model, category_model
        import sys, types
        
        stub = types.ModuleType('keras.saving.pickle_utils')
        sys.modules['keras.saving.pickle_utils'] = stub
        
        try:
            channel_model = joblib.load('api/ml_model/cashflow_channel')
            if channel_model is None:
                channel_model = None
        except Exception as e:
            print(f'Warning: Could not load channel model: {e}')
            channel_model = None
        
        try:
            category_model = joblib.load('api/ml_model/cashflow_category')
            if category_model is None:
                category_model = None
        except Exception as e:
            print(f'Warning: Could not load category model: {e}')
            category_model = None
