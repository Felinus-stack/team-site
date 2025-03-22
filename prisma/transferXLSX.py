import pandas as pd
import json

# Load the Excel file
file_path = 'prisma/members.xlsx'  # Use raw string or forward slashes for Windows paths
df = pd.read_excel(file_path, dtype=str)  # Read all cells as strings

# Initialize the dictionary to hold members
members_dict = {}

# Iterate over the rows in the DataFrame
for index, row in df.iterrows():
    name = str(row['IMIĘ']).strip().lower() if not pd.isna(row['IMIĘ']) else ''
    surname = str(row['NAZWISKO']).strip().lower() if not pd.isna(row['NAZWISKO']) else ''
    email = str(row['mail']).strip().lower() if not pd.isna(row['mail']) else ''

    # Skip members without a name or surname
    if not name or not surname:
        continue

    role_info = {
        'role': str(row['ROLA W SEZONIE 2023/24']).strip().lower() if not pd.isna(row['ROLA W SEZONIE 2023/24']) else '',
        'department': str(row['DZIAŁ']).strip().lower() if not pd.isna(row['DZIAŁ']) else '',
        'bolidName': 'RT14e'
    }

    identifier = f"{name}_{surname}"

    if identifier in members_dict:
        members_dict[identifier]['roles'].append(role_info)
    else:
        members_dict[identifier] = {
            'name': name,
            'surname': surname,
            'email': email,
            'roles': [role_info]
        }

# Convert the dictionary to a list of dictionaries
members = list(members_dict.values())

# Save the list of dictionaries in a JSON format suitable for JavaScript/TypeScript to a text file
output_text = "const members = " + json.dumps(members, indent=4, ensure_ascii=False) + ";"
with open('members_output.txt', 'w', encoding='utf-8') as text_file:
    text_file.write(output_text)
