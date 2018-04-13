# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class AccountRisk(models.Model):
    account_name = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200)
    account_risk = models.TextField()
    def __str__(self):
        return str(self.account_name)

class AccountChild(models.Model):
    account_name = models.CharField(max_length=200)
    def __str__(self):
        return str(self.account_name)

class Account(models.Model):
    account_id = models.ForeignKey(AccountRisk)
    account_child_id = models.ForeignKey(AccountChild)
    potential = models.CharField(max_length=10)
    pipeline = models.CharField(max_length=10)
    stage = models.CharField(max_length=20)



