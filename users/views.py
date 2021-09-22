from django.contrib.auth import authenticate, login, logout

from django.shortcuts import redirect, render

from .forms import SignupForm


def sign_up(request):
    context = {}
    form = SignupForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            user = form.save(commit=False)
            user.is_staff = True
            user.save()
            login(request, user)
            return redirect('index')
    context['form'] = form
    return render(request, 'signup.html', context)
