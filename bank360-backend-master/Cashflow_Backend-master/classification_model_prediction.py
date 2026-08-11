# Import libraries
import joblib
from sklearn.feature_extraction.text import CountVectorizer
import requests, json

# Load the model
model = joblib.load('cashflow_channels')

url = "https://api.withmono.com/accounts/627b9936ab7551432558049d/transactions?paginate=false"

response = requests.request("GET", url, headers={"mono-sec-key": "test_sk_N6JFeGSl3EY38VEoTXXC", "Content-Type": "application/json"})

values = json.loads(response.text)

narration = [value['narration'] for value in values["data"]]

print(narration)


def classification(narration, channel_model):
    # Data  cleaning on the narrations
    narrations = []

    for nar in narration:  # testing is the name of the table with a column narrations
        result = re.sub(r'[^a-zA-Z0-9]', ' ', nar.lower())
        result = re.sub(r'\d', ' ', result)
        narrations.append(result)

    # Writing the narrations back into a dataframe
    testing = pd.DataFrame(narrations, columns=['narrations'])

    # Tokenization of the narrations
    desc_vectorizer = CountVectorizer(analyzer="word", max_features=100)

    testing_bag_of_words = desc_vectorizer.fit_transform(testing['narrations'])

    x_testing = pd.DataFrame(testing_bag_of_words.toarray(),
                             columns=[x for x in desc_vectorizer.get_feature_names()]).astype(int)

    # Make predictions
    prediction = le.inverse_transform(
        [list(x).index(max(x)) for x in channel_model.predict(x_testing)])

    print(prediction)
