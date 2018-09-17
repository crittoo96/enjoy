from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("hello django world")

def show(request):
    context = {}
    return render(request, 'notFollowMe/not_follow.html', context)
# class UserListView(TemplateView):
#     template_name = "not_follow.html"

#     def get(self, request, *args, **kwargs):
#         context = super(UserListView, self).get_context_data(**kwargs)
#         return render(self.request, self.template_name, context)
