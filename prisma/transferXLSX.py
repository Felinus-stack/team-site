import pandas as pd
import json

# 加载 Excel 文件
file_path = 'prisma/members.xlsx'  # 对于 Windows 路径，使用原始字符串或正斜杠
df = pd.read_excel(file_path, dtype=str)  # 将所有单元格读取为字符串

# 初始化字典以存储成员信息
members_dict = {}

# 遍历 DataFrame 中的每一行
for index, row in df.iterrows():
    # 获取名字，去除首尾空格并转换为小写，如果为空则赋值为空字符串
    name = str(row['IMIĘ']).strip().lower() if not pd.isna(row['IMIĘ']) else ''
    # 获取姓氏，去除首尾空格并转换为小写，如果为空则赋值为空字符串
    surname = str(row['NAZWISKO']).strip().lower() if not pd.isna(row['NAZWISKO']) else ''
    # 获取邮箱，去除首尾空格并转换为小写，如果为空则赋值为空字符串
    email = str(row['mail']).strip().lower() if not pd.isna(row['mail']) else ''

    # 跳过没有名字或姓氏的成员
    if not name or not surname:
        continue

    # 角色信息
    role_info = {
        # 获取 2023/24 赛季的角色，去除首尾空格并转换为小写，如果为空则赋值为空字符串
        'role': str(row['ROLA W SEZONIE 2023/24']).strip().lower() if not pd.isna(row['ROLA W SEZONIE 2023/24']) else '',
        # 获取部门，去除首尾空格并转换为小写，如果为空则赋值为空字符串
        'department': str(row['DZIAŁ']).strip().lower() if not pd.isna(row['DZIAŁ']) else '',
        'bolidName': 'RT14e'
    }

    # 生成成员标识符
    identifier = f"{name}_{surname}"

    # 如果标识符已存在于字典中，则将角色信息添加到该成员的角色列表中
    if identifier in members_dict:
        members_dict[identifier]['roles'].append(role_info)
    # 否则，创建一个新的成员信息并添加到字典中
    else:
        members_dict[identifier] = {
            'name': name,
            'surname': surname,
            'email': email,
            'roles': [role_info]
        }

# 将字典转换为字典列表
members = list(members_dict.values())

# 将字典列表保存为适合 JavaScript/TypeScript 的 JSON 格式的文本文件
output_text = "const members = " + json.dumps(members, indent=4, ensure_ascii=False) + ";"
with open('members_output.txt', 'w', encoding='utf-8') as text_file:
    text_file.write(output_text)
