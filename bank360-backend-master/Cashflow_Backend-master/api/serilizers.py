import re, datetime

from rest_framework import serializers, fields

from month import Month

class MonthField(fields.DateField):
    def to_internal_value(self, value):
        if isinstance(value, Month):
            month = value
        elif isinstance(value, datetime.date):
            month = Month.from_date(value)
            if len(str(month.year)) < 4:
                raise serializers.ValidationError(
                    self.error_messages['invalid_year'],
                    code='invalid_year',
                    params={'value': value},
                )
    
    def to_representation(self, value):
        return str(value)

from api.models import User, Category, Account, Transactions
from api.util import constants

class UserSerializer(serializers.ModelSerializer):
    def __init__(self, instance=None, data=fields.empty, **kwargs):
        if 'phone_no' in kwargs:
            kwargs['phone_no'] = re.sub(r'\s+', '', kwargs['phone_no'])
        super().__init__(instance, data, **kwargs)

    def validate(self, attrs):
        value = super().validate(attrs)
        valid_pass = "(?=^(?:[^A-Z]*[A-Z]))(?=^(?:[^a-z]*[a-z]))(?=^(?:\D*\d))(?=^(?:\w*\W))^[A-Za-z\d\W]{8,}$"
        if 'password' in attrs:
            if not re.search(valid_pass, attrs['password']):
                raise serializers.ValidationError(
                    {
                        'password' : [
                            'must contain at least (1) upper case letter',
                            'contain at least (1) lower case letter',
                            'contain at least (1) digit',
                            'contain at least (1) special character',
                            'contain at least (8) characters in length'
                        ]
                    }
                )
        valid_phone = r"(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|6611|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$"
        if 'phone_no' in attrs:
            if not re.search(valid_phone, attrs['phone_no']):
                raise serializers.ValidationError({'phone_no' : ['bad format, must be in global form']})
        return value

    class Meta:
        model = User
        fields = ('uuid', 'email', 'password', 'first_name', 'last_name', 'phone_no', 'org_name', 'avatar')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        category_list = [Category(user = user, category=category, default=True) for category in constants.categories]
        Category.objects.bulk_create(category_list)
        return user

    def update(self, instance, validated_data):
        if instance.avatar:
            validated_data['old_image'] = instance.avatar
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class CategorySerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        value = super().validate(attrs)
        if 'category' in attrs:
            if Category.objects.filter(user = attrs['user'], category__iexact = attrs['category']).exists():
                raise serializers.ValidationError({'category' : f"{attrs['category']} already exists for this user"})
        return value

    class Meta:
        model = Category
        fields = '__all__'
        extra_kwargs = {'user': {'write_only': True}}

        def update(self, instance, validated_data):
            instance.category = validated_data.get('category', instance.category)
            instance.save()
            return instance

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude=('id',)
        extra_kwargs = {'user': {'write_only': True}}

class TransactionSerializer(serializers.ModelSerializer):

    account_info =  AccountSerializer()
    category_info = CategorySerializer()

    class Meta:
        model = Transactions
        exclude = ('id', )
        extra_kwargs = {'account': {'write_only': True}, 'category': {'write_only': True}}

class CreditSerializer(serializers.Serializer):
    credit_score = serializers.FloatField()
    month = MonthField()
    eligible = serializers.CharField()
    change = serializers.BooleanField()