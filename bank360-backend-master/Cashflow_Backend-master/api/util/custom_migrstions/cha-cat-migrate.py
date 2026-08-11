from psqlextra.query import ConflictAction

from api.models import User, Category
from api.util import constants

Users = User.objects.all()
def addNew():
    new_categories = []
    for user in Users:
        for category in constants.categories:
            new_categories.append({"user_id" : user.id, "category" : category, 'default' : True})

    Category.objects\
        .on_conflict(('category', 'user'), ConflictAction.UPDATE)\
            .bulk_insert(new_categories)

def change():
    former = ['salary', 'reversals', 'airtime', 'pension', 'bank charges', 'others']
    latter = ['Salary', 'Reversal', 'Airtime', 'Pension Remit', 'Transaction Charge', 'Others']
    for new, old in zip(latter, former):
        Category.objects.filter(category = old).update(category = new)

def categoryCount():
    Users = User.objects.all()
    for user in Users:
        print(user.category_set.count())

categoryCount()