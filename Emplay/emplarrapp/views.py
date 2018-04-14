# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from emplarrapp.models import *
from django.db.models import Count


# Create your views here.

def dashboard(request):
    """This method for Dashobaord page"""
    try:
        if request.method == 'GET':
            child_account_count = Account.objects.all().aggregate(
                Count('account_child_id'))
            count_stage_won = Account.objects.filter(stage='Won').count()
            count_hp_potentail = Account.objects.filter(
                potential='HP').values_list('account_id__account_name').distinct().count()
            count_hp_pipeline = Account.objects.filter(
                pipeline='HP').values_list('account_id__account_name').distinct().count()
            account_risk = AccountRisk.objects.all()
            context = {
                'child_account_count':child_account_count,
                'count_stage_won':count_stage_won,
                'count_hp_potentail':count_hp_potentail,
                'count_hp_pipeline':count_hp_pipeline,
                'account_risk':account_risk
            }
            return render(request, 'dashboard.html', context)
    except:
        return render(request, 'dashboard.html', {})

def account_data(request, idd):
    try:
        if request.method == 'GET':
            child_account_count = Account.objects.filter(
                account_id_id=int(idd)).aggregate(Count('account_child_id'))
            count_stage_won = Account.objects.filter(
                account_id_id=int(idd),stage='Won').count()
            count_hp_potentail = Account.objects.filter(account_id_id=int(idd),
                potential='HP').values_list('account_id__account_name').distinct().count()
            count_hp_pipeline = Account.objects.filter(account_id_id=int(idd),
                pipeline='HP').values_list('account_id__account_name').distinct().count()
            account_risk = AccountRisk.objects.get(id=int(idd))
            risk_items = account_risk.account_risk.split('@')
            context = {
                'child_account_count':child_account_count,
                'count_stage_won':count_stage_won,
                'count_hp_potentail':count_hp_potentail,
                'count_hp_pipeline':count_hp_pipeline,
                'account_risk':account_risk,
                'risk_items':risk_items
            }
            return render(request, 'account_details.html', context)
    except:
        return render(request, 'dashboard.html', {})

