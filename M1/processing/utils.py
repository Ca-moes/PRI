import os

def delete_file(filepath):
    try:
        os.remove(filepath)
    except:
        print("Error while deleting " + filepath)