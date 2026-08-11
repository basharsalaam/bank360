# Import libraries
import re
import pandas as pd
from sklearn import preprocessing
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

from api.models import Transactions

def tran_classification(narration, loded_model, template):
    if loded_model is None:
        return [template[0]] * len(narration)

    # Data  cleaning on the narrations and padding
    narrations = list(Transactions.objects.exclude(account__user_id=11).values_list('narration', flat = True)[:200])

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
    
    le = preprocessing.LabelEncoder()
    le.fit(template)

    # Make predictions
    prediction = le.inverse_transform(
        [list(x).index(max(x)) for x in loded_model.predict(x_testing)])
        
    #remove padded values
    return prediction[200:]

def tran_credit(transactions):
    CBG_CUSTOMERS3 = pd.DataFrame(transactions)
    
    # ## COMPUTING THE AVG AND THE RATIO and Assign it to new table
    CBG_CUSTOMERS4 = CBG_CUSTOMERS3.assign(avg_cr_inflow = lambda x: CBG_CUSTOMERS3['inflow']/CBG_CUSTOMERS3['cr_vol'], 
            avg_dr_outflow = lambda x: CBG_CUSTOMERS3['outflow']/CBG_CUSTOMERS3['cr_vol'], 
            iof_ratio = lambda x: CBG_CUSTOMERS3['inflow']/CBG_CUSTOMERS3['outflow'], 
            value_diff = lambda x: CBG_CUSTOMERS3['inflow'] - CBG_CUSTOMERS3['outflow']
        )
    
    #ADD THE SCORE DETERMINANT COLUMN
    CBG_CUSTOMERS4['score_detmnt'] = np.where(CBG_CUSTOMERS4['iof_ratio']>3, 3, CBG_CUSTOMERS4['iof_ratio'])
    
    #from numpy.lib.function_base import copy
    ### ADD THE TRANS SEGMENT AND THE ELIGIBILITY COLUMN
    # create a list of our conditions
    conditions = [
        (CBG_CUSTOMERS4['inflow'] >= 500000000),
        (CBG_CUSTOMERS4['inflow'] >=50000000) & (CBG_CUSTOMERS4['inflow'] < 500000000),
        (CBG_CUSTOMERS4['inflow'] >=5000000) & (CBG_CUSTOMERS4['inflow'] < 50000000),
        (CBG_CUSTOMERS4['inflow'] >=1000000) & (CBG_CUSTOMERS4['inflow'] < 5000000),
        (CBG_CUSTOMERS4['inflow'] >=100000) & (CBG_CUSTOMERS4['inflow'] < 1000000),
        (CBG_CUSTOMERS4['inflow'] >=20000) & (CBG_CUSTOMERS4['inflow'] < 100000),
        (CBG_CUSTOMERS4['inflow'] < 20000)
        ]
    # create a list of the values we want to assign for each condition
    values = ['01_HIGH_NETWORTH_INDIVIDUAL', '02_UPPER_AFFLUENT', '03_MID_AFFLUENT', '04_LOWER_AFFLUENT', '05_UPPER_MASS', '06_MID_MASS', 
                    '07_LOWER_MASS']
    
    # create a new column and use np.select to assign values to it using our lists as arguments
    CBG_CUSTOMERS4['tran_segment'] = np.select(conditions, values)
    
    #ADD THE CREDIT SCORE COLUMN
    CBG_CUSTOMERS4['score'] = (320.02555 + 176.488 * CBG_CUSTOMERS4.score_detmnt)
    
    ## Droping unnecessary cols
    ## Keeping the needed col
    CBG_CUSTOMERS4 = CBG_CUSTOMERS4.drop(columns=['cr_vol','dr_vol','tranx_vol',
                                                'avg_cr_inflow','avg_dr_outflow','iof_ratio','value_diff','score_detmnt','tran_segment'])
    
    #### Converting back to Dictionary
    return CBG_CUSTOMERS4.to_dict('records')