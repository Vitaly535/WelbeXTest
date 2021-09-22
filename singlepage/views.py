from django.shortcuts import get_object_or_404, render

from rest_framework import viewsets

from .forms import RangesForm
from .models import Ranges
from .serializers import RangesSerializer


ALL_MODELS = {'ranges': (Ranges, RangesForm), }


class RangesViewSet(viewsets.ModelViewSet):

    serializer_class = RangesSerializer

    def get_queryset(self):
        queryset = Ranges.objects.all()
        params = self.request.GET.dict()
        params.pop('page', None)
        sort = params.pop('o', None)
        if params is not None:
            queryset = queryset.filter(**params)
        if sort is not None:
            queryset = queryset.order_by(sort)
        return queryset


def index(request):
    return render(request, 'index.html')


def new_item(request, model):
    form = ALL_MODELS[model][1](request.POST or None)
    return render(request, 'apiform.html', {'form': form, 'model': model, })


def edit_item(request, model, id):
    dbmodel = ALL_MODELS[model][0]
    item = get_object_or_404(dbmodel, pk=id)
    form = ALL_MODELS[model][1](request.POST or None, instance=item)
    return render(request, 'apiform.html', {'form': form, 'model': model,
                                            'id': id, })
