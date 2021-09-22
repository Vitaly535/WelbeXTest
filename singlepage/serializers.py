from rest_framework import serializers

from .models import Ranges


class RangesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ranges
        fields = '__all__'

    def to_representation(self, instance):
        data = super(RangesSerializer, self).to_representation(instance)
        if not hasattr(self, 'xrecorded'):
            data['labels'] = {k: v.label for k, v in self.fields.items()}
            self.xrecorded = True
        return data
