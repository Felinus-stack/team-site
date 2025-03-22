import os
import shutil

def move_and_delete_single_image_files(directory):
    # Przechodzenie przez każdy folder w podanym katalogu
    for folder_name in os.listdir(directory):
        folder_path = os.path.join(directory, folder_name)

        # Upewniamy się, że to folder
        if os.path.isdir(folder_path):
            files = os.listdir(folder_path)
            image_files = [f for f in files if f.endswith(('.png', '.jpeg', '.jpg'))]

            # Jeśli w folderze jest tylko jeden odpowiedni plik
            if len(image_files) == 1 and len(files) == 1:
                file_path = os.path.join(folder_path, image_files[0])
                new_path = os.path.join(directory, image_files[0])

                # Przenosimy plik o poziom wyżej
                shutil.move(file_path, new_path)

                # Usuwamy pusty folder
                os.rmdir(folder_path)
                print(f'Przeniesiono {file_path} do {new_path} i usunięto folder {folder_path}.')
            else:
                print(f'Folder {folder_path} zawiera więcej plików lub pliki o innych rozszerzeniach. Pomijam.')

import os

def rename_files_to_lowercase(directory):
    # Przechodzenie przez wszystkie pliki w podanym katalogu
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)

        # Sprawdzamy, czy to plik, a nie folder
        if os.path.isfile(filepath):
            new_filename = filename.lower()
            new_filepath = os.path.join(directory, new_filename)

            # Zmiana nazwy pliku na małe literki
            os.rename(filepath, new_filepath)

            # Wypisywanie nazwy pliku
            print(new_filename)

# Użycie funkcji
directory = 'public\images\sponsors\\bronze'
# move_and_delete_single_image_files(directory)
rename_files_to_lowercase(directory)
