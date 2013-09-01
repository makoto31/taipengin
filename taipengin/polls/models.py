from django.db import models
import datetime
from django.utils import timezone

class Poll(models.Model):
	question = models.CharField(max_length=200)
	pub_date = models.DateTimeField('date published')
	def __unicode__(self):
		return self.question
	def was_published_today(self):
		return self.pub_date.date() == datetime.date.today()
	def was_published_recently(self):
		return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
	was_published_recently.admin_order_field = 'pub_date'
	was_published_recently.boolean = True
	was_published_recently.short_description = 'Published recently?'

class Choice(models.Model):
	poll = models.ForeignKey(Poll)
	choice = models.CharField(max_length=200)
	votes = models.IntegerField()
	def __unicode__(self):
		return self.choice

class Blog(models.Model):
	name = models.CharField(max_length=100)
	tagline = models.TextField()
	
	def __unicode__(self):
		return self.name

class Author(models.Model):
	name = models.CharField(max_length=50)
	email = models.EmailField()
	
	def __unicode__(self):
		return self.name

class Entry(models.Model):
	blog = models.ForeignKey(Blog)
	headline = models.CharField(max_length=255)
	body_text = models.TextField()
	pub_date = models.DateTimeField()
	authors = models.ManyToManyField(Author)
	
	def __unicode__(self):
		return self.headline


