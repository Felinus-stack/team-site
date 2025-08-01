import os
import shutil

def move_and_delete_single_image_files(directory):
    # 遍历指定目录中的每个文件夹
    for folder_name in os.listdir(directory):
        folder_path = os.path.join(directory, folder_name)

        # 确保这是一个文件夹
        if os.path.isdir(folder_path):
            files = os.listdir(folder_path)
            image_files = [f for f in files if f.endswith(('.png', '.jpeg', '.jpg'))]

            # 如果文件夹中只有一个符合条件的文件
            if len(image_files) == 1 and len(files) == 1:
                file_path = os.path.join(folder_path, image_files[0])
                new_path = os.path.join(directory, image_files[0])

                # 将文件上移一级
                shutil.move(file_path, new_path)

                # 删除空文件夹
                os.rmdir(folder_path)
                print(f'已将 {file_path} 移动到 {new_path} 并删除文件夹 {folder_path}。')
            else:
                print(f'文件夹 {folder_path} 包含多个文件或其他扩展名的文件。跳过。')

import os

def rename_files_to_lowercase(directory):
    # 遍历指定目录中的所有文件
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)

        # 检查这是否是一个文件，而不是文件夹
        if os.path.isfile(filepath):
            new_filename = filename.lower()
            new_filepath = os.path.join(directory, new_filename)

            # 将文件名改为小写
            os.rename(filepath, new_filepath)

            # 打印文件名
            print(new_filename)

# 使用函数
directory = 'public\images\sponsors\\bronze'
# move_and_delete_single_image_files(directory)
rename_files_to_lowercase(directory)
