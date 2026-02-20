#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from PIL import Image
import os
from pathlib import Path
import sys

# Переконаємось що Pillow встановлена
try:
    from PIL import Image
except ImportError:
    print("Pillow не встановлена. Встановлюю...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

# Шлях до папки src
src_folder = Path(__file__).parent / "src"
print(f"Робочу папка: {src_folder}\n")

# Допустимі розширення зображень
image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.gif', '.tiff'}

results = []

# Обходимо всі файли в папці src
for file_path in sorted(src_folder.glob('*')):
    if file_path.suffix.lower() not in image_extensions:
        continue
    
    try:
        # Отримуємо інформацію про оригінальний файл
        original_size_bytes = file_path.stat().st_size
        original_size_kb = original_size_bytes / 1024
        
        # Відкриваємо зображення
        img = Image.open(file_path)
        original_width, original_height = img.size
        max_side = max(original_width, original_height)
        
        # Визначаємо нові розміри
        if max_side > 1920:
            scale_ratio = 1920 / max_side
            new_width = int(original_width * scale_ratio)
            new_height = int(original_height * scale_ratio)
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            print(f"✓ {file_path.name}")
            print(f"  Оригінал: {original_width}x{original_height}px")
            print(f"  Новий розмір: {new_width}x{new_height}px")
        else:
            print(f"✓ {file_path.name}")
            print(f"  Розмір: {original_width}x{original_height}px (менше 1920px, не змінюю)")
        
        # Збережемо як WebP
        webp_path = file_path.with_suffix('.webp')
        
        # Конвертуємо RGBA в RGB якщо потрібно для WebP
        if img.mode in ('RGBA', 'LA', 'P'):
            # Створюємо білий фон
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Збережемо з якістю 85
        img.save(webp_path, 'WEBP', quality=85, method=6)
        
        # Отримуємо розмір збереженого файлу
        new_size_bytes = webp_path.stat().st_size
        new_size_kb = new_size_bytes / 1024
        compression_percent = ((original_size_bytes - new_size_bytes) / original_size_bytes * 100)
        
        results.append({
            'filename': file_path.name,
            'original_kb': original_size_kb,
            'new_kb': new_size_kb,
            'compression': compression_percent
        })
        
        print(f"  Збережено: {webp_path.name}")
        print(f"  Розмір до: {original_size_kb:.2f} КБ → після: {new_size_kb:.2f} КБ ({compression_percent:.1f}%)\n")
        
    except Exception as e:
        print(f"✗ Помилка при обробці {file_path.name}: {e}\n")

# Виводимо таблицю результатів
if results:
    print("\n" + "="*90)
    col1 = "Ім'я файлу"
    col2 = "До (КБ)"
    col3 = "Після (КБ)"
    col4 = "Стиснення"
    header = f"{col1:<45} {col2:>15} {col3:>15} {col4:>12}"
    print(header)
    print("="*90)
    
    total_original = 0
    total_new = 0
    
    for result in results:
        line = f"{result['filename']:<45} {result['original_kb']:>15.2f} {result['new_kb']:>15.2f} {result['compression']:>11.1f}%"
        print(line)
        total_original += result['original_kb']
        total_new += result['new_kb']
    
    print("="*90)
    total_compression = ((total_original - total_new) / total_original * 100) if total_original > 0 else 0
    footer_label = "УСЬОГО:"
    footer = f"{footer_label:<45} {total_original:>15.2f} {total_new:>15.2f} {total_compression:>11.1f}%"
    print(footer)
    print("="*90)
    print(f"\n✓ Стиснення завершено! {len(results)} файл(ів) обробленo.")
    print(f"  Економія: {(total_original - total_new):.2f} КБ")
else:
    print("Не знайдено зображень для обробки.")
