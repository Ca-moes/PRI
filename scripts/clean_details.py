import pandas as pd
import ast

keep_indexes = ['Wireless Carrier', 'Screen Size', 'Color', 'Memory Storage Capacity', 'Cellular Technology', 'Operating System']

# Create new columns from `key: value` strings in list
def create_columns(list):
    indexes = []
    values = []

    for string in list:
        index, value = string.split(': ', 1)
        if index in keep_indexes:
            if index == "Wireless Carrier":
                value = value.replace("Unlocked for All Carriers", "Unlocked").split(", ")

            elif index == "Screen Size":
                value = value.split(" ")[0]

            elif index == "Memory Storage Capacity":
                if "MB" in value:
                    continue
                value = value.split(" ")[0]

            elif index == "Cellular Technology":
                value = value.replace("4G LTE", "4G,LTE").replace(" ", "").replace("/",",").upper().split(",")

            elif index == "Operating System":
                if "android" in value.lower():
                    value = "Android"
                elif "ios" in value.lower():
                    value = "iOS"
                elif "windows" in value.lower():
                    value = "Windows Phone"

            indexes.append(index.lower().replace(" ","_"))
            values.append(value)

    series = pd.Series(values, index=indexes)

    return series

# Remove strings used to create columns
def remove_strings(list):
    to_drop = keep_indexes + ['Brand', 'Manufacturer']

    return [string for string in list if string.split(': ', 1)[0] not in to_drop]

def main():
    details = pd.read_csv('data/20211230-details.csv')

    # Parse columns with lists
    details['about'] = details['about'].map(ast.literal_eval)
    details['more'] = details['more'].map(ast.literal_eval)


    df = details['more'].apply(lambda x: create_columns(x))
    details['more'] = details['more'].apply(lambda x: remove_strings(x))

    concated = pd.concat([details, df], axis=1)
    concated.to_pickle("data/details_clean.pkl")

if __name__ == '__main__':
    main()